function init() {
  import('./header.js');
  import('./categories-aside.js');

  document.addEventListener('DOMContentLoaded', () => {
    console.log('// Отримуємо хеш із URL');
    const hash = window.location.hash;
    if (hash) {
      console.log('// Знаходимо елемент із відповідним ID');
      const target = document.querySelector(hash);
      if (target) {
        // Виконуємо прокрутку до елемента
        console.log('// Виконуємо прокрутку до елемента');
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
