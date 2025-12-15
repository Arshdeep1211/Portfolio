document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("bg-rotator");
  if (!el) return;

  const images = [
    "img/bg1.jpg",
    "img/bg2.jpg",
    "img/bg3.jpg",
    "img/bg4.jpg",
    "img/bg5.jpg",
    "img/bg6.jpeg"
  ];

  let i = 0;

  const setBg = (src) => {
    el.style.opacity = "0";
    setTimeout(() => {
      el.style.backgroundImage = `url('${src}')`;
      el.style.opacity = "1";
    }, 250);
  };

  setBg(images[0]);

  setInterval(() => {
    i = (i + 1) % images.length;
    setBg(images[i]);
  }, 60000);
});
