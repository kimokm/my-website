document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("openBtn");
  const card = document.getElementById("messageCard");
  const lines = card.querySelectorAll(".line");
  const heartsContainer = card.querySelector(".hearts");

  // Button pulse glow
  setInterval(() => {
    btn.classList.toggle("pulse");
  }, 1000);

  btn.addEventListener("click", () => {
    // Show card with bounce
    card.classList.remove("hidden");
    card.classList.add("show", "bounce");

    // Confetti burst
    launchConfetti();

    // Animate lines with typewriter effect
    lines.forEach((line, i) => {
      setTimeout(() => typeText(line), 1000 * (i + 1));
    });

    // Spawn rainbow hearts
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 12) { clearInterval(interval); return; }
      const heart = document.createElement("div");
      heart.className = "heart spin";
      heart.style.left = `${50 + (Math.random() * 100 - 50)}%`;
      heart.style.background = randomColor();
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
      count++;
    }, 400);
  });
});

// Typewriter effect
function typeText(element) {
  const text = element.textContent;
  element.textContent = "";
  element.classList.add("show");
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 60);
}

// Random pastel colors for hearts
function randomColor() {
  const colors = ["#ff4f81", "#ff9a9e", "#fad0c4", "#fbc2eb", "#a6c1ee"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Confetti burst
function launchConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    // Create a confetti piece
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.background = randomColor();
    document.body.appendChild(confetti);

    // Animate fall
    confetti.animate([
      { transform: "translateY(0) rotate(0deg)", opacity: 1 },
      { transform: "translateY(100vh) rotate(720deg)", opacity: 0 }
    ], { duration: 3000, easing: "ease-out" });

    setTimeout(() => confetti.remove(), 3000);

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}