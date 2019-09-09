import { Log } from './logger';
import { isArray, isObject, isString, isNumber } from './util';
import ClassicWatchable from './classicWatcher';

/**
 * @function watch
 * @param {*} obj : Watch 하고자 하는 object, array
 * @param {*} handler : property 값이 변회할 때에 호출되는 callback 함수
 * @returns Watchable object, return 되는 Object의 property에 set 을 할 경우 값의 변화에 따른 callback 이 호출된다.
 */
export default function watch(obj, handler) {
  if (!isArray(obj) && !isObject(obj)) {
    console.error("Array and Object supported only.");
    throw Error("Not supported to", typeof obj);
  }
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
