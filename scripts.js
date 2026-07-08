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













