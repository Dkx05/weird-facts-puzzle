let currentPuzzle = getNextPuzzle();


const tiles = document.querySelectorAll(".tile");
const factBox = document.getElementById("fact-box");
const factText = document.getElementById("fact-text");

const weirdFacts = [
  "Bananas are berries, but strawberries aren't.",
  "Octopuses have three hearts.",
  "Sloths can hold their breath longer than dolphins.",
  "Wombat poop is cube-shaped.",
  "Sharks existed before trees.",
];

function shuffleTiles() {
  const tileValues = [...currentPuzzle].sort(() => Math.random() - 0.5);
  tileValues.push(null); // empty

  tiles.forEach((tile, i) => {
    tile.textContent = tileValues[i] || "";
    tile.classList.toggle("empty", !tileValues[i]);
  });
}


function getTileIndex(tile) {
  return parseInt(tile.getAttribute("data-index"));
}

function isAdjacent(i1, i2) {
  const row1 = Math.floor(i1 / 3), col1 = i1 % 3;
  const row2 = Math.floor(i2 / 3), col2 = i2 % 3;
  return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    const emptyTile = document.querySelector(".tile.empty");
    const i1 = getTileIndex(tile);
    const i2 = getTileIndex(emptyTile);

    if (tile.classList.contains("empty")) return;
    if (isAdjacent(i1, i2)) {
      // Swap text
      emptyTile.textContent = tile.textContent;
      tile.textContent = "";
      tile.classList.add("empty");
      emptyTile.classList.remove("empty");

      checkSolved();
    }
  });
});

const winText = document.getElementById("win-text");

function checkSolved() {
  const order = Array.from(tiles).map(tile => tile.textContent);
  const correct = [...Array(8).keys()].map(i => (i + 1).toString());
  correct.push("");

  if (order.join() === correct.join()) {
    setTimeout(() => {
      factBox.classList.remove("hidden");
      winText.textContent = "🎉 You did it! Here's a weird fact:";
      factText.textContent = weirdFacts[Math.floor(Math.random() * weirdFacts.length)];
    }, 800);
  }
}


shuffleTiles();

document.getElementById("auto-solve").addEventListener("click", () => {
  const values = [...Array(8).keys()].map(i => i + 1);
  values.push(null);
  tiles.forEach((tile, i) => {
    if (tile.classList.contains("empty")) tile.classList.remove("empty");

    const value = values[i];
    tile.textContent = value || "";
    if (!value) tile.classList.add("empty");
  });
  checkSolved();
});

document.getElementById("show-answer").addEventListener("click", () => {
  alert("Correct order:\n\n1 2 3\n4 5 6\n7 8 [empty]");
});

document.getElementById("skip-puzzle").addEventListener("click", () => {
  currentPuzzle = getNextPuzzle();
  shuffleTiles();
  factBox.classList.remove("hidden");
  winText.textContent = "⏭️ Skipped! Here's your weird fact anyway:";
  factText.textContent = weirdFacts[Math.floor(Math.random() * weirdFacts.length)];
});

document.getElementById("next-puzzle").addEventListener("click", () => {
  currentPuzzle = getNextPuzzle();
  shuffleTiles();
  factBox.classList.add("hidden");
  winText.textContent = "";
  factText.textContent = "";
});

