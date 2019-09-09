import watch from './watcher';
import { DelayPromise } from './util';

let watcherFunc =  (event) => {
  console.log('watcher callback >>', event );
};

let testArrayTask = () => {
  console.log('------------------ test array ------------------');
  let array = [1,2,3];
  let watched = watch(array, watcherFunc);
  console.log('array push, 4 into 4th index ');
  watched.push(4);
  console.log('array change, 0th index item will be changed as 0 fronm 1 ');
  watched[0] = 0;
  console.log('array pop, 4th index will be deleted, value was 4');
  watched.pop();
  return DelayPromise(1000);
}

let testObjTask = () => {
  console.log('------------------ test object ------------------');
  let obj = { a : 1};
  let watched2 = watch(obj, watcherFunc);
  console.log('object assign new property, key is "b" and value is 2 ');
  watched2.b = 2;
  console.log('object change "a" property with value 2 from "1"');
  watched2.a = 0;
  console.log('object delete "a" property, value was 0');
  delete watched2.a;
  return DelayPromise(1000);
}

let testStringTask = () => {
  console.log('------------------ test string & number ------------------');
  global.str = "a";
  global.watcherValue = {};
  global.watcherValue.str = global.str;
  global.__defineSetter__("str", (newValue) => {
    watcherFunc({
      'type': 'changed',
      'prev': global.watcherValue.str,
      'value': newValue
    });
    global.watcherValue.str = newValue;
  });
  global.__defineGetter__("str", () => global.watcherValue.str);
  
  console.log('string changed, prev was "a" and value is "b" ');
  global.str = "b";


  global.num = 1;
  global.watcherValue.num = global.num;
  global.__defineSetter__("num", (newValue) => {
    watcherFunc({
      'type': 'changed',
      'prev': global.watcherValue.num,
      'value': newValue
    });
    global.watcherValue.str = newValue;
  });
  global.__defineGetter__("num", () => global.watcherValue.num);
  
  console.log('number changed, prev was 1 and value is 2 ');
  global.num = 2;
  return DelayPromise(1000);
}

let testRunner = new Promise((resolve, rejct) => {
  console.log('------------------ Start Variable Watcher test ------------------');
  resolve();
})

testRunner
  .then(() => testArrayTask())
  .then(() => console.log('------------------ wait 1sec, for next test ------------------'))
  .then(() => testObjTask())
  .then(() => console.log('------------------ wait 1sec, for next test ------------------'))
  .then(() => testStringTask())
  .then(() => console.log('------------------ test finished ------------------'))
