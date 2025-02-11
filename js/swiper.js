document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper', {
      loop: true, // Безкінечна прокрутка
      slidesPerView: 3, // Скільки слайдів видно одночасно
      spaceBetween: 20, // Відстань між слайдами
      speed: 600, // Швидкість прокрутки (в мс)
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      autoplay: {
          delay: 0, // Без зупинки
          disableOnInteraction: false,
          reverseDirection: false, // Відключаємо зміну напрямку
      },
      loopAdditionalSlides: 3, // Для плавності зациклення
  });

  // Додаємо події для кнопок, щоб контролювати напрямок руху
  document.querySelector('.swiper-button-next').addEventListener('click', function () {
      swiper.autoplay.stop(); // Зупиняємо поточну прокрутку
      swiper.slideNext(); // Рухаємось вперед
      swiper.autoplay.start(); // Запускаємо знову
  });

  document.querySelector('.swiper-button-prev').addEventListener('click', function () {
      swiper.autoplay.stop(); // Зупиняємо поточну прокрутку
      swiper.slidePrev(); // Рухаємось назад
      swiper.autoplay.start(); // Запускаємо знову
  });
});
