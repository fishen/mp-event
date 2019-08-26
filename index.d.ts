declare type EventName = string | symbol;
interface IOffOptions<T = any> {
    /**
     * The value to be passed as the this parameter to the target function when the callback function is called
     * Also used to distinguish different callback functions under the same event
     */
    target?: T;
}
interface IOnceOptions<T = any> extends IOffOptions<T> {
    /**
     * Register a unique callback function by event name and target
     */
    unique?: boolean;
}
interface IOnOptions<T = any> extends IOnceOptions<T> {
    /**
     * Whether the event is called only once
     */
    once?: boolean;
}
/**
 * Register an event subscription
 * @param name event name
 * @param callback callback function when the event is triggered
 * @param options subscription options
 */
export declare function on<T>(name: EventName, callback: (this: T, result: any) => void, options?: IOnOptions<T>): void;
/**
 * Register an event subscription, but only be triggered once
 * @param name event name
 * @param callback callback function when the event is triggered
 * @param options subscription options
 */
export declare function once<T>(name: EventName, callback: (this: T, result: any) => void, options?: IOnceOptions<T>): void;
/**
 * Cancel event subscription by name and target
 * @param name event name
 * @param options subscription options
 */
export declare function off<T>(name: EventName, options?: IOffOptions<T>): void;
/**
 * Clear subscriptions by event name
 * @param name event name
 * @param clearAllIfNameIsNil whether clear all subscriptions if event name is null or undefined
 */
export declare function clear(name?: EventName, clearAllIfNameIsNil?: boolean): void;
/**
 * Trigger event by name and data
 * @param name event name
 * @param data event data pass to the callback functions.
 */
export declare function emit<T>(name: EventName, data?: T): void;
export {};
