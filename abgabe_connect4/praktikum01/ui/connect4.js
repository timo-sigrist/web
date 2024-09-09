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

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function updateBoardRandomly() {
        const numRows = state.board.length;
        const numCols = state.board[0].length;

        // Select a random cell
        const randomRow = getRandomInt(numRows);
        const randomCol = getRandomInt(numCols);

        // Randomly decide to clear the cell or set a red/blue piece
        const action = getRandomInt(3); // 0, 1, or 2
        if (action === 0) {
            state.board[randomRow][randomCol] = ''; // Clear cell
        } else {
            const color = action === 1 ? 'r' : 'b';
            state.board[randomRow][randomCol] = color; // Set red or blue piece
        }

        // Update the UI based on the updated state
        renderBoard();
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

    // Render the initial board
    renderBoard();

    // Set interval to update the board randomly every second
    const intervalId = setInterval(updateBoardRandomly, 1000);

    // Stop the interval after a specific duration (e.g., 5 seconds)
    setTimeout(() => {
        clearInterval(intervalId); // Stop the interval after 5 seconds
    }, 5000); // 5 seconds (1000 ms * 5)
}
