## Aufgaben

### Passen Sie Ihr Script so an, dass beim Klick auf ein Feld zunächst die Spalte dieses Felds ermittelt wird und die Spielfigur im untersten freien Feld dieser Spalte platziert wird. Wenn die Spalte bereits voll ist, wird der Klick ignoriert. 

```javascript
    function playPiece(i, j) {
        let stackCounter = state.board.length - 1
        
        if (state.board[0][j] == '') {
            while (state.board[stackCounter][j] != '') {
                stackCounter--
            }
        
            state.board[stackCounter][j] = currentColor;
            if (currentColor == 'r') {
                currentColor = 'b'
            } else {
                currentColor = 'r'
            }
            renderBoard()
        }
    }
```

### Ergänzen Sie die Seite um einen Button «Neues Spiel», welcher das Spielfeld leert

```html
<body>

  <button class="btnNewGame" onclick="showBoard()">new game</button>

  <div class="board">

    <script>showBoard()</script>

  </div>

</body>
```

### Ergänzen Sie das Script um die Angabe, ob rot oder blau den nächsten Zug hat.

```html
<label id="">next Turn: <a id="playerTurnLabel"></a></label>
```

```javascript
    // Get the playerTurnLabel element by its ID
    const playerTurnLabel = document.getElementById('playerTurnLabel');
    playerTurnLabel.textContent = 'Player Red'

    ...

    state.board[stackCounter][j] = currentColor;
    if (currentColor == 'r') {
        currentColor = 'b'
        playerTurnLabel.textContent = 'Player Blue'
    } else {
        currentColor = 'r'
        playerTurnLabel.textContent = 'Player Red'
    }
```