const isArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

let array = [0];

function arrayDiff(arrA, arrB) {
  if (arrA.length !== arrB.length)
    return true;
  // same length, compare it's value
  return arrA.some((value, i) => {
    return arrB[i] !== value;
  });
}

function watchArray(obj) {
  let cloned = JSON.parse(JSON.stringify(obj));
  let properties = Object.getOwnPropertyNames(Array.prototype).filter(item => typeof Array.prototype[item] === 'function');
  properties.forEach((methodName, index) => {
    const origin_method = obj[methodName];
    Object.defineProperty(obj, methodName, {
      enumerable: false,
      configurable: true,
      writable: false,
      value: function() {
        const prev = JSON.parse(JSON.stringify(obj));
        let result = origin_method.apply(obj, arguments);
        if (arrayDiff(prev, obj))
          console.log('diffrent', prev, obj);
        return result;
      }
    });
  });
  setInterval(() => {
    if (arrayDiff(cloned, obj)) {
      console.log('value changed', cloned, obj);
      cloned = JSON.parse(JSON.stringify(obj));
    }
  }, 500);
};

watchArray(array);

// watchFunctions(array, (obj, idex, method, newValue, oldValue) => {

// });
// array[0] = 1;
// //array.push(2);
