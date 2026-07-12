function boardGenerator() {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  return {
    getBoard: () => gameBoard,
    placeMark: (index, mark) => {
      if(gameBoard[index] !== "") {
        return false;
      }
      gameBoard[index] = mark;
      return true;
    },
    reset: () => {
      gameBoard.forEach((item, index) => {
        gameBoard[index] = "";
      })
    }
  }
}
const board = boardGenerator();

function playerGenerator(name, mark) {
    return {
      name: name,
      mark:  mark
    }
}
const player1 = playerGenerator("player1", "X");
const player2 = playerGenerator("player2", "O");

function gameController() {
  let currentPlayer = player1;

  let switchTurn = () => {
    if(currentPlayer === player1) {
        currentPlayer = player2;
      }
      else {
        currentPlayer = player1;
      }
  }
  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  return {
    switchTurn: switchTurn,
    getCurrentPlayer: () => currentPlayer,
    playRound: (index) => {
        let marked = board.placeMark(index, currentPlayer.mark);
        if(marked) {
          switchTurn();
        }
    },
    checkWinner: () => {
      let boardCheck = board.getBoard();

      winningCombos.forEach((combo) => {
        if(boardCheck[combo[0]] === boardCheck[combo[1]] && boardCheck[combo[1]] === boardCheck[combo[2]] 
          && boardCheck[combo[0]] !== ""
        ) {
          console.log("we have a winner");
          board.reset();
        }
      })
    }
  }
}
const game = gameController();

function displayController() {
  let container = document.createElement("div");
    container.classList.add(".container");
    document.body.appendChild(container);
  let grid = document.createElement("div");
    grid.classList.add(".grid");
    container.appendChild(grid);

  return {
    createGrid: () => {
      for(let i = 0; i < board.getBoard().length; i++) {
        let square = document.createElement("div");
          square.classList.add(".square");
          square.textContent = board.getBoard()[i];
          grid.appendChild(square);
      }
    }
  }
}
const display = displayController();

// TESTS
game.playRound(0);
game.playRound(1);
game.playRound(2);
game.playRound(3);
game.playRound(4);
game.playRound(5);
game.playRound(6);
game.playRound(7);
game.playRound(8);
display.createGrid();





