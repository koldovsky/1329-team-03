const comments = [
  {
    id: 1,
    author: "Emily Rosewood",
    text: "“I love shopping at NextLevel. Their customer support helped me choose the perfect monitor, and the entire process was hassle-free from start to finish. Delivery was quick, the packaging was secure, and the prices are super competitive. I’ve never had such a smooth online shopping experience!”",
    date: "September 24, 2024",
  },
  {
    id: 2,
    author: "David Linderman",
    text: "“Great service and top-quality products. I found everything I needed, and the checkout was smooth and secure. The detailed product descriptions made choosing the right gadgets a breeze, and the fast shipping was a huge bonus. It’s clear that customer satisfaction is a priority at NextLevel.”",
    date: "August 02, 2024",
  },
  {
    id: 3,
    author: "Sarah Peterson",
    text: "“NextLevel is my go-to for tech! The selection is amazing, and my order arrived super fast. The product quality exceeded my expectations, and I was impressed by how easy it was to navigate the site. I’ve recommended it to friends, and I’ll definitely be shopping here again.”",
    date: "June 15, 2024",
  },
];

let currentIndex = 0;

function renderComment(index) {
  const comment = comments[index];
  const commentsContainer = document.querySelector('.testimonials__content');
  
  commentsContainer.innerHTML = `
    <article class="testimonials__article">
      <div class="testimonials__icon-container">
        <svg class="testimonials__icon" width="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M85.217,16.341H63.696c-5.403,0-9.783,4.38-9.783,9.784v21.52c0,5.404,4.38,9.784,9.783,9.784h17.608v1.311  
          c0,6.189-5.047,11.226-11.25,11.226c-3.783,0-6.849,3.065-6.849,6.848s3.065,6.848,6.849,6.848C83.81,83.659,95,72.479,95,58.738  
          V26.125C95,20.721,90.62,16.341,85.217,16.341z" fill="currentColor"></path>
          <path d="M36.303,16.341h-21.52C9.38,16.341,5,20.721,5,26.125v21.52c0,5.404,4.38,9.784,9.784,9.784h17.607v1.311  
          c0,6.189-5.047,11.226-11.25,11.226c-3.782,0-6.848,3.065-6.848,6.848s3.066,6.848,6.848,6.848c13.755,0,24.946-11.18,24.946-24.921  
          V26.125C46.087,20.721,41.707,16.341,36.303,16.341z" fill="currentColor"></path>
        </svg>
      </div>
      <h3 class="testimonials__author">${comment.author}</h3>
      <p class="testimonials__text">${comment.text}</p>
      <p class="testimonials__date">${comment.date}</p>
    </article>`;
}

function nextComment() {
  currentIndex = (currentIndex + 1) % comments.length;
  renderComment(currentIndex);
}

function prevComment() {
  currentIndex = (currentIndex - 1 + comments.length) % comments.length;
  renderComment(currentIndex);
}

document.querySelector('.testimonials__next').addEventListener('click', nextComment);
document.querySelector('.testimonials__prev').addEventListener('click', prevComment);

renderComment(currentIndex);