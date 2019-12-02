import GlobalEvent from "./global-event";
import { IEventOptions } from "./type";

export default class GlobalDeferralEvent extends GlobalEvent {
    public register(prototype: any, options: IEventOptions): Partial<Record<keyof IEventOptions, any>> {
        const lifetimes: any = super.register(prototype, options);
        return { [options.deferralLifetime]: lifetimes[options.onLifetime] };
    }
}
