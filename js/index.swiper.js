document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper', {
      loop: true,            // Зациклене прокручування
      slidesPerView: 6,      // Скільки слайдів видно одночасно (на великому екрані)
      spaceBetween: 20,      // Відстань між слайдами (px)
  
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  
      // Адаптивна кількість слайдів:
      breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
        1400: { slidesPerView: 6 },
      },
  
      // Якщо потрібна автопрокрутка:
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
    });
  });
  