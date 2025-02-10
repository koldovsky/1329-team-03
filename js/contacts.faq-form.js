const form = document.querySelector(".faq__form");

const result = document.createElement("div");
result.id = "contact-form-result";
document.body.appendChild(result);

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.style.display = "block";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const responseData = await response.json();

    if (response.status === 200) {
      result.innerHTML = "Form submitted successfully!";
      result.classList.remove("error");
      result.classList.add("success");
    } else {
      result.innerHTML = "Error submitting the form";
      result.classList.remove("success");
      result.classList.add("error");
    }
  } catch (error) {
    result.innerHTML = "An error occurred. Please try again.";
    result.classList.add("error");
  }

  form.reset();
  setTimeout(() => (result.style.display = "none"), 3000);
});