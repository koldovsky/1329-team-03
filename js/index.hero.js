document.querySelector('.hero__button').addEventListener('click', function (event) {
    event.preventDefault(); // Запобігти стандартній поведінці посилання
    const target = document.querySelector('#product-gallery');
    target.scrollIntoView({ behavior: 'smooth' });
  });
  