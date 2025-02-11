document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    // ОБОВ'ЯЗКОВО: горизонтальний напрямок
    direction: "horizontal",

    // Кількість видимих слайдів (за потреби змініть)
    slidesPerView: 3,

    // Відстань між слайдами
    spaceBetween: 20,

    // Зациклення слайдів
    loop: true,

    // Навігація стрілками
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Якщо потрібна автопрокрутка, можна додати:
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
  });
});
