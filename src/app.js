"use strict"
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

let testObjTassk = () => {
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

let testRunner = new Promise((resolve, rejct) => {
  console.log('------------------ Start Object watcher test ------------------');
  resolve();
})

testRunner
  .then(() => testArrayTask())
  .then(() => console.log('------------------ wait 1sec, for next test ------------------'))
  .then(() => testObjTassk())
  .then(() => console.log('------------------ test finished ------------------'))
