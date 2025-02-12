function initializeSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  // Отримуємо всі слайди
  let slides = Array.from(slider.children);
  if (slides.length < 2) return;

  // Додаємо клони для безперервної роботи
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  slider.appendChild(firstClone); // Додаємо копію першого в кінець
  slider.insertBefore(lastClone, slides[0]); // Додаємо копію останнього в початок

  slides = Array.from(slider.children); // Оновлюємо масив слайдів
  let currentIndex = 1;
  let slideWidth = slides[currentIndex].offsetWidth + 23; // Враховуємо gap між слайдами

  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  function updateSliderPosition(transition = true) {
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function moveNext() {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updateSliderPosition();
  }

  function movePrev() {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSliderPosition();
  }

  nextBtn.addEventListener("click", moveNext);
  prevBtn.addEventListener("click", movePrev);

  slider.addEventListener("transitionend", function () {
    if (slides[currentIndex] === firstClone) {
      currentIndex = 1;
      updateSliderPosition(false);
    }
    if (slides[currentIndex] === lastClone) {
      currentIndex = slides.length - 2;
      updateSliderPosition(false);
    }
  });

  window.addEventListener("resize", function () {
    slideWidth = slides[currentIndex].offsetWidth + 23;
    updateSliderPosition(false);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeSlider();
});
