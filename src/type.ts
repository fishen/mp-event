export type EventName = string | symbol;

export type BoundEvent = [IBindEventOptions, (...args: any) => any];

export interface IOffOptions<T = any> {
    /**
     * The value to be passed as the this parameter to the target function when the callback function is called
     * Also used to distinguish different callback functions under the same event
     */
    target?: T;
}

export interface IOnceOptions<T = any> extends IOffOptions<T> {
    /**
     * Register a unique callback function by event name and target
     */
    unique?: boolean;
}

export interface IOnOptions<T = any> extends IOnceOptions<T> {
    /**
     * Whether the event is called only once
     */
    once?: boolean;
}

export interface IEventOptions {
    /**
     * the lifetime for initializing events.
     * @default onLoad
     */
    onLifetime?: string;
    /**
     * the lifetime for deferring events.
     * @default onShow
     */
    deferralLifetime?: string;
    /**
     * the lifetime for destroying events.
     * @default onUnload
     */
    offLifetime?: string;
}

export interface IBindEventOptions extends Omit<IOnOptions, "target"> {
    /**
     * event name
     */
    name?: EventName;
    /**
     * whether to delay execution to the specified lifetime, such as 'onShow'
     */
    deferred?: boolean;
    /**
     * whether to trigger only once
     */
    once?: boolean;
    /**
     * Whether to register as a global event
     */
    global?: boolean;
}
