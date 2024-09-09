// Function to create elements
function elt (type, attrs, ...children) {
    let node = document.createElement(type)
    Object.keys(attrs).forEach(key => {
      node.setAttribute(key, attrs[key])
    })
    for (let child of children) {
      if (typeof child != "string") node.appendChild(child)
      else node.appendChild(document.createTextNode(child))
    }
    return node
}

function showBoard() {
    let state = {
        board: [
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '']
        ]
    }

    let board = document.querySelector('.board');
    let currentColor = 'r'; // Initial color
    // Get the playerTurnLabel element by its ID
    const playerTurnLabel = document.getElementById('playerTurnLabel');
    playerTurnLabel.textContent = 'Player Red'

    function playPiece(i, j) {
        let stackCounter = state.board.length - 1
        
        if (state.board[0][j] == '') {
            while (state.board[stackCounter][j] != '') {
                stackCounter--
            }
        
            state.board[stackCounter][j] = currentColor;
            if (currentColor == 'r') {
                currentColor = 'b'
                playerTurnLabel.textContent = 'Player Blue'
            } else {
                currentColor = 'r'
                playerTurnLabel.textContent = 'Player Red'
            }
            renderBoard()
        }
    }
    
    function renderBoard() {
        // Clear the board container
        if (board) {
            board.innerHTML = '';
        }

        // Iterate through the board array
        for (let i = 0; i < state.board.length; i++) {
            for (let j = 0; j < state.board[i].length; j++) {
                var fieldDiv = document.createElement("div");
                fieldDiv.classList.add("field");

                fieldDiv.addEventListener("click", () => playPiece(i, j))

                // Appending the created elements to the board
                if (board) {
                    board.appendChild(fieldDiv);
                }

                if (state.board[i][j] == 'b') {
                    fieldDiv.appendChild(document.createElement("div")).classList.add("blue", "piece");
                } else if (state.board[i][j] == 'r') {
                    fieldDiv.appendChild(document.createElement("div")).classList.add("red", "piece");
                }
            }
        }
    }

    renderBoard()
}
