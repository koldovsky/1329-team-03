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

// Game Move https://www.codewars.com/kata/grasshopper-terminal-game-move-function/train/javascript

function move(position, roll) {
  // До початкової позиції додаємо 2 кроки
  return position + 2 * roll;
}

// Personalized Message https://www.codewars.com/kata/grasshopper-personalized-message/train/javascript

function greet (name, owner) {
  // Якщо людина, яку вітаємо, є босом
  if (name === owner) {
    return 'Hello boss';
  }
  
  // Якщо людина, яку вітаємо, не є босом
  return 'Hello guest';
}

