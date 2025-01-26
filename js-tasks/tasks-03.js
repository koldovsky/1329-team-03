// https://www.codewars.com/kata/geometry-basics-circle-circumference-in-2d/train/javascript

function circleCircumference(circle) {
  return 2 * Math.PI * circle.radius;
}

// https://www.codewars.com/kata/training-js-number-12-loop-statement-for-dot-in-and-for-dot-of/train/javascript

function giveMeFive(obj) {
  const arr = [];
  for (const key in obj) {
    if (key.length === 5) {
      arr.push(key);
    }
    const value = obj[key];
    if (value.length === 5) {
      arr.push(value);
    }
  }
  return arr;
}

// Додатковий спосіб - менш ефективно
function giveMeFive(obj) {
  const result = [];
  for (const key in obj) {
    [key, obj[key]].forEach((k) => {
      if (k.length == 5) {
        result.push(k);
      }
    });
  }
  return result;
}

// Додатковий спосіб, але метод filter повертає новий масив із відфільтрованими елементами
function giveMeFive(obj) {
  const result = [];
  for (const key in obj) {
    result.push(key) && result.push(obj[key]);
  }
  return result.filter((word) => word.length === 5);
}
