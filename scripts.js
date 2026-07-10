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
        if(boardCheck[combo[0]] === boardCheck[combo[1]] && boardCheck[combo[1]] === boardCheck[combo[2]]) {
          console.log("we have a winner");
        }
      })
    }
  }
}
const game = gameController();

// TESTS
console.log(game.getCurrentPlayer());
game.playRound(2);
console.log(board.getBoard());
console.log(game.getCurrentPlayer());
game.playRound(8);
console.log(board.getBoard());
game.playRound(1);
console.log(board.getBoard());
game.playRound(7);
console.log(board.getBoard());
game.playRound(0);
console.log(board.getBoard());
console.log(game.checkWinner());


// fix bug at winning condition (empty cells)


