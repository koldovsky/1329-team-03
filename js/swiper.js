// script.js
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");
  
  let currentIndex = 0;
  let slideWidth = slides[0].offsetWidth + 23; // 23px - gap між слайдами

  // Функція оновлення позиції слайдера
  function updateSliderPosition() {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Обробник кліку "Вперед"
  nextBtn.addEventListener("click", function () {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
      slider.style.transition = "none";
      slider.style.transform = `translateX(0)`;
      setTimeout(updateSliderPosition, 20);
    }
    updateSliderPosition();
  });

  // Обробник кліку "Назад"
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1;
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      setTimeout(updateSliderPosition, 20);
    }
    updateSliderPosition();
  });

  // Оновлення slideWidth при зміні розміру вікна
  window.addEventListener("resize", function () {
    slideWidth = slides[0].offsetWidth + 23;
    updateSliderPosition();
  });
});
