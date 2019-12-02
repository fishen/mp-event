import DeferralEvent from "./deferral-event";
import Event from "./event";
import GlobalDeferralEvent from "./global-deferral-event";
import GlobalEvent from "./global-event";
import { IBindEventOptions, IEventOptions } from "./type";

export class EventManager {
    public static from(prototype: any): EventManager {
        if (prototype[EventManager.eventkey]) { return prototype[EventManager.eventkey]; }
        return prototype[EventManager.eventkey] = new EventManager();
    }
    private static eventkey = Symbol();
    public events = new Map<string, Event>();
    public create(options: IBindEventOptions) {
        if (options.global && options.deferred) {
            return new GlobalDeferralEvent();
        } else if (options.global && !options.deferred) {
            return new GlobalEvent();
        } else if (!options.global && options.deferred) {
            return new DeferralEvent();
        } else {
            return new Event();
        }
    }
    public bind(options: IBindEventOptions, method: (...args: any) => any) {
        const event = this.get(options);
        event.bind(options, method);
    }
    public register(prototype: any, options: IEventOptions) {
        const handles = Array.from(this.events.values()).map((event) => event.register(prototype, options));
        [options.onLifetime, options.deferralLifetime, options.offLifetime].forEach((lifetime) => {
            if (handles.some((h) => lifetime in h)) {
                const original = prototype[lifetime];
                prototype[lifetime] = function(...args: any) {
                    handles.filter((h) => lifetime in h).forEach((h: any) => h[lifetime].call(this));
                    return original && original.apply(this, args);
                };
            }
        });
    }
    private get(options: IBindEventOptions): Event {
        const key = JSON.stringify([!!options.global, !!options.deferred]);
        if (this.events.has(key)) {
            return this.events.get(key);
        } else {
            const event = this.create(options);
            this.events.set(key, event);
            return event;
        }
    }
}
