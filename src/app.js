import { watch, unwatch } from './watcher';
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
  let obj = {};
  obj.str = "a";
  obj.watcherValue = {};
  obj.watcherValue.str = obj.str;
  obj.__defineSetter__("str", (newValue) => {
    watcherFunc({
      'type': 'change',
      'prev': obj.watcherValue.str,
      'value': newValue
    });
    obj.watcherValue.str = newValue;
  });
  obj.__defineGetter__("str", () => this.watcherValue.str);
  
  console.log('string changed, prev was "a" and value is "b" ');
  obj.str = "b";


  obj.num = 1;
  obj.watcherValue.num = obj.num;
  obj.__defineSetter__("num", (newValue) => {
    watcherFunc({
      'type': 'change',
      'prev': obj.watcherValue.num,
      'value': newValue
    });
    obj.watcherValue.str = newValue;
  });
  obj.__defineGetter__("num", () => this.watcherValue.num);
  
  console.log('number changed, prev was 1 and value is 2 ');
  obj.num = 2;
  return DelayPromise(1000);
}

let testRunner = new Promise((resolve, rejct) => {
  console.log('------------------ Start Object watcher test ------------------');
  resolve();
})

testRunner
  .then(() => testArrayTask())
  .then(() => console.log('------------------ wait 1sec, for next test ------------------'))
  .then(() => testObjTask())
  .then(() => console.log('------------------ wait 1sec, for next test ------------------'))
  .then(() => testStringTask())
  .then(() => console.log('------------------ test finished ------------------'))
