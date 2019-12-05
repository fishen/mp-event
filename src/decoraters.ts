
import { EVENT_OPTIONS } from "./constants";
import { EventManager } from "./event-manager";
import * as evt from "./events";
import { EventName, IBindEventOptions, IEventOptions } from "./type";

const defaultConfig = { onLifetime: "onLoad", deferralLifetime: "onShow", offLifetime: "onUnload" };

/**
 * Register events and automatically unbind events when the page is destroyed.
 * @param options event options
 */
export function event(options?: IEventOptions) {
    return function(constructor: any) {
        const prototype = constructor.prototype;
        options = Object.assign({}, defaultConfig, prototype[EVENT_OPTIONS], options);
        EventManager.from(prototype).register(prototype, options);
    };
}

event.on = evt.on;
event.off = evt.off;
event.once = evt.once;
event.emit = evt.emit;
event.clear = evt.clear;

/**
 * Config global event options.
 * @param options: Event options.
 * @param target: Event target.
 */
event.config = function(options: IEventOptions, target?: any) {
    if (typeof target === "function") {
        target.prototype[EVENT_OPTIONS] = options;
    } else {
        Object.assign(defaultConfig, options);
    }
};

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
