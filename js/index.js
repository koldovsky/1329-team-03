function init() {
<<<<<<< HEAD
  import("./header.js");
  import("./index.hero.js");
  import("./index.deals.js");
  import("./footer.js");
  import("./index.categories-aside.accordion.js");
  import("./index.categories-aside.js");
=======
  import('./header.js');
  import('./index.hero.js');
  import('./index.deals.js');
  import('./footer.js');
  import('./index.categories.js');
  import('./index.about-us.js');
  import('./scroll-to-top.js');
>>>>>>> 8cb3181d79014f314a9f23d7e9e84fa47d063731
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
