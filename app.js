/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// Game Instructions
const open = document.getElementById('open');
const close = document.getElementById('close');
open.addEventListener('click', function() {
  const navBlack = document.querySelector('.nav-black'),
    navRed = document.querySelector('.nav-red'),
    navWhite = document.querySelector('.nav-white'),
    navContainer = document.querySelector('.nav-container'),
    navText = document.querySelector('.nav-text');

  navBlack.classList.add('visible');
  navRed.classList.add('visible');
  navWhite.classList.add('visible');
  navContainer.classList.add('visible');
  navText.classList.add('visible');
});

close.addEventListener('click', function() {
  const navBlack = document.querySelector('.nav-black'),
    navRed = document.querySelector('.nav-red'),
    navWhite = document.querySelector('.nav-white'),
    navContainer = document.querySelector('.nav-container'),
    navText = document.querySelector('.nav-text');

  navBlack.classList.remove('visible');
  navRed.classList.remove('visible');
  navWhite.classList.remove('visible');
  navContainer.classList.remove('visible');
  navText.classList.remove('visible');
});

const restartGame = document.getElementById('restart-game'); // init restart text

/*
This code adds a modal tthat confirms if the player wants to restart.
restart on refreshes page
*/

const restart = () => {
  let alert = document.getElementById('alert');
  alert.innerHTML = `
      <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Are you a quitter?</h5>
           
          </div>
          <div class="modal-body">
            are you sure you want to restart
            
          </div>
          <div class="modal-footer">
           
            <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">No</button>
            <button type="button" onclick="window.location.reload();" class="btn btn-primary" >Yes</button>
          </div>
        </div>
      </div>
    </div>
      `;
  $('#myModal').modal('show');
};

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  for (let y = 0; y < HEIGHT; y++) {
    board.push([]);
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(null);
    }
  }
};

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  /*
  Creates the 'top' level row and giving it an id of 'colomn-top' and a 'click' event listener called 'handleClick'
  */

  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  /*
  Creates the number of columns from 0 to the WIDTH variable. Then appends to the 'top' level row. The 'top' level row appends to the htmlBoard
 
 */

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code

  /*
  Creates the number of rows based off the HEIGHT variable. Creates Cell with id set to its HEIGHT and WITDH variable position. Appends Cell to row. Appends row to htmlBoard
  */
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      const span = document.createElement('span');
      span.setAttribute('class', 'circle');
      cell.append(span);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
};

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = x => {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return null;
};

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  const cell = document.getElementById(`${y}-${x}`);
  const piece = document.createElement('div');
  piece.classList.add('piece', `p${currPlayer}`);

  cell.append(piece);
};

/** endGame: announce game end */

const endGame = msg => {
  // TODO: pop up alert message
  window.setTimeout(() => {
    let alert = document.getElementById('alert');
    alert.innerHTML = `
      <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${msg}</h5>
           
          </div>
          <div class="modal-body">
            Congrats! You are the Connect 4 Champion!
            
          </div>
          <div class="modal-footer">
           
           
            <button type="button" onclick="window.location.reload();" class="btn btn-primary" >Play Again</button>
          </div>
        </div>
      </div>
    </div>
      `;
    $('#myModal').modal('show');
  }, 1001);
};

/** handleClick: handle click of column top to play piece */

const handleClick = evt => {
  const isNotNull = curVal => curVal !== null;
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    const top = document.querySelector('#column-top');
    top.removeEventListener('click', handleClick);
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board[0].every(isNotNull)) {
    return endGame("It's a tie!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
  window.setTimeout(() => {
    let nextPlayer = document.getElementById('nextPlayer');
    nextPlayer.innerText = currPlayer;
    if (currPlayer === 1) {
      nextPlayer.style.color = 'red';
    } else {
      nextPlayer.style.color = 'blue';
    }
  }, 1001);
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  const _win = cells => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  };

  // TODO: read and understand this code. Add comments to help you.

  /* This code sets the winning patterns/configuration. Then the winning patterns are passed in _win() and it returns a winner
   */
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3]
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x]
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3]
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3]
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
};

makeBoard();
makeHtmlBoard();
