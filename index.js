(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var _1 = __webpack_require__(2);
var relect_1 = tslib_1.__importDefault(__webpack_require__(9));
var Event = /** @class */ (function () {
    function Event() {
    }
    Event.prototype.bind = function (options, method) {
        var events = this.getEvents();
        events.push([options, method]);
        relect_1.default.defineMetadata(Event.BOUND_EVENTS_KEY, events, this);
    };
    Event.prototype.register = function (prototype, options) {
        var _a;
        var events = this.getEvents();
        return _a = {},
            _a[options.onLifetime] = function () {
                var _this = this;
                events.forEach(function (_a) {
                    var _b = tslib_1.__read(_a, 2), opts = _b[0], method = _b[1];
                    _1.on(opts.name, method, Object.assign({}, opts, { target: _this }));
                });
            },
            _a[options.offLifetime] = this.destroy(events),
            _a;
    };
    Event.prototype.destroy = function (events) {
        return function () {
            var _this = this;
            events.forEach(function (_a) {
                var _b = tslib_1.__read(_a, 1), opts = _b[0];
                return _1.off(opts.name, { target: _this });
            });
        };
    };
    Event.prototype.getEvents = function () {
        var events = relect_1.default.getOwnMetadata(Event.BOUND_EVENTS_KEY, this);
        return events ? events.slice() : [];
    };
    Event.prototype.registerImplicitEvents = function (events, prototype, eventKey) {
        return function () {
            events.forEach(function (_a) {
                var _b = tslib_1.__read(_a, 2), opts = _b[0], method = _b[1];
                _1.on(opts.name, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var evts = relect_1.default.getMetadata(eventKey, prototype);
                    evts = evts ? new Map(evts) : new Map();
                    evts.set(opts.name, [method, args]);
                    relect_1.default.defineMetadata(eventKey, evts, prototype);
                }, opts);
            });
        };
    };
    Event.prototype.emitImplicitEvents = function (prototype, eventKey) {
        return function () {
            var _this = this;
            var implicitEvents = relect_1.default.getMetadata(eventKey, prototype);
            if (implicitEvents) {
                implicitEvents.forEach(function (_a) {
                    var _b = tslib_1.__read(_a, 2), method = _b[0], args = _b[1];
                    return method.apply(_this, args);
                });
                implicitEvents.clear();
            }
        };
    };
    Event.BOUND_EVENTS_KEY = Symbol();
    return Event;
}());
exports.default = Event;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var decoraters_1 = __webpack_require__(6);
exports.bindEvent = decoraters_1.bindEvent;
exports.event = decoraters_1.event;
var events_1 = __webpack_require__(5);
exports.on = events_1.on;
exports.emit = events_1.emit;
exports.once = events_1.once;
exports.off = events_1.off;
exports.clear = events_1.clear;
var constants_1 = __webpack_require__(3);
exports.EVENT_OPTIONS = constants_1.EVENT_OPTIONS;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_OPTIONS = Symbol();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var event_1 = tslib_1.__importDefault(__webpack_require__(1));
var GlobalEvent = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalEvent, _super);
    function GlobalEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalEvent.prototype.register = function (prototype, options) {
        var _a;
        var events = this.getEvents();
        var eventKey = GlobalEvent.GLOBAL_EVENTS;
        _super.prototype.registerImplicitEvents.call(this, events, prototype, eventKey)();
        var emitImplicitEvents = _super.prototype.emitImplicitEvents.call(this, prototype, eventKey);
        return _a = {}, _a[options.onLifetime] = emitImplicitEvents, _a;
    };
    GlobalEvent.GLOBAL_EVENTS = Symbol("global events");
    return GlobalEvent;
}(event_1.default));
exports.default = GlobalEvent;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var events = new Map();
/**
 * Register an event subscription
 * @param name event name
 * @param callback callback function when the event is triggered
 * @param options subscription options
 */
function on(name, callback, options) {
    if (typeof callback !== "function") {
        throw new Error("callback must be a function");
    }
    options = Object.assign({ unique: false }, options);
    var _a = options, unique = _a.unique, oneOff = _a.once, target = _a.target;
    var tuple = [target, callback, !!oneOff];
    var callbacks = events.get(name) || [];
    if (unique) {
        var exisits = callbacks.some(function (_a) {
            var _b = tslib_1.__read(_a, 1), t = _b[0];
            return target === t;
        });
        if (exisits) {
            return;
        }
    }
    callbacks.push(tuple);
    events.set(name, callbacks);
}
exports.on = on;
/**
 * Register an event subscription, but only be triggered once
 * @param name event name
 * @param callback callback function when the event is triggered
 * @param options subscription options
 */
function once(name, callback, options) {
    on(name, callback, Object.assign({}, options, { once: true }));
}
exports.once = once;
/**
 * Cancel event subscription by name and target
 * @param name event name
 * @param options subscription options
 */
function off(name, options) {
    var callbacks = events.get(name);
    if (!callbacks) {
        return;
    }
    if (Array.isArray(callbacks)) {
        var target_1 = Object.assign({}, options).target;
        events.set(name, callbacks.filter(function (tuple) { return tuple[0] !== target_1; }));
    }
}
exports.off = off;
function isNil(value) {
    return value === undefined || value === null;
}
/**
 * Clear subscriptions by event name
 * @param name event name
 * @param clearAllIfNameIsNil whether clear all subscriptions if event name is null or undefined
 */
function clear(name, clearAllIfNameIsNil) {
    if (clearAllIfNameIsNil && isNil(name)) {
        events.clear();
    }
    else {
        events.delete(name);
    }
}
exports.clear = clear;
/**
 * Trigger event by name and data
 * @param name event name
 * @param data event data pass to the callback functions.
 */
function emit(name, data) {
    var callbacks = events.get(name);
    if (Array.isArray(callbacks)) {
        for (var i = callbacks.length - 1; i >= 0; i--) {
            var tuple = callbacks[i];
            var _a = tslib_1.__read(tuple, 3), target = _a[0], callback = _a[1], oneOff = _a[2];
            callback.call(target, data);
            if (oneOff) {
                callbacks.splice(i, 1);
            }
        }
    }
}
exports.emit = emit;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(3);
var event_manager_1 = __webpack_require__(7);
var evt = tslib_1.__importStar(__webpack_require__(5));
var defaultConfig = { onLifetime: "onLoad", deferralLifetime: "onShow", offLifetime: "onUnload" };
/**
 * Register events and automatically unbind events when the page is destroyed.
 * @param options event options
 */
function event(options) {
    return function (constructor) {
        var prototype = constructor.prototype;
        options = Object.assign({}, defaultConfig, prototype[constants_1.EVENT_OPTIONS], options);
        event_manager_1.EventManager.from(prototype).register(prototype, options);
    };
}
exports.event = event;
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
event.config = function (options, target) {
    if (typeof target === "function") {
        target.prototype[constants_1.EVENT_OPTIONS] = options;
    }
    else {
        Object.assign(defaultConfig, options);
    }
};
/**
 * Bind the current method as a callback function for the specified event
 * @param options event options
 */
function bindEvent(options) {
    return function (target, name, descriptor) {
        var isKeyType = typeof options === "string" || typeof options === "symbol";
        var opts = isKeyType ? { name: options } : Object.assign({ name: name }, options);
        event_manager_1.EventManager.from(target).bind(opts, descriptor.value);
    };
}
exports.bindEvent = bindEvent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var deferral_event_1 = tslib_1.__importDefault(__webpack_require__(8));
var event_1 = tslib_1.__importDefault(__webpack_require__(1));
var global_deferral_event_1 = tslib_1.__importDefault(__webpack_require__(12));
var global_event_1 = tslib_1.__importDefault(__webpack_require__(4));
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.events = new Map();
    }
    EventManager.from = function (prototype) {
        if (prototype[EventManager.eventkey]) {
            return prototype[EventManager.eventkey];
        }
        return prototype[EventManager.eventkey] = new EventManager();
    };
    EventManager.prototype.create = function (options) {
        if (options.global && options.deferred) {
            return new global_deferral_event_1.default();
        }
        else if (options.global && !options.deferred) {
            return new global_event_1.default();
        }
        else if (!options.global && options.deferred) {
            return new deferral_event_1.default();
        }
        else {
            return new event_1.default();
        }
    };
    EventManager.prototype.bind = function (options, method) {
        var event = this.get(options);
        event.bind(options, method);
    };
    EventManager.prototype.register = function (prototype, options) {
        var handles = Array.from(this.events.values()).map(function (event) { return event.register(prototype, options); });
        [options.onLifetime, options.deferralLifetime, options.offLifetime].forEach(function (lifetime) {
            if (handles.some(function (h) { return lifetime in h; })) {
                var original_1 = prototype[lifetime];
                prototype[lifetime] = function () {
                    var _this = this;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    handles.filter(function (h) { return lifetime in h; }).forEach(function (h) { return h[lifetime].call(_this); });
                    return original_1 && original_1.apply(this, args);
                };
            }
        });
    };
    EventManager.prototype.get = function (options) {
        var key = JSON.stringify([!!options.global, !!options.deferred]);
        if (this.events.has(key)) {
            return this.events.get(key);
        }
        else {
            var event_2 = this.create(options);
            this.events.set(key, event_2);
            return event_2;
        }
    };
    EventManager.eventkey = Symbol();
    return EventManager;
}());
exports.EventManager = EventManager;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var event_1 = tslib_1.__importDefault(__webpack_require__(1));
var DeferralEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DeferralEvent, _super);
    function DeferralEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeferralEvent.prototype.register = function (prototype, options) {
        var _a;
        var events = this.getEvents();
        var eventKey = DeferralEvent.DEFERRED_EVENTS;
        var registerImplicitEvents = _super.prototype.registerImplicitEvents.call(this, events, prototype, eventKey);
        var emitImplicitEvents = _super.prototype.emitImplicitEvents.call(this, prototype, eventKey);
        return _a = {},
            _a[options.onLifetime] = registerImplicitEvents,
            _a[options.deferralLifetime] = emitImplicitEvents,
            _a[options.offLifetime] = _super.prototype.destroy.call(this, events),
            _a;
    };
    DeferralEvent.DEFERRED_EVENTS = Symbol("deferred events");
    return DeferralEvent;
}(event_1.default));
exports.default = DeferralEvent;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(11);
function isValid(obj) {
    return typeof obj === "object" && typeof obj.getMetadata === "function";
}
var reflect = (function () {
    if (isValid(Reflect)) {
        return Reflect;
    }
    else if (isValid(global.Reflect)) {
        return global.Reflect;
    }
    else if (isValid(global.global && global.global.Reflect)) {
        return global.global.Reflect;
    }
    return {};
}());
exports.default = reflect;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var global_event_1 = tslib_1.__importDefault(__webpack_require__(4));
var GlobalDeferralEvent = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalDeferralEvent, _super);
    function GlobalDeferralEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalDeferralEvent.prototype.register = function (prototype, options) {
        var _a;
        var lifetimes = _super.prototype.register.call(this, prototype, options);
        return _a = {}, _a[options.deferralLifetime] = lifetimes[options.onLifetime], _a;
    };
    return GlobalDeferralEvent;
}(global_event_1.default));
exports.default = GlobalDeferralEvent;


/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map