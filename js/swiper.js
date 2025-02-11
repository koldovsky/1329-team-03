document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");

  let currentIndex = 0;
  // Враховуємо ширину одного слайду + відступ (gap: 15px)
  let slideWidth = slides[0].offsetWidth + 15;

  // Функція оновлення позиції слайдера
  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Клік по кнопці "Вперед"
  nextBtn.addEventListener("click", function () {
    // Якщо не досягли останнього слайду – йдемо далі
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      // Якщо досягли останнього – повертаємося на перший
      currentIndex = 0;
    }
    updateSliderPosition();
  });

  // Клік по кнопці "Назад"
  prevBtn.addEventListener("click", function () {
    // Якщо не на першому слайді – йдемо назад
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // Якщо на першому – переходимо на останній
      currentIndex = slides.length - 1;
    }
    updateSliderPosition();
  });

  // Перерахунок ширини при зміні розміру вікна
  window.addEventListener("resize", function () {
    slideWidth = slides[0].offsetWidth + 15;
    updateSliderPosition();
  });
});
