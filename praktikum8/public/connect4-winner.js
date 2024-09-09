
let testBoard = [
    [ '_', '_', '_', '_', '_', '_', '_' ],
    [ '_', '_', '_', '_', '_', '_', '_' ],
    [ '_', '_', '_', '_', 'r', '_', '_' ],
    [ '_', '_', '_', 'r', 'r', 'b', 'b' ],
    [ '_', '_', 'r', 'b', 'r', 'r', 'b' ],
    [ 'b', 'b', 'b', 'r', 'r', 'b', 'b' ]
   ]

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

module.exports = { connect4Winner } 
