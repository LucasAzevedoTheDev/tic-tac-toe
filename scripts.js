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
  return {
    switchTurn: switchTurn,
    getCurrentPlayer: () => currentPlayer,
    playRound: (index) => {
        let marked = board.placeMark(index, currentPlayer.mark);
        if(marked) {
          switchTurn();
        }
    }
  }
}
const game = gameController();

// TESTS
console.log(game.getCurrentPlayer());
game.playRound(2);
console.log(board.getBoard());
console.log(game.getCurrentPlayer());
game.playRound(2);
console.log(board.getBoard());
console.log(game.getCurrentPlayer());

// fix bug that changes the player even when the field already has a mark
// look console




