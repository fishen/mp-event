import "mocha";
declare const eventName: unique symbol;
export declare class Page {
    a: number;
    onLoad(): void;
    onShow(): void;
    do(value: any): number;
    [eventName](value: any): void;
    do1(value: any): void;
    global(value: any): void;
    global1(value: any): void;
    deferred(value: any): void;
    deferred1(value: any): void;
    globalDeferred(value: any): void;
}
export {};
