let knead = 0;
let cook = 0;
let cooking = false;
let interval;

const kneadProgress = document.getElementById("kneadProgress");
const cookTime = document.getElementById("cookTime");
const result = document.getElementById("result");

document.getElementById("kneadBtn").addEventListener("click", () => {
  if (knead < 100) {
    knead += 5;
    kneadProgress.textContent = knead;
  }
});

document.getElementById("cookBtn").addEventListener("click", () => {
  if (!cooking) {
    cooking = true;
    interval = setInterval(() => {
      cook++;
      cookTime.textContent = cook;
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

  // Ideal: 50/50 proporcji
  score -= Math.abs(flour - 50);
  score -= Math.abs(eggs - 50);

  // Idealne wyrabianie: 80-100%
  if (knead < 80) score -= (80 - knead);

  // Idealna grubość: 5
  score -= Math.abs(thickness - 5) * 5;

  // Idealny czas gotowania: 8 sekund
  score -= Math.abs(cook - 8) * 5;

  if (score < 0) score = 0;

  result.textContent = `Ocena: ${score}/100`;

  // reset
  knead = 0;
  cook = 0;
  cooking = false;
  kneadProgress.textContent = 0;
  cookTime.textContent = 0;
});
