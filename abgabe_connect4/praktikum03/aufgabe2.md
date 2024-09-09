## Aufgabe2

### Spiel-Ende erkennen (Miniprojekt, Abgabe)

Code online abgegeben

### Integrieren Sie die Funktion connect4Winner in das Spiel. Wenn ein Spieler gewonnen hat, soll ein Hinweis ausgegeben und weitere Klicks blockiert werden.

```javascript
let allowClicks = true; // Flag to control clicks
function playPiece(i, j) {
  if (!allowClicks) {
    return; // If clicks are not allowed, do nothing
  }
  let stackCounter = state.board.length - 1
  
  if (state.board[0][j] == '') {
      while (state.board[stackCounter][j] != '') {
          stackCounter--
      }
  
      let currentColor = state.next;
      const playerRed = 'Player Red';
      const playerBlue = 'Player Blue';
      let currentPlayer;
      let nextPlayer;

      //setting piece
      state.board[stackCounter][j] = currentColor;
      if (currentColor == 'r') {
        currentPlayer = playerRed
        nextPlayer = playerBlue
        state.next = 'b'
        playerTurnLabel.textContent = playerBlue
      } else {
        currentPlayer = playerBlue
        nextPlayer = playerRed
        state.next = 'r'
        playerTurnLabel.textContent = playerRed
      }
      showBoard()

      if(connect4Winner(currentColor, state.board)) {
        alert(currentPlayer + ' is the Winner!')
        //remove all eventlisteners for fields
        allowClicks = false
      }
  }
}
```
