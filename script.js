//  Variable Definations

let index = 0; // Current slide
let autoplayInterval;
let img = document.getElementById('myImg')
let img2 = img.childNodes[(2*index)+1];
let img3 = img2.childNodes[1];
let modal = document.getElementById('myModal');
let modalImg = document.getElementById("img01");
let span = document.getElementsByClassName("close")[0];
let certDesc = document.getElementsByClassName("certificate_desc");
console.log(certDesc[0].textContent);

// Function Definations

let initSlide = function() {
  showSlide(index);
  autoplayInterval = setInterval(nextSlide, 3000);  
}

let modalFunc = function() {
  modal.style.display = "block";
  modalImg.src = this.src;
  document.body.style.overflow = 'hidden';
}

let showSlide = function(n) {
  let slides = document.querySelectorAll(".certificate_img");
  let dots = document.querySelectorAll('.dot');
  if (n >= slides.length) {
    index = 0;
  }
  
  if (n < 0) {
    index = slides.length - 1;
  }
  
  for (let i=0; i<slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  for (let i=0; i<dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[index].childNodes[1].onclick = modalFunc;
  slides[index].style.display = "block";
  certDesc[0].innerHTML = slides[index].childNodes[1].alt;
  dots[index].classList.add("active");
}

let nextSlide = function() {
  index++;
  showSlide(index);  
}

let currentSlide = function(n) {
  index = n;
  showSlide(index);
  resetAutoplay();  // Reset autoplay timer when manually navigating
}

let resetAutoplay = function() {
  clearInterval(autoplayInterval);  // Clear the previous interval
  autoplayInterval = setInterval(nextSlide, 3000);  // Start a new interval
}

let closeFunc = function() { 
  modal.style.display = "none";
  document.body.style.overflow = 'auto';
}

let navbarfunc = function(){
  let x = document.querySelector(".navbar");
  if (x.style.display === "flex") {
    x.style.display = "none";
  }
  else {
    x.style.display = "flex";
  }
}

// let handleResize = function() {
//   let screen = window.matchMedia("(min-width: 900px)");
//   let x = document.querySelector(".navbar");
//   if (screen.matches) {
//     x.style.display = "flex";
//   }
// }

// DOM 

document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
      currentSlide(i);
  });
});

window.onload = initSlide;
document.querySelector('.certificate_box').addEventListener('mouseover', () => {
  clearInterval(autoplayInterval);  // Stop autoplay when hovering
});

document.querySelector('.certificate_box').addEventListener('mouseout', () => {
  resetAutoplay();  // Resume autoplay when mouse leaves
});

document.querySelector(".icon").addEventListener('click',()=> {
  navbarfunc();
})
// Event Listeners

span.onclick = closeFunc;
modal.onclick = closeFunc;

// window.addEventListener('resize', handleResize);