'use strict'

export const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
  
export const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const isNumber = (num) => {
  return Object.prototype.toString.call(num) === '[object Number]';
};

export const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]';
};

export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

export const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }
  return true;
}

export const DelayPromise = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), duration);
  });
}
