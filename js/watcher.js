
// Logger
let DEBUG = true
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

const isArr = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

const isObj = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

function ProxyWatchable(_self) {
  return new Proxy(_self, {
    deleteProperty: (target, property) => {
      Log.log('deleted ', property, ' property, value was:', target[property]);
      return true;
    },
    set: (target, property, value, receiver) => {
      const prev = target[property];
      target[property] = value;
      console.log("Set ", property, ' from ', prev, ' to ', value);
      return true;
    }
  });
}

function watcherObj(_self) {
  // if (!(Proxy !== undefined)) {
  //   return Watchable(_self);
  // } else {
    return ProxyWatchable(_self);
  //}
};


export const watch = (_data) => {
  if (isArr(_data) || isObj(_data))
    return watcherObj(_data);
}
// let array = [0, 1];

// const watcherArray = watchArray(array);

// watcherArray.push(2);
// watcherArray.pop();
// Log.log(watcherArray);

// let num = 1;
// const watcherVariable = watchArray(num);

// num = 2;

