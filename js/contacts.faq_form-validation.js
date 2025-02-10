const nameInput = document.querySelector('input[name="name"]');
const phoneInput = document.querySelector('input[name="phone-number"]');

nameInput.addEventListener("input", function (event) {
  const nameValue = nameInput.value;
  const lettersOnly = /^[A-Za-z\s]+$/;

  if (!lettersOnly.test(nameValue)) {
    nameInput.setCustomValidity("Name should contain only letters!");
  } else {
    nameInput.setCustomValidity("");
  }
});

phoneInput.addEventListener("input", function (event) {
  const phoneValue = phoneInput.value;
  const numbersOnly = /^\d+$/;
  if (!numbersOnly.test(phoneValue) || phoneValue.length !== 10) {
    phoneInput.setCustomValidity(
      "Phone number should contain exactly 10 digits!"
    );
  } else {
    phoneInput.setCustomValidity("");
  }
});
