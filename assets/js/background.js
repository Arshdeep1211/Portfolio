const backgrounds = [
  "assets/img/background/bg1.jpg",
  "assets/img/background/bg2.jpg",
  "assets/img/background/bg3.jpg",
  "assets/img/background/bg4.jpg",
  "assets/img/background/bg5.jpg",
  "assets/img/background/bg6.jpg"
];

let current = 0;

function changeBackground() {
  document.body.style.backgroundImage =
    `linear-gradient(rgba(5,10,20,0.75), rgba(5,10,20,0.85)),
     url('${backgrounds[current]}')`;

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";

  current = (current + 1) % backgrounds.length;
}

changeBackground();
setInterval(changeBackground, 60000); // every 60 sec
