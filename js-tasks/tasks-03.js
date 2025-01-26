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

// https://www.codewars.com/kata/understanding-closures-the-basics/train/javascript
// Функція buildFun створює масив функцій, де кожна функція при виклику повертає значення індексу,
// на якому вона була створена.
function buildFun(n) {
  return Array.from(
    // Створення масиву з n елементів
    { length: n },
    // Перший параметр в map, — це значення елемента масиву на кожній ітерації - невикористовуємо.
    // Другий параметр i — це індекс елемента масиву в поточній ітерації.
    // Для кожного елемента масиву ми створюємо нову функцію: () => i.
    // Функція, яка передається в Array.from і застосовується до кожного елемента нового масиву,
    // повертає нову функцію, яка при виклику віддасть значення індексу i
    (_, i) => () => i
  );
}

// Або
function buildFun(n) {
  return Array.from({ length: n }).map((_, i) => () => i);
}

// Додатковий спосіб
function buildFun(n) {
  var res = [];

  for (let i = 0; i < n; i++) {
    // Кожна функція повертає значення змінної i - є замиканням (closure),
    // оскільки вона має доступ до змінної i навіть після завершення виконання циклу.
    res.push(() => i);
  }

  // Повертається масив функцій
  return res;
}

// https://www.codewars.com/kata/fun-with-es6-classes-number-2-animals-and-inheritance/train/javascript
class Shark extends Animal {
  constructor(name, age, status) {
    super(name, age, 0, "shark", status); // Кількість ніг 0 і вид "shark"
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, "cat", status); // Кількість ніг 4 і вид "cat"
    // Метод introduce для кота з додаванням "Meow meow!"
    // Створення методу таким чином не дозволяє успадковувати його в підкласах
    // this.introduce = () => super.introduce() + '  Meow meow!';
    // Або
    // this.introduce = () => `${super.introduce()}  Meow meow!`;
  }

  // Створення методу таким чином дозволяє успадковувати його в підкласах
  introduce() {
    return `${super.introduce()}  Meow meow!`;
    // Або
    // return super.introduce() + '  Meow meow!'
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, "dog", status); // Кількість ніг 4 і вид "dog"
    this.master = master;
    // Створення методу таким чином не дозволяє успадковувати його в підкласах
    // this.greetMaster = () => 'Hello' + " " + master;
  }

  greetMaster() {
    return `Hello ${this.master}`;
  }
}
