document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");
  
  let currentIndex = 0;
  // Враховуємо ширину слайда та відстань (gap) між слайдами (gap = 23px)
  let slideWidth = slides[0].offsetWidth + 23;

  // Функція оновлення позиції слайдера
  function updateSliderPosition() {
    // Включаємо анімацію при перемиканні
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Обробник кліку "Вперед"
  nextBtn.addEventListener("click", function () {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition();
    } else {
      // Якщо досягли останнього слайда, повертаємося до першого
      currentIndex = 0;
      slider.style.transition = "none"; // Вимикаємо анімацію для миттєвого переходу
      slider.style.transform = `translateX(0)`;
      // Після невеликої затримки відновлюємо анімацію (якщо потрібно)
      setTimeout(updateSliderPosition, 20);
    }
  });

  // Обробник кліку "Назад"
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    } else {
      // Якщо на першому слайді, переходимо до останнього
      currentIndex = slides.length - 1;
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      setTimeout(updateSliderPosition, 20);
    }
  });

  // Оновлення ширини слайда при зміні розміру вікна
  window.addEventListener("resize", function () {
    slideWidth = slides[0].offsetWidth + 23;
    updateSliderPosition();
  });
});
