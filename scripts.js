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

function Player(name, mark) {
  if(!new.target) {
    throw Error("You must use the 'new' operator to call the constructor")
  }

  this.name = name;
  this.mark = mark;
}


function gameController() {
  let player1;
  let player2;
  let currentPlayer;

  const submitButton = document.querySelector(".start-button");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    board.reset();

    const player1Name = document.querySelector(".player1-name").value;
    const player1Mark = document.querySelector('[name="player1-mark"]:checked').value;
    const player2Name = document.querySelector(".player2-name").value;
    const player2Mark = document.querySelector('[name="player2-mark"]:checked').value;
    
    if(player1Mark === player2Mark) {
      alert("Can't select the same mark for both players.");
    }
    else {
      player1 = new Player(player1Name, player1Mark);
      player2 = new Player(player2Name, player2Mark);
      currentPlayer = player1;

      form.reset();
      modal.close();

      let grid = document.querySelector(".grid");
      let currentMsg = document.createElement("p");
        currentMsg.classList.add("current-msg");
        currentMsg.textContent = `${game.getCurrentPlayer().name}'s turn!`;
        grid.before(currentMsg);
    }
    
  });      
                                                  
  let switchTurn = () => {
    let hasWon = game.checkWinner();
    if(hasWon !== true) {
      if(currentPlayer === player1) {
          currentPlayer = player2;
        }
        else {
          currentPlayer = player1;
        }
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
    checkWinner: () => {
      let boardCheck = board.getBoard();
      let winCondition = false;

      winningCombos.forEach((combo) => {
        if(boardCheck[combo[0]] === boardCheck[combo[1]] && boardCheck[combo[1]] === boardCheck[combo[2]] 
          && boardCheck[combo[0]] !== ""
        ) {
          winCondition = true;
        }
      });
      return winCondition;
    },
    playRound: (index) => {
      if(!currentPlayer) {
        return;
      }

      if(!game.checkWinner()) {
        let marked = board.placeMark(index, currentPlayer.mark);

        if(marked) {
          switchTurn();
        }
      }
    }
  }
}
const game = gameController();

function displayController() {
  let container = document.querySelector(".container");
  let grid = document.createElement("div");
    grid.classList.add("grid");
    container.appendChild(grid);
  let currentDisplay = document.createElement("p");
    currentDisplay.classList.add("current-display");
    grid.before(currentDisplay);
  return {
    createGrid: () => {
       // Replace X/O text with SVG icon
      let updateSquare = (square, index) => {
        square.textContent = board.getBoard()[index];

        if (square.textContent === "X") {
          square.textContent = "";
          square.innerHTML = `<svg class="x-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
        }
        else if (square.textContent === "O") {
          square.textContent = "";
          square.innerHTML = `<svg class="circle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
        }
      }
  
      for(let i = 0; i < board.getBoard().length; i++) {
        let square = document.createElement("div");
          square.classList.add("square");
          updateSquare(square, i);

        square.addEventListener("click", () => {
          if(!game.getCurrentPlayer()) {
            if(!document.querySelector(".start-msg")) {
              let startMsg = document.createElement("p");
                startMsg.classList.add("start-msg");
                startMsg.textContent = "Please click the start button to begin the game!";
                grid.before(startMsg);
            }
          };
          
          game.playRound(i);
          updateSquare(square, i);

          let currentMsg = document.querySelector(".current-msg");
          let winnerDisplay = document.querySelector(".winner-msg");
          let hasWon = game.checkWinner();
          let restartButton = document.querySelector(".restart-button");

          if(currentMsg) {
            currentMsg.textContent = `${game.getCurrentPlayer().name}'s turn!`;
          }
            
          if(hasWon && !winnerDisplay) {
            if(currentMsg) {
              currentMsg.style.display = "none";
            }

            let winnerDisplay = document.createElement("p");
              winnerDisplay.classList.add("winner-msg");
              winnerDisplay.textContent = `${game.getCurrentPlayer().name} has won`; 
              grid.before(winnerDisplay);
          
            let restartButton = document.createElement("button");
              restartButton.classList.add("restart-button");
              restartButton.textContent = "Restart";
              grid.appendChild(restartButton);

              restartButton.addEventListener("click", () => {
                board.reset();  

                winnerDisplay.remove();
                restartButton.remove();

                const squares = document.querySelectorAll(".square");
                squares.forEach((square) => {
                  square.innerHTML = "";
                });
                if(currentMsg) {
                  currentMsg.style.display = "block";
                  currentMsg.textContent = `${game.getCurrentPlayer().name}'s turn!`;
                }
              })
          }
          if(winnerDisplay) {
            // Do nothing
          }
        });
        grid.appendChild(square);        
      }
    }
  }
}
const display = displayController();

const modal = document.querySelector(".modal");
const dialogButton = document.querySelector(".dialog-button");
const startButton = document.querySelector(".start-button");
const closeButton = document.querySelector(".close-button");
const form = document.querySelector(".form");

dialogButton.addEventListener("click", () => {
  board.reset();

  document.querySelector(".start-msg")?.remove();
  document.querySelector(".winner-msg")?.remove();
  document.querySelector(".restart-button")?.remove();
  document.querySelector(".current-msg")?.remove();

  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.innerHTML = "";
  });

   modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
  form.reset();
});

display.createGrid();


// TESTS
// game.playRound(0);
// game.playRound(1);
// game.playRound(2);
// game.playRound(3);
// game.playRound(4);
// game.playRound(5);
// game.playRound(6);
// game.playRound(7);
// game.playRound(8);

// ADD CURRENTDISPLAY P LOGIC


