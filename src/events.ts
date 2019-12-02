import { EventName, IOffOptions, IOnceOptions, IOnOptions } from "./type";

const events = new Map<EventName, Array<[any, (...args: any[]) => any, boolean]>>();

/**
 * Register an event subscription
 * @param name event name
 * @param callback callback function when the event is triggered
 * @param options subscription options
 */
export function on<T>(name: EventName, callback: (this: T, result: any) => void, options?: IOnOptions<T>): void {
    if (typeof callback !== "function") { throw new Error("callback must be a function"); }
    options = Object.assign({ unique: false }, options);
    const { unique, once: oneOff, target } = options!;
    const tuple: any = [target, callback, !!oneOff];
    const callbacks = events.get(name) || [];
    if (unique) {
        const exisits = callbacks.some(([t]) => target === t);
        if (exisits) { return; }
    }
    callbacks.push(tuple);
    events.set(name, callbacks);
}

/**
 * Register an event subscription, but only be triggered once
 * @param name event name
 * @param callback callback function when the event is triggered
 * @param options subscription options
 */
export function once<T>(name: EventName, callback: (this: T, result: any) => void, options?: IOnceOptions<T>): void {
    on<T>(name, callback, Object.assign({}, options, { once: true }));
}

/**
 * Cancel event subscription by name and target
 * @param name event name
 * @param options subscription options
 */
export function off<T>(name: EventName, options?: IOffOptions<T>): void {
    const callbacks = events.get(name);
    if (!callbacks) { return; }
    if (Array.isArray(callbacks)) {
        const { target } = Object.assign({}, options);
        events.set(name, callbacks.filter((tuple) => tuple[0] !== target));
    }
}

function isNil(value: any) {
    return value === undefined || value === null;
}

/**
 * Clear subscriptions by event name
 * @param name event name
 * @param clearAllIfNameIsNil whether clear all subscriptions if event name is null or undefined
 */
export function clear(name?: EventName, clearAllIfNameIsNil?: boolean): void {
    if (clearAllIfNameIsNil && isNil(name)) {
        events.clear();
    } else {
        events.delete(name!);
    }
}

/**
 * Trigger event by name and data
 * @param name event name
 * @param data event data pass to the callback functions.
 */
export function emit<T>(name: EventName, data?: T): void {
    const callbacks = events.get(name);
    if (Array.isArray(callbacks)) {
        for (let i = callbacks.length - 1; i >= 0; i--) {
            const tuple = callbacks[i];
            const [target, callback, oneOff] = tuple;
            callback.call(target, data);
            if (oneOff) { callbacks.splice(i, 1); }
        }
    }
}
