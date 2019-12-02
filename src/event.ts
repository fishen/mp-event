import { off, on } from ".";
import Reflect from "./relect";
import { BoundEvent, EventName, IBindEventOptions, IEventOptions } from "./type";

export default class Event {

    private static BOUND_EVENTS_KEY = Symbol();

    public bind(options: IBindEventOptions, method: (...args: any) => any) {
        const events = this.getEvents();
        events.push([options, method]);
        Reflect.defineMetadata(Event.BOUND_EVENTS_KEY, events, this);
    }

    public register(prototype: any, options: IEventOptions): Partial<Record<keyof IEventOptions, any>> {
        const events = this.getEvents();
        return {
            [options.onLifetime]() {
                events.forEach(([opts, method]) => {
                    on(opts.name, method, Object.assign({}, opts, { target: this }));
                });
            },
            [options.offLifetime]: this.destroy(events),
        };
    }

    public destroy(events: BoundEvent[]) {
        return function() {
            events.forEach(([opts]) => off(opts.name, { target: this }));
        };
    }

    protected getEvents(): BoundEvent[] {
        const events = Reflect.getOwnMetadata(Event.BOUND_EVENTS_KEY, this);
        return events ? events.slice() : [];
    }

    protected registerImplicitEvents(events: BoundEvent[], prototype: any, eventKey: symbol) {
        return function() {
            events.forEach(([opts, method]) => {
                on(opts.name, function(...args: any) {
                    let evts: Map<EventName, any[]> = Reflect.getMetadata(eventKey, prototype);
                    evts = evts ? new Map(evts) : new Map();
                    evts.set(opts.name, [method, args]);
                    Reflect.defineMetadata(eventKey, evts, prototype);
                }, opts);
            });
        };
    }

    protected emitImplicitEvents(prototype: any, eventKey: symbol) {
        return function() {
            const implicitEvents: Map<EventName, any[]> = Reflect.getMetadata(eventKey, prototype);
            if (implicitEvents) {
                implicitEvents.forEach(([method, args]) => method.apply(this, args));
                implicitEvents.clear();
            }
        };
    }
}
