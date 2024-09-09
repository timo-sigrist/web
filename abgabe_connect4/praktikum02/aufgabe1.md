## Aufgaben

### Erstellen Sie eine Kopie des letzten Projektstands und passen Sie das Script so an, dass mit einem leeren Spielfeld begonnen wird: also keine vorbelegten Felder und kein Timer, der Felder zufällig belegt oder wieder leert.

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
```

### Ergänzen Sie Ihr Script so, dass beim Klick auf ein Feld eine Spielfigur (Klasse piece) in as Feld eingefügt wird. Die Farbe soll bei jedem Klick wechseln: einmal rot, einmal blau.

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
    let currentColor = 'r'; // Initial color

    function playPiece(i, j) {
        state.board[i][j] = currentColor;
        if (currentColor == 'r') {
            currentColor = 'b'
        } else {
            currentColor = 'r'
        }
        renderBoard()
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
                    fieldDiv.appendChild(document.createElement("div")).classList.add("blue""piece");
                } else if (state.board[i][j] == 'r') {
                    fieldDiv.appendChild(document.createElement("div")).classList.add("red""piece");
                }
            }
        }
    }

    renderBoard()
}
```