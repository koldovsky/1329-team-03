document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper('.swiper', {
        loop: true,
        spaceBetween: 15,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1470: { slidesPerView: 7, spaceBetween: 10 },
            1150: { slidesPerView: 5, spaceBetween: 10 },
            900: { slidesPerView: 4, spaceBetween: 10 },
            700: { slidesPerView: 3, spaceBetween: 10 },
            500: { slidesPerView: 2, spaceBetween: 10 },
            0: { slidesPerView: 1, spaceBetween: 10 }
        }
    });
});
