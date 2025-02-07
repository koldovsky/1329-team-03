function init() {
  import('./header.js');
  import('./index.hero.js');
  import('./index.popular-items.js');
  import('./index.countdown.js');
  import('./footer.js');
  import('./index.categories.js');
  import('./scroll-to-top.js');
  import('./swiper.js');
  import('./index.footer-contact-form.js');
  import('./global.cart.js');
  import('./index.news.js');
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
