/*-------------------------------- Constants --------------------------------*/
const PLAYER_X = 'X'; // player X
const PLAYER_O = 'O'; // player O
const winningCombos = [ // eight possible winning combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/
let board; // represents the state of the squares on the board
let turn; // tracks whose turn it is
let winner; // represents if anyone has won yet
let tie; // represents if the game has ended in a tie

/*------------------------ Cached Element References ------------------------*/
const squareEls = Array.from(document.querySelectorAll('.sqr')); // the nine elements representing the squares on the page
const messageEl = document.querySelector('#message'); // the element that displays the game’s status on the page
const resetBtnEl = document.querySelector('#reset'); // the reset button

/*-------------------------------- Functions --------------------------------*/
function init() {
  console.log("init function called"); // confirmation check
  board = ['', '', '', '', '', '', '', '', '']; // array containing nine empty strings representing empty squares
  turn = PLAYER_X; // represents player X
  winner = false; // no winner yet
  tie = false; // no tie yet
  render(); // call render function
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((mark, index) => {
    squareEls[index].textContent = mark;
  });
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `Turn: ${turn}`;
  } else if (!winner && tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `Congratulations! Player ${turn === PLAYER_X ? PLAYER_O : PLAYER_X} has won!`;
  }
}

function handleClick(event) {
  const squareIndex = parseInt(event.target.id);
  if (board[squareIndex] || winner || tie) return; // square already taken or game over
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  for (let combo of winningCombos) {
    if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
      winner = true;
      return;
    }
  }
}

function checkForTie() {
  if (winner) return;
  if (!board.includes('')) tie = true; // all squares played, it's a tie
}

function switchPlayerTurn() {
  if (winner) return;
  turn = turn === PLAYER_X ? PLAYER_O : PLAYER_X; // switch turns
}

/*----------------------------- Event Listeners -----------------------------*/
window.onload = init; // call the init function when the app loads
document.querySelector('.board').addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init); // reset the game when the reset button is clicked
