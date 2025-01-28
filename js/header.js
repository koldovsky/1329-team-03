const burgerIcon = document.querySelector("#js-burger");
const mobileMenuBox = document.querySelector("#js-mobile-menu-box");
const mobileMenuLinks = mobileMenuBox.querySelectorAll("a");

function toggleMenuElements() {
  document.body.classList.toggle("overflow-hidden");
  burgerIcon.classList.toggle("header__burger--open");
  mobileMenuBox.classList.toggle("header__mobile-menu-box--open");
}

burgerIcon.addEventListener("click", () => {
  toggleMenuElements();
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenuElements();
  });
});
