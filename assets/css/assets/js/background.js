const images = [
  "assets/images/bg1.jpg",
  "assets/images/bg2.jpg",
  "assets/images/bg3.jpg",
  "assets/images/bg4.jpg",
  "assets/images/bg5.jpg",
  "assets/images/bg6.jpg",
  "assets/images/bg7.jpg",
  "assets/images/bg8.jpg"
];

let currentIndex = 0;
const bg = document.getElementById("bg-slideshow");

// preload images (important for smooth transitions)
images.forEach(src => {
  const img = new Image();
  img.src = src;
});

// set initial background
bg.style.backgroundImage = `url('${images[0]}')`;

setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  bg.style.opacity = 0;

  setTimeout(() => {
    bg.style.backgroundImage = `url('${images[currentIndex]}')`;
    bg.style.opacity = 1;
  }, 600);

}, 60000); // 60 seconds
