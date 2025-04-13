const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg"
];

let currentIndex = 0;
const mainImage = document.getElementById("current");
const thumbs = document.getElementById("thumbs").children;
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let slideshowInterval;

function updateGallery() {
  mainImage.style.opacity = 0;
  setTimeout(() => {
    mainImage.src = images[currentIndex];
    mainImage.style.opacity = 1;
    updateActiveThumbnail();
  }, 200);
}

function changeImage(index) {
  currentIndex = index;
  updateGallery();
}

function nextImage(isLightbox = false) {
  currentIndex = (currentIndex + 1) % images.length;
  if (isLightbox) {
    updateLightbox();
  } else {
    updateGallery();
  }
}

function prevImage(isLightbox = false) {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  if (isLightbox) {
    updateLightbox();
  } else {
    updateGallery();
  }
}

function updateActiveThumbnail() {
  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].classList.remove('active');
  }
  thumbs[currentIndex].classList.add('active');
}

function openLightbox() {
  lightbox.style.display = "block";
  updateLightbox();
  document.body.style.overflow = 'hidden'; 
  startSlideshow();
}

function closeLightbox(e) {
  if (e && e.target !== e.currentTarget && e.target.className !== 'close') return;
  lightbox.style.display = "none";
  document.body.style.overflow = '';
  stopSlideshow();
}

function updateLightbox() {
  lightboxImg.src = images[currentIndex];
}

function startSlideshow() {
  slideshowInterval = setInterval(() => {
    nextImage(true);
  }, 5000);
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
}

window.onload = updateGallery;
window.onkeydown = function(e) {
  if (e.key === "Escape") closeLightbox();
};
