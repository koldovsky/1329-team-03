// Convert a string to an array
function stringToArray(string) {
  return string.split(" ");
}

// DNA to RNA Conversion
function DNAtoRNA(dna) {
  return dna.replaceAll(/T/g, "U");
}

// Find Maximum and Minimum Values of a List
var min = function (list) {
  return Math.min(...list);
};

var max = function (list) {
  return Math.max(...list);
};

// Smallest value of an array
function min(arr, toReturn) {
  return toReturn === "value"
    ? Math.min(...arr)
    : arr.indexOf(Math.min(...arr));
}

// You Can't Code Under Pressure #1
function doubleInteger(i) {
  // i will be an integer. Double it and return it.
  return i * 2;
}

// Twice as old
function twiceAsOld(dadYearsOld, sonYearsOld) {
  return Math.abs(dadYearsOld - sonYearsOld * 2);
}

// Get Nth Even Number
function nthEven(n) {
  return (n - 1) * 2;
}

// What's the real floor?
function getRealFloor(n) {
  if (n <= 0) {
    return n;
  } else if (n < 13) {
    return n - 1;
  } else {
    return n - 2;
  }
}

// Beginner Series #2 Clock
function past(h, m, s) {
  return (h * 3600 + m * 60 + s) * 1000;
}

// Is n divisible by x and y?
function isDivisible(n, x, y) {
  return n % x == 0 && n % y == 0;
}
