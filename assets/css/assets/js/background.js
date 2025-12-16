(() => {
  const backgrounds = [
    "assets/img/background/bg1.jpg",
    "assets/img/background/bg2.jpg",
    "assets/img/background/bg3.jpg",
    "assets/img/background/bg4.jpg",
    "assets/img/background/bg5.jpg",
    "assets/img/background/bg6.jpeg"
  ];

  const INTERVAL_MS = 60000; // 60s
  const FADE_MS = 900;

  function preload(url) {
    const img = new Image();
    img.src = url;
  }

  function start() {
    const el = document.getElementById("bg-rotator");
    if (!el) return;

    // preload everything (helps avoid "no change")
    backgrounds.forEach(preload);

    let i = 0;
    el.style.backgroundImage = `url("${backgrounds[i]}")`;

    setInterval(() => {
      i = (i + 1) % backgrounds.length;

      // fade out
      el.style.opacity = "0";

      setTimeout(() => {
        // swap image
        el.style.backgroundImage = `url("${backgrounds[i]}")`;
        // fade in
        el.style.opacity = "1";
      }, FADE_MS);
    }, INTERVAL_MS);
  }

  document.addEventListener("DOMContentLoaded", start);
})();
