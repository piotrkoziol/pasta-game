let knead = 0;
let cook = 0;
let cooking = false;
let interval;

const kneadBar = document.getElementById("kneadBar");
const cookBar = document.getElementById("cookBar");
const pastaVisual = document.getElementById("pastaVisual");
const result = document.getElementById("result");
const comment = document.getElementById("comment");
const highscoreDisplay = document.getElementById("highscore");

let highscore = localStorage.getItem("pastaHighscore") || 0;
highscoreDisplay.textContent = highscore;

document.getElementById("kneadBtn").addEventListener("click", () => {
  if (knead < 100) {
    knead += 5;
    kneadBar.style.width = knead + "%";

    if (knead > 80) {
      kneadBar.style.background = "gold";
    }
  }
});

document.getElementById("cookBtn").addEventListener("click", () => {
  if (!cooking) {
    cooking = true;
    interval = setInterval(() => {
      cook++;
      cookBar.style.width = cook * 10 + "%";

      // zmiana koloru makaronu
      let r = 255 - cook * 10;
      let g = 230 - cook * 5;
      pastaVisual.style.background = `rgb(${r},${g},80)`;

      if (cook > 15) clearInterval(interval);
    }, 1000);
  } else {
    cooking = false;
    clearInterval(interval);
  }
});

document.getElementById("finishBtn").addEventListener("click", () => {
  clearInterval(interval);

  const flour = document.getElementById("flour").value;
  const eggs = document.getElementById("eggs").value;
  const thickness = document.getElementById("thickness").value;

  let score = 100;

  score -= Math.abs(flour - 50);
  score -= Math.abs(eggs - 50);

  if (knead < 80) score -= (80 - knead);

  score -= Math.abs(thickness - 5) * 5;

  score -= Math.abs(cook - 8) * 5;

  if (score < 0) score = 0;

  result.textContent = `Ocena: ${score}/100`;

  // komentarze Nonny
  if (score > 90) {
    comment.textContent = "👵 Perfetto! Nonna jest dumna!";
  } else if (score > 70) {
    comment.textContent = "🙂 Va bene... ale mogło być lepiej.";
  } else if (score > 40) {
    comment.textContent = "😐 Meh... to nie jest al dente.";
  } else {
    comment.textContent = "😡 Mamma mia! To katastrofa!";
  }

  // highscore
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("pastaHighscore", highscore);
    highscoreDisplay.textContent = highscore;
  }

  // reset
  knead = 0;
  cook = 0;
  cooking = false;
  kneadBar.style.width = "0%";
  cookBar.style.width = "0%";
  pastaVisual.style.background = "rgb(255,230,120)";
});
