const event = require('../index');
const eventName = Symbol();
event.on(eventName, console.log);
event.on(eventName, console.log);
event.emit(eventName, 1);
event.off(eventName);
console.log('--------------------------------');
event.on(eventName, console.log, { unique: true });
event.on(eventName, console.log, { unique: true });
event.emit(eventName, 1);
event.off(eventName);
event.once(eventName, console.log);
event.emit(eventName, 1);
event.emit(eventName, 1);// ignored
event.off(eventName);
console.log('--------------------------------');
event.on(eventName, function () {
    console.log(this.name);
}, {
        target: { name: 'fisher' },
    });
event.emit(eventName);
event.clear(eventName);
console.log('--------------------------------');
event.on(eventName, console.log);
event.emit(eventName, 1);
event.emit(eventName, 2);
event.clear(eventName);
console.log('--------------------------------');

event.on(eventName, data => console.log(data.name));
event.emit(eventName, { name: 'fisher' })

