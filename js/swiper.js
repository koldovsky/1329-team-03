document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");

  let slideWidth = slides[0].offsetWidth + 15; // Учитываем gap между слайдами
  let currentIndex = 0;

  function moveSlider(offset) {
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % slides.length;
    moveSlider(slideWidth * currentIndex);
  });

  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveSlider(slideWidth * currentIndex);
  });
});
