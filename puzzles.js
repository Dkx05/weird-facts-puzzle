// puzzles.js
const puzzles = [
  [...Array(8).keys()].map(i => (i + 1).toString()), // 1–8 puzzle
  ["A", "B", "C", "D", "E", "F", "G", "H"],           // Letters
  ["🐱", "🐶", "🐭", "🦊", "🐻", "🐼", "🐨", "🦁"],     // Emojis
  ["🍎", "🍌", "🍇", "🍒", "🍍", "🥝", "🍑", "🍉"],
  ["🔺", "🔷", "⚫", "⬛", "🔶", "⭐", "⚪", "🟥"]
];

let currentPuzzleIndex = 0;
let puzzleCounter = 0;

function getNextPuzzle() {
  puzzleCounter++;
  if (puzzleCounter % 5 === 0) {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
  }
  return puzzles[currentPuzzleIndex];
}
