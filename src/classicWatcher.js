import { shallowEqual, deepCopy} from './util';
import { Log } from './logger';

export default function ClassicWatchable(_self, handler) {
  // classical way to watch
  let _cloned = deepCopy(_self);

  const properties = Object.getOwnPropertyNames(_self.__proto__).filter(item => typeof Array.prototype[item] === 'function');
  properties.forEach((methodName, index) => {
    const _method = _self[methodName];
    Object.defineProperty(_self, methodName, {
      enumerable: false,
      configurable: true,
      writable: false,
      value: function() {
        const prev = JSON.parse(JSON.stringify(_self));
        let result = _method.apply(_self, arguments);
        if (!shallowEqual(prev, _self)) {
          handler({
            type: 'changed',
            prev,
            value: _self,
          });
          CheckGetterAndSet(_self);
        }
        return result;
      }
    });
  }); // register watcher into it's prototype

  let CheckGetterAndSet = (obj) => {
    Object.getOwnPropertyNames(obj)
    .filter( item => properties.indexOf(item) < 0 && item !== 'length')
    .forEach(_index => {
      if (obj.__lookupGetter__ !== undefined && obj.__lookupGetter__(_index) === undefined)
        registerGetterSetter(obj, _index);
    }); // register watcher itself
  }
  let registerGetterSetter = (obj, prop) => {
    Object.defineProperty(obj, prop, {
      enumerable: false,
      configurable: true,
      set: function() {
        if (_cloned[prop] !== arguments[0]) {
          handler({
            type: 'changed',
            prev: _cloned[prop],
            value: arguments[0],
          });
          _cloned[prop] = arguments[0];
        }
      },
      get: function() {
        return _cloned[prop];
      },
    });
  };

  CheckGetterAndSet(_self);
  return _self;
}