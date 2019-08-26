# mp-event
A simple event subscription publishing system implementation

# Installation

>`$ npm install --save mp-event`

# Getting started

```
// import * as event from 'mp-event';
const event = require('mp-event');

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
```
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
```
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
```
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
```
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
```
// remove all subscriptions which name equals to "eventName"
event.off('eventName');
// remove all subscriptions;
event.off(null, true);
```