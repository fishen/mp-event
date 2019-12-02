import Event from "./event";
import { IEventOptions } from "./type";

export default class GlobalEvent extends Event {

    private static GLOBAL_EVENTS = Symbol("global events");

    public register(prototype: any, options: IEventOptions): Partial<Record<keyof IEventOptions, any>> {
        const events = this.getEvents();
        const eventKey = GlobalEvent.GLOBAL_EVENTS;
        super.registerImplicitEvents(events, prototype, eventKey)();
        const emitImplicitEvents = super.emitImplicitEvents(prototype, eventKey);
        return { [options.onLifetime]: emitImplicitEvents };
    }
}
