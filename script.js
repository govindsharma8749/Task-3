let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp";

const statusText = document.getElementById("status");
const boardDiv = document.getElementById("board");

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Create Board
function createBoard() {
    boardDiv.innerHTML = "";

    board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.index = index;
        div.innerText = cell;
        div.addEventListener("click", handleClick);
        boardDiv.appendChild(div);
    });
}

// Set Mode
function setMode(selectedMode) {
    mode = selectedMode;
    restartGame();
}

// Handle Click
function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (mode === "cpu" && gameActive && currentPlayer === "O") {
        setTimeout(cpuMove, 500);
    }
}

// Make Move
function makeMove(index, player) {
    board[index] = player;
    createBoard();
    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = "Current Player: " + currentPlayer;
}

// CPU Move (Random)
function cpuMove() {
    let emptyCells = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(v => v !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");
}

// Check Winner
function checkWinner() {
    let roundWon = false;
    let winningCombo = [];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombo = condition;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = "🎉 Player " + currentPlayer + " Wins!";
        gameActive = false;
        highlightWinner(winningCombo);
        return;
    }

    if (!board.includes("")) {
        statusText.innerText = "😐 Draw!";
        gameActive = false;
    }
}

// Highlight Winning Cells
function highlightWinner(combo) {
    const cells = document.querySelectorAll(".cell");

    combo.forEach(index => {
        cells[index].classList.add("win");
    });
}

// Restart Game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "Current Player: X";
    createBoard();
}

// Initialize
restartGame();
