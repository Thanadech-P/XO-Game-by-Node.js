const checkWinnerSize3 = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinnerSize5 = [
  [0, 1, 2, 3],
  [0, 5, 10, 15],
  [0, 6, 12, 18],
  [1, 2, 3, 4],
  [1, 6, 11, 16],
  [1, 7, 13 ,19],
  [2, 7, 12 ,17],
  [3, 7, 11, 15],
  [3, 8, 13 ,18],
  [4, 8, 12, 16],
  [4, 9, 14, 19],
  [5, 10, 15, 20],
  [5, 6, 7, 8],
  [5, 11, 17, 23],
  [6, 12, 18, 24],
  [6, 7, 8, 9],
  [6, 11, 16, 21],
  [7, 12, 17 ,22],
  [8, 13, 18, 23],
  [8, 12, 16 ,20],
  [8, 13, 18, 23],
  [9, 14, 19, 24],
  [9, 13, 17, 21],
  [10, 11, 12, 13],
  [11, 12, 13 ,14],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [20, 21, 22, 23],
  [21, 22, 23, 24]
  
];

const checkWinnerSize7 = [
  [0, 1, 2, 3],
  [0, 7, 14, 21],
  [0, 8, 16, 24],
  [1, 2, 3, 4],
  [1, 8, 15, 22],
  [1, 9, 17, 25],
  [2, 3, 4, 5],
  [2, 9, 16, 23],
  [2, 10, 18, 26],
  [3, 4, 5, 6],
  [3, 9, 15, 21],
  [3, 10, 17, 24],
  [3, 11, 19, 27],
  [4, 10, 16, 22],
  [4, 11 ,18, 25],
  [5, 11, 17, 23],
  [5, 12, 19, 26],
  [6, 12, 18, 24],
  [6, 13, 20, 27],
  [7, 8, 9, 10],
  [7, 14, 21 ,28],
  [7, 15, 23, 31],
  [8, 9, 10, 11],
  [8, 15, 22, 29],
  [8, 16, 24, 32],
  [9, 10, 11 ,12],
  [9, 16, 23, 30],
  [9, 17, 25, 33],
  [10, 11, 12, 13],
  [10, 16, 22, 28],
  [10, 17, 24, 31],
  [10, 18, 26, 34],
  [11, 17, 23, 29],
  [11, 18, 25, 32],
  [12, 18, 24, 30],
  [12, 19, 26, 33],
  [13, 19, 25, 31],
  [13, 20, 27, 34],
  [14, 15, 16, 17],
  [14, 21, 28, 35],
  [14, 22, 30, 38],
  [15, 16, 17, 18],
  [15, 22, 29, 36],
  [15, 23, 31, 39],
  [16, 17, 18, 19],
  [16, 23, 30, 37],
  [16, 24, 32, 40],
  [17, 18, 19, 20],
  [17, 23, 29, 35],
  [17, 24, 31, 38],
  [17, 25, 33, 41],
  [18, 24, 30, 36],
  [18, 25, 32, 39],
  [19, 25, 31, 37],
  [19, 26, 33, 40],
  [20, 26, 32, 38],
  [20, 27, 34, 41],
  [21, 22, 23, 24],
  [21, 28, 35, 42],
  [21, 29, 37, 45],
  [22, 23, 24, 25],
  [22, 29, 36, 43],
  [22, 30, 38, 46],
  [23, 24, 25, 26],
  [23, 30, 37, 44],
  [23, 31, 39, 47],
  [24, 25, 26, 27],
  [24, 30, 36, 42],
  [24, 31, 38, 45],
  [24, 32, 40, 48],
  [25, 31, 37, 43],
  [25, 32, 39, 46],
  [26, 32, 38, 44],
  [26, 33, 40, 47],
  [27, 33, 39, 45],
  [27, 34, 41, 48],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
  [42, 43, 44, 45],
  [43, 44, 45, 46],
  [44, 45, 46, 47],
  [45, 46, 47, 48]
];

const player1 = 'X' ;
const player2 = 'O';
const cellElements = document.querySelectorAll('[check]');
const board = document.getElementById('board');
const player = document.getElementById('player');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let circleTurn;



startGame();
restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false
  player.innerText = 'Player : X';
  cellElements.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('X');
    cell.classList.remove('O');
    cell.addEventListener('click', handleClick, { once: true });
  })
  winningMessageElement.classList.remove('show');
}

function handleClick(key) {
  const cell = key.target;
  let currentPlayer = circleTurn ? player2 : player1
  placeMark(cell, currentPlayer);
  if (checkRound(currentPlayer)) {
    winningMessageTextElement.innerText = `${circleTurn ? "Player 2" : "Player 1"} Wins!`;
    restartGame();
    savegame(currentPlayer);
  } else if (isDraw()) {
    currentPlayer = 'Draw';
    winningMessageTextElement.innerText = 'Draw !!';
    player.innerText = 'Waiting..';
    restartGame();
    savegame(currentPlayer);
  } else {
    circleTurn = !circleTurn;
    player.innerText = circleTurn ? 'Player : O' : 'Player : X';
  }

}

function placeMark(cell, currentPlayer) {
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer);
  
}

function restartGame() {
  restartButton.innerText = 'Restart';
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.innerText === 'X' || cell.innerText === 'O';
  })
}

function checkRound(currentPlayer) {
  if (cellElements.length == 9) {
    return checkWinnerSize3.some(combination => {
      return combination.every(index => {
        return cellElements[index].innerText === currentPlayer;
      })
    })
  }
  else if (cellElements.length == 25) {
    return checkWinnerSize5.some(combination => {
      return combination.every(index => {
        return cellElements[index].innerText === currentPlayer;
      })
    })
  }
  else if (cellElements.length == 49) {
    return checkWinnerSize7.some(combination => {
      return combination.every(index => {
        return cellElements[index].innerText === currentPlayer;
      })
    })
  }
}

function savegame(currentPlayer) {
  const position = [];
  const size = cellElements.length;
  for (let i = 0; i < size; i++) {
    if (cellElements[i].innerText == 'X') {
      position.push('X');
    } else if (cellElements[i].innerText == 'O') {
      position.push('O');
    } else {
      position.push('');
    }
  }
  $.post("home",
  {
    name: currentPlayer,
    position: position,
    size: size
  });
}