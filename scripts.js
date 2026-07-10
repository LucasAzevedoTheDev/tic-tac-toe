function gameboardGenerator() {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  return {
    getBoard: () => gameBoard,
    placeMark: (index, mark) => {
      if(gameBoard[index] !== "") {
        return;
      }
      gameBoard[index] = mark;
    }
  }
}
const board = gameboardGenerator();

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
  return {
    switchTurn: switchTurn,
    getCurrentPlayer: () => currentPlayer,
    playRound: (index) => {
      board.placeMark(index, currentPlayer.mark);
      switchTurn();
    }
  }
}
const game = gameController();

// game.playRound(2);
// console.log(board.getBoard());
// game.playRound(3);
// console.log(board.getBoard());


