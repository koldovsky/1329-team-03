// Messi Goals https://www.codewars.com/kata/grasshopper-messi-goals-function/train/javascript

function goals(laLigaGoals, copaDelReyGoals, championsLeagueGoals) {
  // Сума трьох чисел
  return laLigaGoals + copaDelReyGoals + championsLeagueGoals;
}

// Make negative    https://www.codewars.com/kata/55685cd7ad70877c23000102/train/javascript

function makeNegative(num) {
  // Якщо число не є додатнім
  if (num <= 0) {
    return num;
  }

  // Якщо число є додатнім
  return -num;
}

// Те саме трішки по іншому
function makeNegative(num) {
  return num > 0 ? -num : num;
}
// num > 0: Перевіряємо, чи число позитивне.
// Якщо так, повертаємо від'ємне значення числа (-num).
// Якщо ні (число вже від'ємне або дорівнює 0), повертаємо його без змін.


// Game Move https://www.codewars.com/kata/grasshopper-terminal-game-move-function/train/javascript

function move(position, roll) {
  // До початкової позиції додаємо 2 кроки
  return position + 2 * roll;
}

// Personalized Message https://www.codewars.com/kata/grasshopper-personalized-message/train/javascript

function greet(name, owner) {
  // Якщо людина, яку вітаємо, є босом
  if (name === owner) {
    return "Hello boss";
  }

  // Якщо людина, яку вітаємо, не є босом
  return "Hello guest";
}

// Можна записати трошки коротше
function greet(name, owner) {
  return name === owner ? 'Hello boss' : 'Hello guest';
}
// 1.	name === owner — перевіряє, чи ім'я збігається з власником.
// 2.	Використовуємо тернарний оператор ? ::
// Якщо умова виконується (name === owner), повертається 'Hello boss'.
// Інакше повертається 'Hello guest'.


// Keep Hydrated https://www.codewars.com/kata/keep-hydrated-1/train/javascript

function litres(time) {
  // Ділимо на 2
  const result = time / 2;
  // Відкидаємо дробову частину
  return result - (result % 1);
}

// Інший варіант
function litres(time) {
  return Math.floor(time * 0.5);
}
// 1.	time * 0.5 — обчислює кількість літрів води, які Натану потрібно випити за даний час (по 0.5 літра за годину).
// 2.	Math.floor() — округлює значення до найменшого цілого числа (до меншого).


// Opposites Attract https://www.codewars.com/kata/555086d53eac039a2a000083/train/javascript

function lovefunc(flower1, flower2) {
  // Перевіряємо умову закоханості
  return (
    (flower1 % 2 === 0 && flower2 % 2 === 1) ||
    (flower1 % 2 === 1 && flower2 % 2 === 0)
  );
}

function lovefunc(flower1, flower2) {
  // Перевіряємо умову, коли парне число лише на одній з квіток
  return (flower1 + flower2) % 2 == 1;
}

function lovefunc(flower1, flower2) {
  // Перевіряємо умову, коли на квітках різні (парне та непарне) числа квіток
  return flower1 % 2 !== flower2 % 2;
}

// Трохи коротший варіант
function lovefunc(flower1, flower2) {
  return (flower1 % 2 !== flower2 % 2);
}
// 1.	flower1 % 2 — визначає, чи кількість пелюсток у першої квітки парна (результат 0) чи непарна (результат 1).
// 2.	flower2 % 2 — те саме, але для другої квітки.
// 3.	!== — перевіряє, чи одна квітка має парну кількість пелюсток, а інша непарну.
// Якщо умова виконується (одна парна, інша непарна), повертається true.
// Інакше повертається false.


