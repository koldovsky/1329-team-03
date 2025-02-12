function initializeSlider() {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (!slider || !prevBtn || !nextBtn) return;

  const slides = Array.from(slider.children);

  if (slides.length < 2) return;

  // Додаємо клони
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slides[0]);

  let currentIndex = 1;
  const slideWidth = slides[0].offsetWidth + 23; // 23 - gap між слайдами

  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  function updateSliderPosition(transition = true) {
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function moveNext() {
    if (currentIndex >= slides.length) return;

    currentIndex++;
    updateSliderPosition();

    slider.addEventListener("transitionend", () => {
      if (currentIndex === slides.length - 1) {
        currentIndex = 1;
        updateSliderPosition(false);
      }
    });
  }

  function movePrev() {
    if (currentIndex <= 0) return;

    currentIndex--;
    updateSliderPosition();

    slider.addEventListener("transitionend", () => {
      if (currentIndex === 0) {
        currentIndex = slides.length - 2;
        updateSliderPosition(false);
      }
    });
  }

  nextBtn.addEventListener("click", moveNext);
  prevBtn.addEventListener("click", movePrev);
}
