

// shallowCopy needed
function arrayDiff(arrA, arrB) {
  if (arrA.length !== arrB.length)
    return true;
  // same length, compare it's value
  return arrA.some((value, i) => {
    return arrB[i] !== value;
  });
}

