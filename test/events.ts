import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
chai.should();

import "mocha";
import { event } from '../src/index';

const eventName = Symbol();

describe("demo", () => {
    it('test on function', function () {
        const promise = new Promise(resolve => event.on(eventName, resolve));
        const promise1: any = new Promise(resolve => event.on(eventName, resolve));
        const promise2: any = new Promise(resolve => event.on(eventName, resolve));
        event.emit(eventName, 1);
        return Promise.all([
            promise.should.eventually.equal(1),
            promise1.should.eventually.equal(1),
            promise2.should.eventually.equal(1),
        ]);
    });
    it('test on function', function () {
        const promise = new Promise(resolve => event.on(eventName, resolve, { unique: true }));
        const promise1 = Promise.race([new Promise(resolve => event.on(eventName, resolve, { unique: true })),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error('')), 1000))]);
        event.emit(eventName, 1);
        return promise1.should.be.rejectedWith(Error);
    });
});