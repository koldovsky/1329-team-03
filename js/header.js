const burgerIcon = document.querySelector('#js-burger');
const mobileMenuBox = document.querySelector('#js-mobile-menu-box');

burgerIcon.addEventListener('click', () => {
  document.body.classList.toggle('overflow-hidden');
  burgerIcon.classList.toggle('header__burger--open');
  mobileMenuBox.classList.toggle('header__mobile-menu-box--open');
});
