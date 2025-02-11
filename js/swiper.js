document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper', {
    loop: true,              // Зациклення слайдів
    slidesPerView: 3,         // Кількість слайдів, що видно одночасно
    spaceBetween: 20,         // Відстань між слайдами
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Якщо потрібна автопрокрутка, розкоментуйте нижче:
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
  });
});
