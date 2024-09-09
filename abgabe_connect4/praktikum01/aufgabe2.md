## Aufgabe2

### Schreiben Sie nun eine Funktion showBoard, welche das komplette Board für den aktuellen Spielstand ausgibt, also die entsprechenden div-Elemente ins DOM einfüg

```javascript
function showBoard() {
    let state = { 
        board: [ 
            [ '', '', '', '', '', '', '' ], 
            [ '', '', '', '', '', '', '' ], 
            [ '', '', '', '', '', '', '' ], 
            [ '', '', '', '', '', '', '' ], 
            [ '', '', '', '', '', '', '' ], 
            [ '', '', 'b', 'r', '', '', '' ] 
        ]                            
    }

    let board = document.querySelector('.board');

    // Iterate through the board array
    for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
            console.log(`Row: ${i}, Column: ${j}, Value: ${state.board[i][j]}`);

            var fieldDiv = elt("div", { class: "field" });

            // Appending the created elements to the board
            if (board) {
                board.appendChild(fieldDiv);
            }
            
            if (state.board[i][j] == 'b') {
                fieldDiv.appendChild(elt("div", {class: "blue piece"}))
            } else if (state.board[i][j] == 'r') {
                fieldDiv.appendChild(elt("div", {class: "red piece"}))
            }
        }
    }
}
```

### Ergänzen Sie Ihr Script um einen Timer, der jede Sekunde ein Feld zufällig auswählt und dieses – ebenfalls zufällig – löscht oder mit einem roten oder blauen Spielstein belegt.

```javascript
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
```
