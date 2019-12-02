import Event from "./event";
import { IEventOptions } from "./type";

export default class DeferralEvent extends Event {
    private static DEFERRED_EVENTS = Symbol("deferred events");
    public register(prototype: any, options: IEventOptions): Partial<Record<keyof IEventOptions, any>> {
        const events = this.getEvents();
        const eventKey = DeferralEvent.DEFERRED_EVENTS;
        const registerImplicitEvents = super.registerImplicitEvents(events, prototype, eventKey);
        const emitImplicitEvents = super.emitImplicitEvents(prototype, eventKey);
        return {
            [options.onLifetime]: registerImplicitEvents,
            [options.deferralLifetime]: emitImplicitEvents,
            [options.offLifetime]: super.destroy(events),
        };
    }
}
