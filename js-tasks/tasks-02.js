// https://www.codewars.com/kata/convert-a-string-to-an-array/train/javascript
function stringToArray(string) {
  // Розбити рядок на масив по роздільнику
  return string.split(" ");
}

// https://www.codewars.com/kata/dna-to-rna-conversion/train/javascript
function DNAtoRNA(dna) {
  // Заміна всіх символів "T" у рядку dna на "U"
  return dna.replace(/T/g, "U");
}

function DNAtoRNA(dna) {
  // Заміна всіх символів "T" у рядку dna на "U"
  return dna.replaceAll("T", "U");
}

// Додатковий варіант
function DNAtoRNA(dna) {
  // Розбиваємо рядок на масив частин, використовуючи символ "T" як роздільник -
  // замість "T" не буде нічого, замість "TТ" буде "" і так далі.
  // Об'єднуємо елементи масиву назад у рядок -
  // у місці з'єднання частин з'явиться "U", замість "" буде "UU" і так далі.
  return dna.split("T").join("U");
}

// Додатковий варіант
function DNAtoRNA(dna) {
  // Розбити рядок на масив символів
  // const dnaArray = dna.split("");
  // Повернути новий масив, замінивши "T" на "U"
  // const dnaReplace = dnaArray.map((el) => el.replace("T", "U"));
  // Масив символів об'єднати в рядок
  // return dnaReplace.join("");

  // Короткий запис
  return dna
    .split("")
    .map((el) => el.replace("T", "U"))
    .join("");
}

// Або
function DNAtoRNA(dna) {
  const result = [];
  for (char of dna) {
    result.push(char.replace("T", "U"));
  }
  return result.join("");
}

//
function DNAtoRNA(dna) {
  let rna = [];
  for (let i = 0; i < dna.length; i++) {
    if (dna[i] === "T") {
      rna[i] = "U";
      continue;
    }
    rna[i] = dna[i];
  }
  return rna.join("");
}

// https://www.codewars.com/kata/577a98a6ae28071780000989/train/javascript

// https://www.codewars.com/kata/544a54fd18b8e06d240005c0/train/javascript

// Double Integer    https://www.codewars.com/kata/53ee5429ba190077850011d4/train/javascript
// Twice as old    https://www.codewars.com/kata/5b853229cfde412a470000d0/train/javascript
// Return n-th even number    https://www.codewars.com/kata/5933a1f8552bc2750a0000ed/train/javascript
// What's the real floor     https://www.codewars.com/kata/574b3b1599d8f897470018f6/train/javascript
// Clock    https://www.codewars.com/kata/55f9bca8ecaa9eac7100004a/train/javascript
// Is n divisible by x and y    https://www.codewars.com/kata/5545f109004975ea66000086/train/javascript

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
