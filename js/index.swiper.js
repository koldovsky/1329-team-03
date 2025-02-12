document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = Array.from(slider.children);

  // Дублюємо всі слайди для безперервності
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
  });
});