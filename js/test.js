import { watch } from './watcher.js'
// our backing array
let array = ["a", "b", "c", "d"];

let watchArray = watch(array);

watchArray.push("e");