let swiper;

function initSwiper() {
  if (swiper) swiper.destroy(true, true); 

  swiper = new Swiper('.partners-carousel__container', {
    slidesPerView: getSlidesPerView(),
    direction: getDirection(),
    navigation: {
      nextEl: '.partners-carousel-button-next',
      prevEl: '.partners-carousel-button-prev',
    },
    loop: true,
    breakpoints: {
      1470: { slidesPerView: 7 },
      1150: { slidesPerView: 5 },
      900: { slidesPerView: 4 },
      700: { slidesPerView: 3 },
      500: { slidesPerView: 2 },
      0: { slidesPerView: 1 }
    },
  });
}

function getDirection() {
  return window.innerWidth <= 760 ? 'vertical' : 'horizontal';
}

function getSlidesPerView() {
  let width = window.innerWidth;
  if (width >= 1470) return 7;
  if (width >= 1150) return 5;
  if (width >= 900) return 4;
  if (width >= 700) return 3;
  if (width >= 500) return 2;
  return 1;
}

document.addEventListener("DOMContentLoaded", () => {
  initSwiper();
});

window.addEventListener('resize', () => {
  initSwiper(); 
});
