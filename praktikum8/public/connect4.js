
const state = {
    board: [
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ]
    ],
    playerTurn: 'r'
}

const SERVICE = "http://localhost:3000/api/data/"
const apiKey = "c4game"

function showBoard() {
    let boardElement = document.querySelector(".board")
    clearBoard(boardElement)

    for (let ix = 0; ix < state.board.length; ix++) {
      for (let iy = 0; iy < state.board[0].length; iy++) {
        let field = elt("div", { class: "field" })

        field.addEventListener("click", () => playerMove(ix, iy))

        boardElement.appendChild(field);

        let fieldState = state.board[ix][iy]
        
        if (fieldState != '') {
          if (fieldState == 'r') {
              field.appendChild(elt("div", {class: "red piece"}))
          } else {
              field.appendChild(elt("div", {class: "blue piece"}))
          }
        }

      }
    }
    
    updatePlayerTurnLabel()
}

function clearBoard(boardElement) {
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }
}

async function playerMove(x, y) {
  console.log(x,y)
  let emptyField = findLowestEmptyField(y)
  if (emptyField == -1) return

  state.board[emptyField][y] = state.playerTurn
  showBoard()

  if(connect4Winner(state.playerTurn, state.board)) {
    alert("player " + state.playerTurn + " won!")
    resetGame()
  }
  nextPlayer()
}

function updatePlayerTurnLabel() {
  let playerTurnLabel = document.getElementById("playerTurnLabel");
  let playerLabel = "red"
  let playerLabelClass = "redLabel"
  if (state.playerTurn == 'b') {
    playerLabel = "blue"
    playerLabelClass = "blueLabel"
  }
  playerTurnLabel.textContent = playerLabel;
  playerTurnLabel.setAttribute("class", playerLabelClass);
}

function nextPlayer() {
  if (state.playerTurn == 'r') {
    state.playerTurn = 'b'
  } else {
    state.playerTurn = 'r'
  }
}

function findLowestEmptyField(y) {
  for (let ix = state.board.length - 1; ix >= 0; ix--) {
    if (state.board[ix][y] == '') {
      return ix
    }
  }
  return -1
}

function resetGame() {
  for (let ix = 0; ix < state.board.length; ix++) {
    for (let iy = 0; iy < state.board[0].length; iy++) {
      state.board[ix][iy] = ''
    }
  }
  state.playerTurn = 'r'

  
  resetGameOnServer()
  showBoard()
}

// Get current state from server and re-draw board
function loadStateBrowser() {
  //await Promise.all([loadBoardFromServer(), loadPlayerFromServer()])
  showBoard()
}


// Get current state from server and re-draw board
async function loadStateServer() {
  await Promise.all([loadBoardFromServer(), loadPlayerFromServer()])
  showBoard()
}


//  Put current state to server
function saveStateServer() {
  saveBoardToServer()
  savePlayerToServer()
}

function loadBoardFromServer() {
  return new Promise((resolve, reject) => {
    let url = SERVICE + "board?api-key=" + apiKey
    fetch(url)
      .then(response => response.json())
      .then(data => {
        state.board = data
        resolve()
      })
      .catch(error => {
        console.error('Error:', error)
        reject(error)
      });
  });
}


function loadPlayerFromServer() {
  return new Promise((resolve, reject) => {
    let url = SERVICE + "playerTurn?api-key=" + apiKey 
    fetch(url)
      .then(response => response.json())
      .then(data => {
        state.playerTurn = data[0]
        resolve()
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error)
      });
    });
}

function saveBoardToServer() {
  fetch(SERVICE + "board" + "?api-key=c4game", {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(state.board)
   })
}


function savePlayerToServer() {
  fetch(SERVICE + "playerTurn" + "?api-key=c4game", {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify([state.playerTurn])
   })
}

function resetGameOnServer() {
  fetch(SERVICE + "board" + "?api-key=c4game", {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(Array(6).fill('').map(el => Array(7).fill('')))
   })

   fetch(SERVICE + "playerTurn" + "?api-key=c4game", {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(['r'])
   })
}

function serverAccessible() {
  return true;
}


function connect4Winner(player, board) {
  const rows = board.length;
  const cols = board[0].length;

  // Check horizontal
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 3; col++) {
          if (board[row][col] === player &&
              board[row][col] === board[row][col + 1] &&
              board[row][col] === board[row][col + 2] &&
              board[row][col] === board[row][col + 3]) {
              return true;
          }
      }
  }

  // Check vertical
  for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 3; row++) {
          if (board[row][col] === player &&
              board[row][col] === board[row + 1][col] &&
              board[row][col] === board[row + 2][col] &&
              board[row][col] === board[row + 3][col]) {
              return true;
          }
      }
  }

  // Check diagonal (top-left to bottom-right)
  for (let row = 0; row < rows - 3; row++) {
      for (let col = 0; col < cols - 3; col++) {
          if (board[row][col] === player &&
              board[row][col] === board[row + 1][col + 1] &&
              board[row][col] === board[row + 2][col + 2] &&
              board[row][col] === board[row + 3][col + 3]) {
              return true;
          }
      }
  }

  // Check diagonal (top-right to bottom-left)
  for (let row = 0; row < rows - 3; row++) {
      for (let col = 3; col < cols; col++) {
          if (board[row][col] === player &&
              board[row][col] === board[row + 1][col - 1] &&
              board[row][col] === board[row + 2][col - 2] &&
              board[row][col] === board[row + 3][col - 3]) {
              return true;
          }
      }
  }

  return false; // No winner
}

function initialize() {
  showBoard()
}


window.addEventListener('load', initialize)
  
  