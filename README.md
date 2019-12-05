# mp-event
A simple event subscription publishing system implementation

# Installation

>`$ npm install --save mp-event`

# Getting started

```ts
import { event } from 'mp-event';

const eventName = Symbol();
event.on(eventName, console.log);
event.emit(eventName, 1);
event.emit(eventName, 2);
event.off(eventName);

//output:
1
2
```
# API

## on(name: string | symbol, fn: Function, options?: object) : void
Register an event subscription

* **name**: event name. 
* **fn**: callback function when the event is triggered.
* **options**: subscription options.
* * target(optional, object): the value to be passed as the ***this*** parameter to the target function when the callback function is called.
* * once(optional, boolean): whether the event is called only once.
* * unique(optional, boolean): register a unique callback function by event name and target.
```ts
const event = require('mp-event');

const eventName = Symbol();
const target = { name: 'fisher' };
event.on(eventName, function () { console.log(this.name) }, { target });
event.emit(eventName);

// output
fisher
```
***
## once(name: string | symbol, fn: Function, options?: object) : void
Register an event subscription, but only be triggered once.
* **name**: event name. 
* **fn**: callback function when the event is triggered.
* **options**: subscription options.
* * target: the value to be passed as the this parameter to the target function when the callback function is called.
* * unique(boolean): register a unique callback function by event name and target.
***
```ts
const event = require('mp-event');

const eventName = Symbol();
event.once(eventName, console.log);
event.emit(eventName, 1);
event.emit(eventName, 1);// ignored

// output
1
```
## emit(name: string | symbol, data?: any) : void
Trigger event by name and data.
* **name**: event name. 
* **data**: event data pass to the callback functions.
***
```ts
const event = require('mp-event');

const eventName = Symbol();
event.on(eventName, data => console.log(data.name));
event.emit(eventName, { name: 'fisher' });

// output
fisher
```
## off(name: string | symbol, options?: object) : void
Cancel event subscription by name and target, the current operation will compare the name and target (default is **undefined**) at the same time. If you want to completely clear all subscriptions, please use **clear** method.
* **name**: event name. 
* **options**: subscription options.
* * target: the value to be passed as the ***this*** parameter to the target function when the callback function is called.
```ts
// remove all subscriptions which name equals to "eventName" and the target is undefined.
event.off('eventName');

const obj={};
// remove all subscriptions which name equals to "eventName" and the target equals to obj.
event.off('eventName', { target: obj });
```
***
## clear(name?: string | symbol, clearAllIfNameIsNil?: boolean) : void
Clear subscriptions by event name
* **name**: event name. 
* **clearAllIfNameIsNil**: whether clear all subscriptions if event name is null or undefined.
```ts
// remove all subscriptions which name equals to "eventName"
event.off('eventName');
// remove all subscriptions;
event.off(null, true);
```
# Decorators
## bindEvent(options?: string| symbol | object)
Bind the current method as a callback function for the specified event
*  name(string|symbol, optional): event name, default use current method name.
*  deferred(boolean, optional): whether to delay execution to the specified lifetime, such as 'onShow'.
*  once(boolean, optional): whether to trigger only once.
*  global(boolean, optional): whether to register as a global event.
## event(options?: object)
Register events and automatically unbind events when the page or component is destroyed.
*  onLifetime(string, optional): the lifetime for initializing events.
*  deferralLifetime(string, optional): the lifetime for deferring events.
*  offLifetime(string, optional): the lifetime for destroying events.
```ts
import { event, bindEvent } from 'mp-event';
import { Page, page } from 'wxa-core';

@page()
@event()
export default class extends Page{
    @bindEvent()
    callback(){
        //do something
    }
}
```
###  Config Global Event Options
Global event options can be set by binding Page or Component's prototype properties in entry file.
```ts
//app.ts
import { event } from 'mp-event';
import { Page, Component } from 'wxa-core';

event.config({
    onLifetime: 'onLoad',
    offLifetime: 'onUnload',
    deferralLifetime: 'onShow'
}, Page);

event.config({
    onLifetime: 'attached',
    offLifetime: 'detached',
    deferralLifetime: 'show'
}, Component);
```

