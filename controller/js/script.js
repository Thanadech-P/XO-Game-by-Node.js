const player1 = "X";
const player2 = "O";
const cellElements = document.querySelectorAll("[check]");
const board = document.getElementById("board");
const player = document.getElementById("player");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const restartButtonBOT = document.getElementById("restartButton-bot");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
let circleTurn;
let sizegame;

checkSize();
const Winner = genWinner();
winningMessageElement.classList.add("show");
restartButton.addEventListener("click", startGame);
restartButtonBOT.addEventListener("click", startAi);

function startAi() {
  circleTurn = false;
  player.innerText = "Player : X";
  cellElements.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("X");
    cell.classList.remove("O");
    cell.removeEventListener('click', handleClick);
    cell.removeEventListener('click', playBot);
    cell.addEventListener("click", playBot);
  });
  winningMessageElement.classList.remove("show");
}

function startGame() {
  circleTurn = false;
  player.innerText = "Player : X";
  cellElements.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("X");
    cell.classList.remove("O");
    cell.removeEventListener('click', playBot);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener("click", handleClick);
  });
  winningMessageElement.classList.remove("show");
}

function checkSize() {
  if (cellElements.length === 9) {
    sizegame = 3;
  } else if (cellElements.length === 16) {
    sizegame = 4;
  } else if (cellElements.length === 25) {
    sizegame = 5;
  } else if (cellElements.length === 36) {
    sizegame = 6;
  } else if (cellElements.length === 49) {
    sizegame = 7;
  } else if (cellElements.length === 64) {
    sizegame = 8;
  } else if (cellElements.length === 81) {
    sizegame = 9;
  } else if (cellElements.length === 100) {
    sizegame = 10;
  }
}

function handleClick(key) {
  const cell = key.target;
  let currentPlayer = circleTurn ? player2 : player1;
  placeMark(cell, currentPlayer);
  if (checkRound(currentPlayer)) {
    winningMessageTextElement.innerText = `${circleTurn ? "Player 2" : "Player 1"} Wins!`;
    restartGame();
    savegame(currentPlayer);
  } else if (isDraw()) {
    currentPlayer = "Draw";
    winningMessageTextElement.innerText = "Draw !!";
    player.innerText = "Waiting..";
    restartGame();
    savegame(currentPlayer);
  } else {
    circleTurn = !circleTurn;
    player.innerText = circleTurn ? "Player : O" : "Player : X";
  }
}

function playBot(key) {
  const cell = key.target;
  let currentPlayer = circleTurn ? player2 : player1;
  placeMark(cell, currentPlayer);
  if (checkRound(currentPlayer)) {
    winningMessageTextElement.innerText = `${circleTurn ? "Player 2" : "Player 1"} Wins!`;
    restartGame();
    savegame(currentPlayer);
  } else if (isDraw()) {
    currentPlayer = "Draw";
    winningMessageTextElement.innerText = "Draw !!";
    player.innerText = "Waiting..";
    restartGame();
    savegame(currentPlayer);
  } else {
    circleTurn = !circleTurn;
    botplay();
    circleTurn = !circleTurn;
    player.innerText = circleTurn ? "Player : O" : "Player : X";
  }
}

function botplay() {
    let randomAI;
    let checkPos = [];  
    for (let i = 0; i < cellElements.length; i++) {
      
      if(cellElements[i].innerText === ""){
        checkPos.push(i)
      }
    }
    randomAI = checkPos[Math.floor(Math.random() * checkPos.length)]
    cellElements[randomAI].innerText = "O";
    cellElements[randomAI].classList.add("O");

    if(checkRound("O")){
      winningMessageTextElement.innerText = `${circleTurn ? "Player 2" : "Player 1"} Wins!`;
      restartGame();
      savegame("O");
    }else if (isDraw()) {
      currentPlayer = "Draw";
      winningMessageTextElement.innerText = "Draw !!";
      player.innerText = "Waiting..";
      restartGame();
      savegame(currentPlayer);
    }
}

function placeMark(cell, currentPlayer) {
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer);
}

function restartGame() {
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.innerText === "X" || cell.innerText === "O";
  });
}

function checkRound(currentPlayer) {
  return Winner.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].innerText === currentPlayer;
    });
  });
}

function genWinner() {
  var totalSq = sizegame * sizegame;
  var winArr = [];
  var topL = "";
  var topR = "";

  for (var j = 0; j < sizegame; j++) {
    strH = "";
    strV = "";
    for (var i = 0; i < totalSq; i++) {
      if (i / sizegame == j) {
        strH += i + ",";
        for (var k = 1; k < sizegame; k++) {
          strH += i + k + ",";
        }
      }
      if (i % sizegame == j) {
        strV += i + ",";
      }
    }
    
    strH = strH.substring(0, strH.length - 1);
    strV = strV.substring(0, strV.length - 1);

    var h = strH.split(",");
    var v = strV.split(",");

    winArr[j] = v;
    winArr[j + sizegame] = h;
    topL += j * (sizegame + 1) + ",";
    topR += (j + 1) * (sizegame - 1) + ",";
  }
  topL = topL.substring(0, topL.length - 1);
  topL = topL.split(",");
  winArr.push(topL);

  topR = topR.substring(0, topR.length - 1);
  topR = topR.split(",");
  winArr.push(topR);

  return winArr;
}

function savegame(currentPlayer) {
  const position = [];
  for (let i = 0; i < sizegame * sizegame; i++) {
    if (cellElements[i].innerText == "X") {
      position.push("X");
    } else if (cellElements[i].innerText == "O") {
      position.push("O");
    } else {
      position.push("");
    }
  }
  $.post("home", {
    name: currentPlayer,
    position: position,
    size: sizegame,
  });
}
