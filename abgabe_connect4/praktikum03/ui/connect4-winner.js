function connect4Winner(player, board) {
    // Funktion zur Überprüfung einer Zeile auf Gewinn
    function checkRow(row) {
        for (let i = 0; i <= 3; i++) {
            if (row[i] === player &&
                row[i + 1] === player &&
                row[i + 2] === player &&
                row[i + 3] === player) {
                return true;
            }
        }
        return false;
    }

    // Funktion zur Überprüfung einer Spalte auf Gewinn
    function checkColumn(col) {
        for (let i = 0; i <= 2; i++) {
            if (board[i][col] === player &&
                board[i + 1][col] === player &&
                board[i + 2][col] === player &&
                board[i + 3][col] === player) {
                return true;
            }
        }
        return false;
    }

    // Funktion zur Überprüfung der Diagonalen auf Gewinn (nach rechts unten)
    function checkDiagonal() {
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 3; j++) {
                if (board[i][j] === player &&
                    board[i + 1][j + 1] === player &&
                    board[i + 2][j + 2] === player &&
                    board[i + 3][j + 3] === player) {
                    return true;
                }
            }
        }
        return false;
    }

    // Funktion zur Überprüfung der Diagonalen auf Gewinn (nach links unten)
    function checkReverseDiagonal() {
        for (let i = 0; i <= 2; i++) {
            for (let j = 3; j <= 6; j++) {
                if (board[i][j] === player &&
                    board[i + 1][j - 1] === player &&
                    board[i + 2][j - 2] === player &&
                    board[i + 3][j - 3] === player) {
                    return true;
                }
            }
        }
        return false;
    }

    // Überprüfen auf Gewinner in den Reihen, Spalten und Diagonalen
    for (let i = 0; i < 6; i++) {
        if (checkRow(board[i])) {
            return true;
        }
    }

    for (let i = 0; i < 7; i++) {
        if (checkColumn(i)) {
            return true;
        }
    }

    if (checkDiagonal() || checkReverseDiagonal()) {
        return true;
    }

    return false;
}

module.exports = { connect4Winner }
