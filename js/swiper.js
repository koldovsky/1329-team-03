document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let slideWidth = document.querySelector(".slide").offsetWidth + 15;

  nextBtn.addEventListener("click", function () {
    slider.style.transform = `translateX(-${slideWidth}px)`;
    slider.appendChild(slider.firstElementChild);
    setTimeout(() => slider.style.transform = "translateX(0)", 500);
  });

  prevBtn.addEventListener("click", function () {
    slider.prepend(slider.lastElementChild);
    slider.style.transform = `translateX(-${slideWidth}px)`;
    setTimeout(() => slider.style.transform = "translateX(0)", 0);
  });
});