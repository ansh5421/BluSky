const container = document.getElementById("puzzle-container");
const shuffleButton = document.getElementById("shuffle-button");

let tiles = [...Array(15).keys()].map((n) => n + 1);
tiles.push(""); // The empty tile

// Initialize the game
function initializeGame() {
  container.innerHTML = "";
  tiles.forEach((tile) => {
    const div = document.createElement("div");
    div.classList.add("tile");
    if (tile === "") {
      div.classList.add("empty");
    } else {
      div.textContent = tile;
    }
    container.appendChild(div);
  });
  addTileClickListeners();
}

// Shuffle the tiles
function shuffleTiles() {
  tiles.sort(() => Math.random() - 0.5);
  initializeGame();
}

// Handle tile click
function addTileClickListeners() {
  const tileDivs = document.querySelectorAll(".tile");
  tileDivs.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      moveTile(index);
    });
  });
}

// Move the tile if possible
function moveTile(index) {
  const emptyIndex = tiles.indexOf("");
  const validMoves = [
    emptyIndex - 1,
    emptyIndex + 1,
    emptyIndex - 4,
    emptyIndex + 4,
  ];

  if (validMoves.includes(index)) {
    [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
    initializeGame();
    checkWinCondition();
  }
}

// Check if the player has won
function checkWinCondition() {
  const winningOrder = [...Array(15).keys()].map((n) => n + 1).concat("");
  if (JSON.stringify(tiles) === JSON.stringify(winningOrder)) {
    setTimeout(() => alert("Congratulations! You solved the puzzle!"), 100);
  }
}

shuffleButton.addEventListener("click", shuffleTiles);

// Start the game
initializeGame();
