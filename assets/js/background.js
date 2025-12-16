(() => {
  const backgrounds = [
    "assets/img/background/bg1.jpg",
    "assets/img/background/bg2.jpg",
    "assets/img/background/bg3.jpg",
    "assets/img/background/bg4.jpg",
    "assets/img/background/bg5.jpg",
    "assets/img/background/bg6.jpeg",
  ];

  // Create bg layer if missing
  let bg = document.getElementById("bg-rotator");
  if (!bg) {
    bg = document.createElement("div");
    bg.id = "bg-rotator";
    document.body.prepend(bg);
  }

  // Preload images (reduces flicker)
  backgrounds.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let i = 0;

  function setBg(nextSrc) {
    // Fade out
    bg.style.opacity = "0";
    window.setTimeout(() => {
      bg.style.backgroundImage = `url("${nextSrc}")`;
      bg.style.opacity = "1";
    }, 450);
  }

  // First paint
  setBg(backgrounds[i]);
  i = (i + 1) % backgrounds.length;

  // Rotate every 60s
  window.setInterval(() => {
    setBg(backgrounds[i]);
    i = (i + 1) % backgrounds.length;
  }, 30000);
})();
