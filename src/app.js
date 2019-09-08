"use strict"
import watch from './watcher';

console.log('------------------ test array ------------------');
let array = [1,2,3];
let watched = watch(array, (event) => {
  console.log( 'listener', event );
});
watched.push(4);
watched[0] = 0;
watched.pop();

console.log('------------------ test object ------------------');
let obj = { a : 1};
let watched2 = watch(obj, (event) => {
  console.log( 'listener', event );
});
watched2.b = 2;
watched2.a = 0;
delete watched2.a;

