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




