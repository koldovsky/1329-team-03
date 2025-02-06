function init() {
  import("./header.js");
  import("./index.hero.js");
  import("./index.popular-items.js");
  import("./index.deals.js");
  import("./footer.js");
  import("./index.categories-aside.accordion.js");
  import("./index.categories-aside.js");
  import("./index.about-us.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
