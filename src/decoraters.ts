
import { EVENT_OPTIONS } from "./constants";
import { EventManager } from "./event-manager";
import * as evt from "./events";
import { EventName, IBindEventOptions, IEventOptions } from "./type";

function getOptions(prototype: any, options?: IEventOptions) {
    const defaultConfig = { onLifetime: "onLoad", deferralLifetime: "onShow", offLifetime: "onUnload" };
    return Object.assign(defaultConfig, prototype[EVENT_OPTIONS], options);
}

/**
 * Register events and automatically unbind events when the page is destroyed.
 * @param options event options
 */
export function event(options?: IEventOptions) {
    return function(constructor: any) {
        const prototype = constructor.prototype;
        options = getOptions(prototype, options);
        EventManager.from(prototype).register(prototype, options);
    };
}

event.on = evt.on;
event.off = evt.off;
event.once = evt.once;
event.emit = evt.emit;
event.clear = evt.clear;

/**
 * Bind the current method as a callback function for the specified event
 * @param options event options
 */
export function bindEvent(options?: EventName | IBindEventOptions) {
    return function(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
        const isKeyType = typeof options === "string" || typeof options === "symbol";
        const opts: IBindEventOptions = isKeyType ? { name: options } as any : Object.assign({ name }, options);
        EventManager.from(target).bind(opts, descriptor.value);
    };
}
