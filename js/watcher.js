const isArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

let array = [0, 1];

// shallowCopy needed
function arrayDiff(arrA, arrB) {
  if (arrA.length !== arrB.length)
    return true;
  // same length, compare it's value
  return arrA.some((value, i) => {
    return arrB[i] !== value;
  });
}

function watchArray(_self) {
  let _cloned = JSON.parse(JSON.stringify(_self));
  const properties = Object.getOwnPropertyNames(Array.prototype).filter(item => typeof Array.prototype[item] === 'function');
  properties.forEach((methodName, index) => {
    const _method = _self[methodName];
    Object.defineProperty(_self, methodName, {
      enumerable: false,
      configurable: true,
      writable: false,
      value: function() {
        const prev = JSON.parse(JSON.stringify(_self));
        let result = _method.apply(_self, arguments);
        if (arrayDiff(prev, _self))
          console.log('diffrent', prev, _self);
        return result;
      }
    });
  });
  Object.getOwnPropertyNames(_self)
    .filter( item => properties.indexOf(item) < 0 && item !== 'length')
    .forEach(_index => {
      Object.defineProperty(_self, _index, {
        enumerable: false,
        configurable: false,
        set: function() {
          if (_cloned[_index] !== arguments[0]) {
            console.log('setter changed value', _cloned[_index] , arguments[0]);
            _cloned[_index] = arguments[0];
          }
        },
        get: function() {
          return _cloned[_index];
        },
      })
    });
  Object.defineProperty(_self, '', {
    get: function() {
      return _cloned;
    }
  });
};

watchArray(array);
