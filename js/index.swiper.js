// index.swiper.js

// Функція для спостереження за слайдами та додавання класу "visible" з невеликим затриманням
function observeSlides() {
  const slides = document.querySelectorAll('.slide');
  const sliderWrapper = document.querySelector('.slider-wrapper');
  if (!sliderWrapper) return;

  const options = {
    root: sliderWrapper,
    threshold: 0.5 // налаштовуйте, якщо потрібно
  };

  const observer = new IntersectionObserver((entries) => {
    // Для кожного слайда, що входить у зону видимості, додаємо клас "visible" з затримкою
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 100); // 100 мс затримки для кожного наступного слайда (налаштовуйте за потребою)
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, options);

  slides.forEach(slide => {
    observer.observe(slide);
  });
}

// Функція ініціалізації слайдера з безкінечною прокруткою
function initializeSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return; // Якщо слайдер не знайдено – вихід

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  // Отримуємо всі слайди
  let slides = slider.querySelectorAll(".slide");
  if (slides.length < 1) return;

  // Клонуємо перший та останній слайди для створення ілюзії безкінечності
  const firstSlide = slides[0];
  const lastSlide = slides[slides.length - 1];
  const firstClone = firstSlide.cloneNode(true);
  const lastClone = lastSlide.cloneNode(true);

  // Додаємо клон останнього слайда на початок та клон першого слайда в кінець
  slider.insertBefore(lastClone, firstSlide);
  slider.appendChild(firstClone);

  // Оновлюємо перелік слайдів після додавання клонів
  slides = slider.querySelectorAll(".slide");

  // Початковий індекс: оскільки на початку знаходиться клон останнього слайда, 
  // реальний перший слайд має індекс 1
  let currentIndex = 1;
  let slideWidth = slides[currentIndex].offsetWidth + 23; // 23px – відступ між слайдами

  // Встановлюємо початкову позицію слайдера
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Функція оновлення позиції слайдера
  function updateSliderPosition(transition = true) {
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Обробник кліку "Вперед"
  nextBtn.addEventListener("click", function () {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updateSliderPosition();
  });

  // Обробник кліку "Назад"
  prevBtn.addEventListener("click", function () {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSliderPosition();
  });

  // Після завершення анімації перевіряємо, чи ми на клонованому слайді,
  // і миттєво перемикаємося на відповідний реальний слайд без анімації
  slider.addEventListener("transitionend", function () {
    // Якщо поточний слайд — клон першого, перемикаємося на реальний перший (індекс 1)
    if (slides[currentIndex].isEqualNode(firstClone)) {
      currentIndex = 1;
      updateSliderPosition(false);
    }
    // Якщо поточний слайд — клон останнього, перемикаємося на реальний останній
    if (slides[currentIndex].isEqualNode(lastClone)) {
      currentIndex = slides.length - 2;
      updateSliderPosition(false);
    }
  });

  // При зміні розміру вікна оновлюємо ширину слайда
  window.addEventListener("resize", function () {
    slideWidth = slides[currentIndex].offsetWidth + 23;
    updateSliderPosition(false);
  });

  // Викликаємо функцію для спостереження за слайдами (fade-in ефект)
  observeSlides();
}

// Ініціалізація слайдера при завантаженні сторінки, якщо елемент вже є в DOM
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".slider-container")) {
    initializeSlider();
  }
});

// І ініціалізація слайдера після HTMX-заміни контенту
document.body.addEventListener("htmx:afterSwap", function (event) {
  if (document.querySelector(".slider-container")) {
    console.log("HTMX заміна: слайдер завантажено, ініціалізуємо його.");
    initializeSlider();
  }
});
