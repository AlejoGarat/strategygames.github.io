let /** !Array<string> */ boardTTC = [['', '', ''],
['', '', ''],
['', '', '']];

let /*string*/ p1 = "";
let /*string*/ p2 = "";
const /*int*/ ai = "ai";
const /*int*/ none = "";
const dim = 3;
let gameOver = false;
let turn = "";
// Create an object:
let bestChoice = { row: 0, col: 0 };
const plusInf = 9999;
const minusInf = -9999;

function getDifficulty() {
    const difficultyValue = document.getElementById("dif").value;
    let difficulty = 0;
    if (difficultyValue === "easy") {
        difficulty = 1;
    } else if (difficultyValue === "medium") {
        difficulty = 2;
    } else {
        difficulty = 3;
    }
    return difficulty;
}

function startGameTTC() {
    gameOver = false;
    p1 = prompt("Ingrese nombre del jugador con círculo.");
    p2 = prompt("Ingrese nombre del jugador con cruz.");
    turn = p1;
    for (let i = 0; i < dim; i++) {
        for (let e = 0; e < dim; e++) {
            boardTTC[i][e] = none;
        }
    }
    document.getElementById("turnTTC").innerHTML = "Turno de: " + turn;
}

function restartGameTTC() {
    gameOver = true;
    for (let i = 0; i < dim; i++) {
        for (let e = 0; e < dim; e++) {
            boardTTC[i][e] = none;
            document.getElementById("p" + i + e).style.backgroundImage = "";
            document.getElementById("pS" + i + e).style.backgroundImage = "";
        }
    }
    document.getElementById("turnTTC").innerHTML = "";
    document.getElementById("turnTTCAI").innerHTML = "";
}

function startGameTTCAI() {
    gameOver = false;
    p1 = prompt("Ingrese nombre del jugador con círculo.");
    turn = p1;
    for (let i = 0; i < dim; i++) {
        for (let e = 0; e < dim; e++) {
            boardTTC[i][e] = none;
        }
    }
}

function gameIsOver() {
    document.getElementById("turnTTC").innerHTML = turn + " ha ganado!";
    document.getElementById("turnTTCAI").innerHTML = turn + " ha ganado!";
    gameOver = true;
}

function turnMessage() {
    if (turn == p1) {
        document.getElementById("turnTTC").innerHTML = "Turno de: " + p2;
        turn = p2;
    } else {
        document.getElementById("turnTTC").innerHTML = "Turno de: " + p1;
        turn = p1;
    }
}

function horizontalCheck(numRow, numCol, player) {
    let counter = 0;
    //Right check
    for (let e = numCol; e < dim; e++) {
        if (boardTTC[numRow][e] == player) {
            counter++;
        } else {
            break;
        }
    }

    if (counter == 3) return true;

    counter -= 1;

    //Left check
    for (let e = numCol; e >= 0; e--) {
        if (boardTTC[numRow][e] == player) {
            counter++;
        } else {
            break;
        }
    }

    if (counter == 3) return true;
    return false;
}

function verticalCheck(numRow, numCol, player) {
    let counter = 0;
    //Bottom to top
    for (let i = numRow; i < dim; i++) {
        if (boardTTC[i][numCol] == player) {
            counter++;
        } else {
            break;
        }
    }

    if (counter == 3) return true;

    counter -= 1;

    //Top to bottom
    for (let i = numRow; i >= 0; i--) {
        if (boardTTC[i][numCol] == player) {
            counter++;
        } else {
            break;
        }
    }

    if (counter == 3) return true;
    return false;

}

function inBounds(numRow, numCol) {
    return (numRow >= 0 && numCol >= 0 && numRow < dim && numCol < dim);
}

function rightDiagonalCheck(numRow, numCol, player) {
    let counter = 0;

    //Top to bottom
    for (let i = 0; i < 3 && inBounds(numRow + i, numCol - i); i++) {
        if (boardTTC[numRow + i][numCol - i] === player) {
            counter++;
        } else {
            break;
        }
    }

    //Bottom to top
    if (counter === 3) return true;
    counter -= 1;

    for (let i = 0; i < 3 && inBounds(numRow - i, numCol + i); i++) {
        if (boardTTC[numRow - i][numCol + i] === player) {
            counter++;
        } else {
            break;
        }
    }

    if (counter === 3) return true;
    return false;
}

function leftDiagonalCheck(numRow, numCol, player) {
    let counter = 0;

    //Top to bottom
    for (let i = 0; i < 3 && inBounds(numRow + i, numCol + i); i++) {
        if (boardTTC[numRow + i][numCol + i] === player) {
            counter++;
        } else {
            break;
        }
    }

    //Bottom to top
    if (counter === 3) return true;
    counter -= 1;

    for (let i = 0; i < 3 && inBounds(numRow - i, numCol - i); i++) {
        if (boardTTC[numRow - i][numCol - i] === player) {
            counter++;
        } else {
            break;
        }
    }

    if (counter === 3) return true;
    return false;
}

function playerWon(numRow, numCol, player) {
    return (horizontalCheck(numRow, numCol, player) || verticalCheck(numRow, numCol, player) || rightDiagonalCheck(numRow, numCol, player) || leftDiagonalCheck(numRow, numCol, player));
}

function isTie() {
    for (let i = 0; i < dim; i++) {
        for (let e = 0; e < dim; e++) {
            if (boardTTC[i][e] === none) {
                return false;
            }
        }
    }
    document.getElementById("turnTTC").innerHTML = "Han empatado!"
    document.getElementById("turnTTCAI").innerHTML = "Han empatado!"
    return true;
}

function play(numRow, numCol) {
    if (!gameOver) {
        if (boardTTC[numRow][numCol] == none) {
            boardTTC[numRow][numCol] = turn;
            if (turn == p1) {
                document.getElementById("p" + numRow + numCol).style.backgroundImage = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201%201%22%3E%3Ccircle%20cx%3D%220.5%22%20cy%3D%220.5%22%20r%3D%220.4%22%20fill%3D%22none%22%20stroke-width%3D%220.1%22%20stroke%3D%22blue%22%2F%3E%3C%2Fsvg%3E')";
            } else {
                document.getElementById("p" + numRow + numCol).style.backgroundImage = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201%201%22%3E%3Cline%20x1%3D%220.1%22%20y1%3D%220.1%22%20x2%3D%220.9%22%20y2%3D%220.9%22%20stroke-width%3D%220.1%22%20stroke%3D%22red%22%2F%3E%3Cline%20x1%3D%220.1%22%20y1%3D%220.9%22%20x2%3D%220.9%22%20y2%3D%220.1%22%20stroke-width%3D%220.1%22%20stroke%3D%22red%22%2F%3E%3C%2Fsvg%3E')";
            }

            if (playerWon(numRow, numCol, turn)) {
                gameIsOver();
                return;
            } else {
                turnMessage();
            }
        }
        if (isTie()) {
            gameOver = true;
        }
    }
}

function checkWinner() {
    for (let i = 0; i < dim; i++) {
        for (let e = 0; e < dim; e++) {
            if (boardTTC[i][e] == p1) {
                if (playerWon(i, e, p1)) return -1;
            } else if (boardTTC[i][e] == ai) {
                if (playerWon(i, e, ai)) return 1;
            } else {
                return 2;
            }
        }
    }
    return 0;
}

function bestMoveTicTacToe() {

    let difficulty = getDifficulty();
    if (difficulty == 1) {
        for (let row = 0; row < dim; row++) {
            for (let col = 0; col < dim; col++) {
                //See the next position available
                if (boardTTC[row][col] === none) {
                    bestChoice.row = row;
                    bestChoice.col = col;
                    break;
                }
            }
        }
    } else if (difficulty == 2) {
        for (let row = 0; row < dim; row++) {
            for (let col = 0; col < dim; col++) {
                //See the next position available
                if (boardTTC[row][col] === p1) {
                    if (inBounds(row + 1, col) && boardTTC[row + 1][col] === none) {
                        bestChoice.row = row + 1;
                        bestChoice.col = col;
                        break;
                    } else if (inBounds(row, col + 1) && boardTTC[row][col + 1] === none) {
                        bestChoice.row = row;
                        bestChoice.col = col + 1;
                        break;
                    } else if (inBounds(row, col - 1) && boardTTC[row][col - 1] === none) {
                        bestChoice.row = row;
                        bestChoice.col = col - 1;
                        break;
                    } else if (inBounds(row - 1, col) && boardTTC[row - 1][col] === none)
                        bestChoice.row = row - 1;
                        bestChoice.col = col;
                        break;
                }
            }
        }
    } else {
        let bestScore = -Infinity;
        for (let row = 0; row < dim; row++) {
            for (let col = 0; col < dim; col++) {
                //See the next position available
                if (boardTTC[row][col] === none) {
                    boardTTC[row][col] = ai;
                    let score = minimax(false);
                    boardTTC[row][col] = none;
                    if (score > bestScore) {
                        bestScore = score;
                        bestChoice.row = row;
                        bestChoice.col = col;
                    }
                }
            }
        }
    }
    //After choosing the best option, AI inserts token
    boardTTC[bestChoice.row][bestChoice.col] = ai;
    document.getElementById("pS" + bestChoice.row + bestChoice.col).style.backgroundImage = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201%201%22%3E%3Cline%20x1%3D%220.1%22%20y1%3D%220.1%22%20x2%3D%220.9%22%20y2%3D%220.9%22%20stroke-width%3D%220.1%22%20stroke%3D%22red%22%2F%3E%3Cline%20x1%3D%220.1%22%20y1%3D%220.9%22%20x2%3D%220.9%22%20y2%3D%220.1%22%20stroke-width%3D%220.1%22%20stroke%3D%22red%22%2F%3E%3C%2Fsvg%3E')";
}

function max(a, b) {
    return a >= b ? a : b;
}

function min(a, b) {
    return a <= b ? a : b;
}


function minimax(isMaximizing) {

    let winner = checkWinner();
    if (winner !== 2) {
        return winner;
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let row = 0; row < dim; row++) {
            for (let col = 0; col < dim; col++) {
                if (boardTTC[row][col] === none) {
                    boardTTC[row][col] = ai;
                    let score = minimax(false);
                    boardTTC[row][col] = none;
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let row = 0; row < dim; row++) {
            for (let col = 0; col < dim; col++) {
                if (boardTTC[row][col] === none) {
                    boardTTC[row][col] = p1;
                    let score = minimax(true);
                    boardTTC[row][col] = none;
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

function playAI(numRow, numCol) {
    if (!gameOver) {
        if (boardTTC[numRow][numCol] == none) {
            boardTTC[numRow][numCol] = turn;
            document.getElementById("pS" + numRow + numCol).style.backgroundImage = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201%201%22%3E%3Ccircle%20cx%3D%220.5%22%20cy%3D%220.5%22%20r%3D%220.4%22%20fill%3D%22none%22%20stroke-width%3D%220.1%22%20stroke%3D%22blue%22%2F%3E%3C%2Fsvg%3E')";

            if (playerWon(numRow, numCol, p1)) {
                gameIsOver();
                return;
            } else {
                turn = ai;
                bestMoveTicTacToe();
                if (playerWon(bestChoice.row, bestChoice.col, ai)) {
                    document.getElementById("turnTTCAI").innerHTML = "La AI te ha ganado!"
                    gameOver = true;
                    return;
                } else {
                    turn = p1;
                }
            }
        }
        if (isTie()) {
            gameOver = true;
        }
    }
}