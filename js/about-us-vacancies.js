const response = await fetch("api/vacancies.json");
const vacancies = await response.json();

function renderVacanciesCards() {
  let htmlCards = "";
  for (const vacancy of vacancies) {
    htmlCards += `
  <div class="job-opportunities__card" id="mini-card-${vacancy.id}">
  <div class="job-opportunities__card-inner">
    <div class="job-opportunities__card-front">
      <div class="job-opportunities__card-header">
        <div class="job-opportunities__title-container">
          <h3 class="job-opportunities__card-title">${vacancy.jobTitle}</h3>
        </div>
        <div class="job-opportunities__meta-container">
          <p class="job-opportunities__meta">
            ${vacancy.employmentType} | ${vacancy.experienceRequired}
          </p>
        </div>
        <div class="job-opportunities__logo-block">
          <img
            id="job-opportunities__logo"
            src="${vacancy.companyLogo}"
            alt="${vacancy.logoDescription}"
            ,
            width="70"
          />
          <div class="job-opportunities__sallary">
            <strong class="job-opportunities__sallary-amount"
              >${vacancy.salary}</strong
            >
            / ${vacancy.salaryPeriod}
            <p class="job-opportunities__office-location">
              ${vacancy.officeLocation}
            </p>
          </div>
        </div>
      </div>
      <div class="job-opportunities__card-middle-section">
        <div class="job-opportunities__description">
          <p>${vacancy.vacancieDescription}</p>
        </div>
        <ul class="job-opportunities__responsibilities">
          <li class="job-opportunities__responsibility">
            ${vacancy.responsibilities[0]};
          </li>
          <li class="job-opportunities__responsibility">
            ${vacancy.responsibilities[1]};
          </li>
          <li class="job-opportunities__responsibility">
            ${vacancy.responsibilities[2]};
          </li>
          <li class="job-opportunities__responsibility">
            ${vacancy.responsibilities[3]};
          </li>
        </ul>
      </div>
      <div class="job-opportunities__benefits-lists">
        <ul class="job-opportunities__benefits-list">
          <li class="job-opportunities__benefit">
            <img
              src="${vacancy.benefitIcon}"
              alt="checked box"
              height="20"
              width="24"
            />
            <p>${vacancy.benefits[0]};</p>
          </li>
          <li class="job-opportunities__benefit">
            <img
              src="${vacancy.benefitIcon}"
              alt="checked box"
              height="20"
              width="24"
            />
            <p>${vacancy.benefits[1]};</p>
          </li>
          <li class="job-opportunities__benefit">
            <img
              src="${vacancy.benefitIcon}"
              alt="checked box"
              height="20"
              width="24"
            />
            <p>${vacancy.benefits[2]};</p>
          </li>
          <li class="job-opportunities__benefit">
            <img
              src="${vacancy.benefitIcon}"
              alt="checked box"
              height="20"
              width="24"
            />
            <p>${vacancy.benefits[3]};</p>
          </li>
          <li class="job-opportunities__benefit">
            <img
              src="${vacancy.benefitIcon}"
              alt="checked box"
              height="20"
              width="24"
            />
            <p>${vacancy.benefits[4]}.</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Flip side -->

          <form id ="form-${vacancy.id}" method="get" class="job-opportunities__card-rear">
          

        <div class="job-opportunities__CV-greeting">
        <h4>Ready for this position?</h4>
        </div>
        
        
        <div class="job-opportunities__CV-upload">
        <div class="job-opportunities__CV-upload-massage"><p>Please upload your CV here:</p></div>
        <input type="file" class="job-opportunities__CV-upload-input" name="CV" id = "CV-${vacancy.id}" accept=".doc, .docx, .pdf, image/png, image/jpeg" multiple required/>
        <label for="CV-${vacancy.id}" class="job-opportunities__CV-upload-input-label">Upload CV</label>
        
        
        <div class="job-opportunities__CV-chosen-file">
        <p>Chosen file: </p>
        <p class = "file-name">None</p>
        </div>
        </div>
        <div class="job-opportunities__submit"> 
        <div class="job-opportunities__cover-letter">
          <label for="cover-letter-${vacancy.id}" class="job-opportunities__cover-letter-label">
            Add your cover letter:
          </label>
          <textarea id="cover-letter-${vacancy.id}" name ="cover-letter" class="job-opportunities__cover-letter-input" rows="4" placeholder="Write your cover letter here..."></textarea>
        </div>
        
          <input type="submit" class="job-opportunities__submit-button" value="Send!" />
        </div>
        </form>
    </div>
  </div>
</div>
        `;
  }
  const vacanciesContainer = document.querySelector(
    ".job-opportunities__vacancies"
  );
  vacanciesContainer.innerHTML = htmlCards;
}

function addFlipEventListner() {
  const cards = document.querySelectorAll(".job-opportunities__card");
  const fileInputs = document.querySelectorAll(`input[type="file"], 
    input[type="button"], input[type="submit"], 
    .job-opportunities__CV-upload-input-label,
     .job-opportunities__cover-letter-input     `);
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

  fileInputs.forEach((input) => {
    input.addEventListener("click", (event) => {
      event.stopPropagation();
      window.scrollTo(window.scrollX, window.scrollY);
    });
  });
}

function renderChosenFileName() {
  const inputCvFile = document.querySelectorAll(
    ".job-opportunities__CV-upload-input"
  );

  inputCvFile.forEach((input) => {
    input.addEventListener("change", (event) => {
      const uploadedCvName = input
        .closest(".job-opportunities__CV-upload")
        .querySelector(".file-name");
      uploadedCvName.textContent =
        event.target.files.length > 0 ? event.target.files[0].name : "None";
    });
  });
}

renderVacanciesCards(vacancies);
addFlipEventListner();
renderChosenFileName();
