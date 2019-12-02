import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
chai.should();

import "mocha";
import { event, bindEvent } from '../src/index';

const eventName = Symbol();

@event()
export class Page {
    a = 1;
    onLoad() { console.log('onload') }
    onShow() { console.log('onShow') }
    @bindEvent()
    do(value: any) {
        console.log(1, value, this.a);
        return 1;
    }
    @bindEvent()
    [eventName](value: any) {
        console.log(2, value, this.a);
    }
    @bindEvent(eventName)
    do1(value: any) {
        console.log(3, value, this.a);
    }
    @bindEvent({ global: true })
    global(value: any) {
        console.log(4, value, this.a);
    }
    @bindEvent({ global: true })
    global1(value: any) {
        console.log(5, value, this.a);
    }
    @bindEvent({ deferred: true })
    deferred(value: any) {
        console.log(6, value, this.a);
    }
    @bindEvent({ deferred: true })
    deferred1(value: any) {
        console.log(7, value, this.a);
    }
    @bindEvent({ deferred: true, global: true })
    globalDeferred(value: any) {
        console.log(8, value, this.a);
    }
}

const page = new Page();
event.emit('do', 0);
event.emit('global', 1);
event.emit('global1', 12);
event.emit('global1', 11);
console.log(11111111111);
page.onLoad();
event.emit('do', 2);
event.emit(eventName, 3);
event.emit('deferred', 4);
console.log('onshowing');
page.onShow();
event.emit('deferred', 5);
event.emit('deferred1', 6);
event.emit('deferred1', 7);
page.onShow();
event.emit('globalDeferred', 8);
page.onLoad();
event.emit('globalDeferred', 9);
console.log('onshowing');
page.onShow();

