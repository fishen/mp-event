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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
            var _b = __read(_a, 1), t = _b[0];
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
            var _a = __read(tuple, 3), target = _a[0], callback = _a[1], oneOff = _a[2];
            callback.call(target, data);
            if (oneOff) {
                callbacks.splice(i, 1);
            }
        }
    }
}
exports.emit = emit;


/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map