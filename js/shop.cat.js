// Halyna Fedkiv
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "default"; 

  const section = document.getElementById("category-section");

  if (category) {
    section.setAttribute("data-hx-trigger", "load");
    section.setAttribute("data-hx-swap", "outerHTML");
    section.setAttribute("data-hx-get", `shop.cat.${category}.partial.html`);

    htmx.process(section);
  }
});
