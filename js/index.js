function init() {
  import('./header.js');
  import('./categories-aside.js');
  const hash = window.location.hash;
  console.log('Hash' + window.location.hash);
  if (hash) {
    // Знаходимо елемент із відповідним ID
    const target = document.querySelector(hash);
    console.log('Target' + document.querySelector(hash));
    if (target) {
      // Виконуємо прокрутку до елемента
      console.log('// Виконуємо прокрутку до елемента');
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
