function init() {
  const hash = window.location.hash;
  if (hash) {
    console.log('// Знаходимо елемент із відповідним ID');
    const target = document.querySelector(hash);
    if (target) {
      console.log('// Виконуємо прокрутку до елемента');
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  import('./header.js');
  import('./categories-aside.js');
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
