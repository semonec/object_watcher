"use strict"

// Logger
let DEBUG = false;
let Log = {
  log: (...msgs) => {
    if (DEBUG) console.log(...msgs);
  },
  warn: (msg) => {
    if (DEBUG) console.warn(msg);
  },
  debug: (msg) => {
    if (DEBUG) console.debug(msg);
  },
  error: (msg) => {
    if (DEBUG) console.error(msg);
  },
};

const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

let watch = (obj, handler) => {
  if (!(Proxy !== undefined)) { // Proxy not supported
    //return Watchable(_self);
  }

  // Proxy supported
  return ProxyWatchable(obj, handler);
};

let ProxyWatchable = (_self, handler) => {
  
  const watchable =  new Proxy(_self, {
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


export default watch;