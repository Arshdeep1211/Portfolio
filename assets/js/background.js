const images = [
  "img/bg1.jpg",
  "img/bg2.jpg",
  "img/bg3.jpg",
  "img/bg4.jpg",
  "img/bg5.jpg",
  "img/bg6.jpeg"
];

let index = 0;
const hero = document.querySelector(".hero");

if (hero) {
  hero.style.backgroundImage = `url('${images[0]}')`;
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";

  setInterval(() => {
    index = (index + 1) % images.length;
    hero.style.backgroundImage = `url('${images[index]}')`;
  }, 60000);
}
