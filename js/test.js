// our backing array
let array = ["a", "b", "c", "d"];

// a proxy for our array
var proxy = new Proxy(array, {
  apply: function(target, thisArg, argumentsList) {
    return thisArg[target].apply(this, argumentList);
  },
  deleteProperty: function(target, property) {
    console.log("Deleted %s", property);
    return true;
  },
  set: function(target, property, value, receiver) {      
    target[property] = value;
    console.log("Set %s to %o", property, value);
    return true;
  }
});

console.log("Set a specific index..");
proxy[0] = "x";

console.log("Add via push()...");
proxy.push("z");

console.log("Add/remove via splice()...");
proxy.splice(1, 3, "y");

console.log("Current state of array: %o", array);