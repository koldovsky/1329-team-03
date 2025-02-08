const response = await fetch("api/mini-vacancies.json");
const miniVacancies = await response.json();
let filters = [];
function renderMiniVacanciesCards() {
  let htmlCards = "";
  for (const vacancy of miniVacancies) {
    htmlCards += `
         <div class="job-opportunities__job-mini-card-inner">
        <div class="job-opportunities__job-mini-card" id="card-${vacancy.id}">

          <div class="job-opportunities__mini-logo">
              <img src="${vacancy.companyLogo}" alt="Company Logo" id="job-opportunities__mini-logo">
          </div>
      
          <div class="job-opportunities__mini-job-info">
              <h2 class="job-opportunities__mini-job-title">${vacancy.title}</h2>
              <p class="job-opportunities__mini-job-location" > ${vacancy.country}, ${vacancy.location}</p>
          </div>
       
          <div class="job-opportunities__mini-job-details">
              <p>📅 <strong>${vacancy.employmentType}</strong></p>
              <p>💰 <strong>${vacancy.salary}</strong></p>
              <p>💼 <strong>${vacancy.experience}</strong></p>
          </div>
        </div>
        </div>
        `;
  }
  const vacanciesContainer = document.querySelector(
    ".job-opportunities__search-result-vacancies"
  );
  vacanciesContainer.innerHTML = htmlCards;
}

function renderJobsNumber() {
  const jobsNumberList = document.getElementById("jobs-found-count");
  jobsNumberList.textContent = miniVacancies.length;
}

// function sortMiniVacancies() {
//     document.querySelectorAll(".job-opportunities__search-label").forEach()
// }

document
  .querySelectorAll(".job-opportunities__search-select")
  .forEach((droplist) => {
    droplist.addEventListener("change", () => {
      filters = Array.from(
        document.querySelectorAll(".job-opportunities__search-select")
      ).map((select) => select.value === "all" ? null : select.value).filter(value => value !== null);;
      console.log(filters);
    });
  });

document
  .querySelector(".job-opportunities__search-submit")
  .addEventListener("click", (event) => {
    event.preventDefault();

    document
      .querySelectorAll(".job-opportunities__job-mini-card-inner")
      .forEach((miniCard) => {
        const cardText = miniCard.outerHTML.toLowerCase();

        // Проверяем, соответствуют ли все выбранные фильтры тексту карточки
        const isMatching =
        filters.every((val) => val === "all") ||
          filters.every((keyword) => cardText.includes(keyword.toLowerCase()))

        miniCard.style.display = isMatching ? "" : "none";
      });
  });

renderMiniVacanciesCards(miniVacancies);
renderJobsNumber();
