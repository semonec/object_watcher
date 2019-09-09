"use strict"
import { Log } from './logger';
import { isNumber, isObject, isString } from './util';
import ClassicWatchable from './classicWatcher';

export function watch(obj, handler) {
  if (!(Proxy !== undefined)) { // Proxy not supported
    return ClassicWatchable(obj, handler);
  }
  // Proxy supported
  return ProxyWatchable(obj, handler);
};

let ProxyWatchable = (_self, handler) => {
  let instance = _self;
  if (isNumber(_self) || isString(_self))
   instance = { };
  const watchable =  new Proxy(instance, {
    deleteProperty: (target, property) => {
      Log.log('deleted ', property, ' property, value was:', target[property]);
      handler({
        type: 'deleted',
        property,
        value: target[property],
      });
      return true;
    },
    set: (target, property, value, receiver) => {
      const prev = target[property];
      target[property] = value;
      // prevent event occur for Array object's length property
      if (!isArray(_self) || property !== 'length') {
        Log.log("Set ", property, ' from ', prev, ' to ', value);
        handler({
          type: ((prev === undefined) && (value !== undefined)) ? 'added' : 'modified',
          property,
          prev,
          value,
        });
      }
      return true;
    }
  });
  return watchable;
}
