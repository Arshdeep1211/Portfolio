// assets/js/background.js

const backgrounds = [
  "assets/img/background/bg1.jpg",
  "assets/img/background/bg2.jpg",
  "assets/img/background/bg3.jpg",
  "assets/img/background/bg4.jpg",
  "assets/img/background/bg5.jpg",
  "assets/img/background/bg6.jpeg"
];

let current = 0;

function preloadImages(urls) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

function setBg(el, url) {
  el.style.backgroundImage = `url("${url}")`;
}

function startBackgroundSlideshow() {
  const bg = document.getElementById("bg-rotator");
  if (!bg) return;

  preloadImages(backgrounds);

  // initial background
  setBg(bg, backgrounds[current]);
  current = (current + 1) % backgrounds.length;

  setInterval(() => {
    // fade out
    bg.style.opacity = "0";

    // swap image while hidden, then fade in
    setTimeout(() => {
      setBg(bg, backgrounds[current]);
      current = (current + 1) % backgrounds.length;
      bg.style.opacity = "1";
    }, 450);
  }, 60000);
}

document.addEventListener("DOMContentLoaded", startBackgroundSlideshow);
