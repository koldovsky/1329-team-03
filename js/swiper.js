document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");

  let currentIndex = 0;

  // Враховуємо ширину одного слайду + відступ між ними
  // Якщо ви зміните gap у CSS, змініть його і тут (або рахуйте динамічно)
  let slideWidth = slides[0].offsetWidth + 15;

  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    // transition уже прописано в CSS
  }

  nextBtn.addEventListener("click", function () {
    // Перевірка, чи не вийшли за межі масиву
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Повертаємось до першого
    }
    updateSliderPosition();
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1; // Переходимо на останній
    }
    updateSliderPosition();
  });

  // Якщо розмір екрану змінився, перераховуємо ширину
  window.addEventListener("resize", function () {
    slideWidth = slides[0].offsetWidth + 15;
    updateSliderPosition();
  });
});
