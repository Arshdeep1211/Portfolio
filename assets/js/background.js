const backgrounds = [
  "assets/img/background/bg1.jpg",
  "assets/img/background/bg2.jpg",
  "assets/img/background/bg3.jpg",
  "assets/img/background/bg4.jpg",
  "assets/img/background/bg5.jpg",
  "assets/img/background/bg6.jpeg"
];

let current = 0;
const bg = document.getElementById("bg-rotator");

function changeBackground() {
  if (!bg) return;

  bg.style.opacity = "0";
  setTimeout(() => {
    bg.style.backgroundImage = `url('${backgrounds[current]}')`;
    bg.style.opacity = "1";
    current = (current + 1) % backgrounds.length;
  }, 450);
}

changeBackground();
setInterval(changeBackground, 60000);
