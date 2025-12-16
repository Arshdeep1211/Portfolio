document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("bg-rotator");
  if (!bg) return;

  const images = [
    "img/bg1.jpg",
    "img/bg2.jpg",
    "img/bg3.jpg",
    "img/bg4.jpg",
    "img/bg5.jpg",
    "img/bg6.jpeg"
  ];

  let index = 0;

  function changeBg() {
    bg.style.opacity = "0";
    setTimeout(() => {
      bg.style.backgroundImage = `url('${images[index]}')`;
      bg.style.opacity = "1";
      index = (index + 1) % images.length;
    }, 300);
  }

  changeBg();
  setInterval(changeBg, 60000); // 60 seconds
});
