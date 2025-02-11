document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper', {
      loop: true, // Зациклення
      slidesPerView: 3, // Скільки слайдів видно одночасно
      spaceBetween: 20, // Відстань між слайдами
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      autoplay: {
          delay: 3000, // Автоматична прокрутка (3 секунди)
          disableOnInteraction: false,
      },
  });
});
