# Tic Tac Toe

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

A fully playable two-player Tic Tac Toe game built with Vanilla JavaScript, HTML, and CSS. This project is part of The Odin Project's JavaScript curriculum, focusing on factory functions, the module pattern, and structuring an application's logic into independent, communicating objects.

## Features

- **Custom Player Setup:** Players enter their names and pick a mark (X or O) through a native HTML `<dialog>` form before the match starts.
- **Turn Tracking:** A live indicator above the board shows whose turn it is, updated after every move.
- **Win & Tie Detection:** Checks all 8 possible winning lines (rows, columns, diagonals) and flags a draw when the board fills with no winner.
- **Restart Flow:** A restart button clears the board, board data, and turn order to start a fresh match without reloading the page.
- **Occupied-Square Protection:** `placeMark` rejects clicks on squares that are already taken, preventing overwritten marks.
- **Custom SVG Marks:** X and O are rendered as inline SVG (not `<img>`), so their color and size are fully controlled through CSS.

## Key Learnings

- **Factory Functions:** Built `Gameboard`, `Player`, and `GameController` as factory functions instead of relying on plain objects or classes, the core pattern this TOP lesson introduces.
- **Module Pattern & Minimal Global Code:** Kept the gameboard as a single instance with only its needed methods exposed, avoiding unnecessary global variables as the assignment explicitly asks for.
- **Placing Logic in the Right Object:** Split responsibilities deliberately — board state and mark placement in `Gameboard`, turn and win logic in `GameController`, DOM rendering in `displayController` — instead of mixing concerns in one place.
- **Closures & Private State:** Used closures to keep the board array and current player private, only reachable through the methods each factory returns.
- **Console-First Development:** Got the full game logic working and testable by calling functions manually before writing any DOM code, per the assignment's suggested approach.
- **Separating Logic from the DOM:** Built the win-checking and turn-switching logic independently of the display, then connected the two through function calls rather than intertwining them.

## How to Run Locally

1- Clone this repository:
   ```bash
   git clone https://github.com/LucasAzevedoTheDev/tic-tac-toe 
```
2- Open `index.html` in your browser  

---
Developed by [Lucas Azevedo](https://github.com/LucasAzevedoTheDev)