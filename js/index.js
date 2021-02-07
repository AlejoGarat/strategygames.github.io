let /** !Array<number> */ board = [[], [], [], [], [], []];
let /*string*/ player1 = "";
let /*string*/ player2 = "";
const /*int*/ playerAI = "ai";
const /*int*/ empty = 0;
const cantRow = 6;
const cantCol = 7;
let gameEnded = false;
let activePlayer = "";
// Create an object:
let bestMove = { row: 0, col: 0 };

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


/* @CODE 2 players */

function makeVisible(section) {
    document.getElementById("home").style.display = "none";

    if (section === 'connectFourOptions') {
        document.getElementById(section).style.display = "block";
        document.getElementById("ticTacToeOptions").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("gameAI").style.display = "none";
        document.getElementById("ticTacToe1v1").style.display = "none";
        document.getElementById("ticTacToeAI").style.display = "none";


    } else if (section === 'ticTacToeOptions') {
        document.getElementById(section).style.display = "block";
        document.getElementById("connectFourOptions").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("gameAI").style.display = "none";
        document.getElementById("ticTacToe1v1").style.display = "none";
        document.getElementById("ticTacToeAI").style.display = "none";
    } else if (section === 'game') {
        document.getElementById(section).style.display = "block";
        document.getElementById("connectFourOptions").style.display = "none";
        document.getElementById("ticTacToeOptions").style.display = "none";
        document.getElementById("gameAI").style.display = "none";
        document.getElementById("ticTacToe1v1").style.display = "none";
        document.getElementById("ticTacToeAI").style.display = "none";
        player1 = prompt("Ingrese nombre del jugador rojo");
        player2 = prompt("Ingrese nombre del jugador amarillo");
    } else if (section === 'gameAI') {
        document.getElementById(section).style.display = "block";
        document.getElementById("connectFourOptions").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("ticTacToeOptions").style.display = "none";
        document.getElementById("ticTacToe1v1").style.display = "none";
        document.getElementById("ticTacToeAI").style.display = "none";
        player1 = prompt("Ingrese nombre del jugador");
    } else if (section === 'ticTacToeAI') {
        document.getElementById(section).style.display = "block";
        document.getElementById("connectFourOptions").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("gameAI").style.display = "none";
        document.getElementById("ticTacToe1v1").style.display = "none";
        document.getElementById("ticTacToeOptions").style.display = "none";
        p1 = prompt("Ingrese nombre del jugador con círculo.");
    } else if (section === 'ticTacToe1v1') {
        document.getElementById(section).style.display = "block";
        document.getElementById("connectFourOptions").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("gameAI").style.display = "none";
        document.getElementById("ticTacToeOptions").style.display = "none";
        document.getElementById("ticTacToeAI").style.display = "none";
        p1 = prompt("Ingrese nombre del jugador con círculo.");
        p2 = prompt("Ingrese nombre del jugador con cruz.");
    }
}

function loadBoard() {
    for (let row = 0; row < cantRow; row++) {
        document.writeln("<tr>");
        for (let col = 0; col < cantCol; col++) {
            document.writeln("<td id='pos" + row + col + "' class='boardPos'></td>")
            board[row][col] = empty;
        }
        document.writeln("</tr>")
    }
}

function loadBoardAI() {
    for (let row = 0; row < cantRow; row++) {
        document.writeln("<tr>");
        for (let col = 0; col < cantCol; col++) {
            document.writeln("<td id='pos_" + row + col + "' class='boardPos'></td>")
            board[row][col] = empty;
        }
        document.writeln("</tr>")
    }
}

function startGame() {
    player1 = prompt("Enter name of player 1: ");
    player2 = prompt("Enter name of player 2: ");
    activePlayer = player1;
    document.getElementById("turn").innerHTML = "Turno de: " + activePlayer;
    document.getElementById("turn").style.color = "red";
    for (let i = 0; i < cantRow; i++) {
        for (let e = 0; e < cantCol; e++) {
            board[row][col] = empty;
            document.getElementById("pos" + row + col).style.backgroundColor = "white";
            document.getElementById("pos_" + row + col).style.backgroundColor = "white";
        }
    }
    gameEnded = false;
}

function startGameAI() {
    player1 = prompt("Enter your name: ");
    activePlayer = player1;
    document.getElementById("turnAI").innerHTML = "Turno de: " + activePlayer;
    document.getElementById("turnAI").style.color = "red";
    gameEnded = false;
}

function checkHorizontal(board, numRow, numCol) {
    let counter = 0;
    let rivalToken = false;

    /*Checking right to left*/
    for (let col = numCol; col < cantCol && !rivalToken; col++) {
        if (board[numRow][col] === activePlayer) {
            counter++;
        } else {
            rivalToken = true;
        }
    }
    /*Checking left to right if necessary*/
    if (counter === 4) {
        return true;
    } else {
        counter -= 1;
        rivalToken = false;
        for (let col = numCol; col >= 0 && !rivalToken; col--) {
            if (board[numRow][col] === activePlayer) {
                counter++;
            } else {
                rivalToken = true;
            }
        }
    }
    if (counter === 4) return true;
    return false;
}

function checkVertical(board, numRow, numCol) {
    let counter = 0;
    let rivalToken = false;

    /*Checking from top to bottom*/
    for (let row = numRow; row < cantRow && !rivalToken; row++) {
        if (board[row][numCol] === activePlayer) {
            counter++;
        } else {
            rivalToken = true;
        }
    }
    /*Checking from bottom to top if necessary*/
    if (counter === 4) {
        return true;
    } else {
        counter -= 1;
        rivalToken = false;
        for (let row = numRow; row >= 0 && !rivalToken; row--) {
            if (board[row][numCol] === activePlayer) {
                counter++;
            } else {
                rivalToken = true;
            }
        }
    }
    if (counter === 4) return true;
    return false;
}

function validPos(numRow, numCol) {
    return (numRow >= 0 && numCol >= 0 && numRow < cantRow && numCol < cantCol);
}

function checkRightDiagonal(board, numRow, numCol) {
    let counter = 0;
    let rivalToken = false;

    /*Checking from top to bottom*/
    for (let i = 0; i < 4 && validPos(numRow + i, numCol - i) && !rivalToken; i++) {
        if (board[numRow + i][numCol - i] === activePlayer) {
            counter++;
        } else {
            rivalToken = true;
        }
    }

    /*Checking from bottom to top if necessary*/
    if (counter === 4) return true;
    counter -= 1;
    rivalToken = false;

    for (let i = 0; i < 4 && validPos(numRow - i, numCol + i) && !rivalToken; i++) {
        if (board[numRow - i][numCol + i] === activePlayer) {
            counter++;
        } else {
            rivalToken = true;
        }
    }

    if (counter === 4) return true;
    return false;
}

function checkLeftDiagonal(board, numRow, numCol) {
    let counter = 0;
    let rivalToken = false;

    /*Checking from top to bottom*/
    for (let i = 0; i < 4 && validPos(numRow + i, numCol + i) && !rivalToken; i++) {
        if (board[numRow + i][numCol + i] === activePlayer) {
            counter++;
        } else {
            rivalToken = true;
        }
    }

    /*Checking from bottom to top if necessary*/
    if (counter === 4) return true;
    counter -= 1;
    rivalToken = false;

    for (let i = 0; i < 4 && validPos(numRow - i, numCol - i) && !rivalToken; i++) {
        if (board[numRow - i][numCol - i] === activePlayer) {
            counter++;
        } else {
            rivalToken = true;
        }
    }

    if (counter === 4) return true;
    return false;
}

/*Checks if someone won the game */
function activePlayerWon(board, numRow, numCol) {
    return checkHorizontal(board, numRow, numCol) || checkVertical(board, numRow, numCol) || checkRightDiagonal(board, numRow, numCol) || checkLeftDiagonal(board, numRow, numCol);
}

function restartGame() {
    activePlayer = player1;
    gameEnded = false;
    for (let row = 0; row < cantRow; row++) {
        for (let col = 0; col < cantCol; col++) {
            board[row][col] = empty;
            document.getElementById("pos" + row + col).style.backgroundColor = "white";
            document.getElementById("pos_" + row + col).style.backgroundColor = "white";
            document.getElementById("turnAI").innerHTML = "Turno de: " + activePlayer;
            document.getElementById("turnAI").style.color = "red";
        }
    }
}

function endGame() {
    alert(activePlayer + " ha ganado!");
    gameEnded = true;
}

function sendMessage(activePlayer) {
    document.getElementById("turn").innerHTML = "Turno del jugador: " + activePlayer;
    if (activePlayer === player1) {
        document.getElementById("turn").style.color = "red";
    } else {
        document.getElementById("turn").style.color = "yellow";
    }
}

function isFull() {
    for (let i = 0; i < cantRow; i++) {
        for (let e = 0; e < cantCol; e++) {
            if (board[i][e] === empty) {
                return false;
            }
        }
    }
    alert("Han empatado!");
    return true;
}

/*Principal function 2 players */
function dropToken(numCol) {

    if (!gameEnded) {
        let foundPos = false;
        let numRow = 0;
        for (let row = cantRow - 1; row >= 0 && !foundPos; row--) {
            if (board[row][numCol] === empty) {
                board[row][numCol] = activePlayer;
                if (activePlayer === player1) {
                    document.getElementById("pos" + row + numCol).style.backgroundColor = "red";
                } else {
                    document.getElementById("pos" + row + numCol).style.backgroundColor = "yellow";
                }
                numRow = row;
                foundPos = true;
            }
        }

        if (foundPos) {
            if (activePlayerWon(board, numRow, numCol)) {
                endGame();
            } else {
                if (activePlayer === player1) {
                    activePlayer = player2;
                } else {
                    activePlayer = player1;
                }
                sendMessage(activePlayer);
            }
        } else {
            alert("¡Columna llena!");
        }

        if (isFull()) gameEnded = true;
    }
}

/*Principal function AI */
function dropTokenAI(numCol) {
    if (!gameEnded || isFull()) {
        let foundPos = false;
        let numRow = 0;
        for (let row = cantRow - 1; row >= 0 && !foundPos; row--) {
            if (board[row][numCol] === empty) {
                board[row][numCol] = activePlayer;
                document.getElementById("pos_" + row + numCol).style.backgroundColor = "red";
                numRow = row;
                foundPos = true;
            }
        }

        if (foundPos) {
            if (activePlayerWon(board, numRow, numCol)) {
                endGame();
            } else {
                activePlayer = playerAI;
                bestMoveAI(numRow, numCol);
                if (activePlayerWon(board, bestMove.row, bestMove.col)) {
                    document.getElementById("turnAI").innerHTML = "¡AI te ha derrotado!"
                    endGame();
                } else {
                    activePlayer = player1;
                }
            }
        } else {
            alert("¡Columna llena!")
        }
    }
}

function bestMoveAI(numRow, numCol) {
    if (validPos(numRow - 1, numCol) && board[numRow - 1][numCol] === empty && validPos(numRow + 1, numCol) && board[numRow + 1][numCol] == player1) {
        bestMove.row = numRow - 1;
        bestMove.col = numCol;
    } else if (validPos(numRow, numCol + 1) && board[numRow][numCol + 1] === empty) {
        for (let row = (cantRow - 1); row >= numRow; row--) {
            if (board[row][numCol + 1] === empty) {
                bestMove.row = row;
                bestMove.col = numCol + 1;
                break;
            }
        }
    } else if (validPos(numRow, numCol - 1) && board[numRow][numCol - 1] === empty) {
        for (let row = (cantRow - 1); row >= numRow; row--) {
            if (board[row][numCol - 1] === empty) {
                bestMove.row = row;
                bestMove.col = numCol - 1;
                break;
            }
        }
    } else {
        for (let col = 0; col < cantCol; col++) {
            for (let row = cantRow - 1; row >= 0; row--) {
                if (board[row][col] === empty) {
                    bestMove.row = row;
                    bestMove.col = col;
                    break;
                }
            }
        }
    }
    //After choosing the best option, AI inserts token
    board[bestMove.row][bestMove.col] = playerAI;
    document.getElementById("pos_" + bestMove.row + bestMove.col).style.backgroundColor = "black";
}


/*CODE TIC TAC TOE */

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
    turn = p1;
    for (let i = 0; i < dim; i++) {
        for (let e = 0; e < dim; e++) {
            boardTTC[i][e] = none;
        }
    }
    document.getElementById("turnTTC").innerHTML = "Turno de: " + turn;
}

function restartGameTTC() {
    gameOver = false;
    turn = p1;
    for (let i = 0; i < dim; i++) {
        for (let e = 0; e < dim; e++) {
            boardTTC[i][e] = none;
            document.getElementById("p" + i + e).style.backgroundImage = "";
            document.getElementById("pS" + i + e).style.backgroundImage = "";
        }
    }
    document.getElementById("turnTTC").innerHTML = "Turno de:" + turn;
}

function startGameTTCAI() {
    gameOver = false;
    turn = p1;
    for (let i = 0; i < dim; i++) {
        for (let e = 0; e < dim; e++) {
            boardTTC[i][e] = none;
        }
    }
}

function gameIsOver() {
    alert(turn + " ha ganado!");
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
    alert("Han empatado!");
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

let boardP1 = [['', '', ''],
['', '', ''],
['', '', '']];

function bestMoveTicTacToe() {

    let difficulty = getDifficulty();

    if (difficulty == 1) {
        for (let row = 0; row < dim; row++) {
            for (let col = 0; col < dim; col++) {
                //See the next position available
                if (row == 0 && col == 2 && boardTTC[row][col] == none) {
                    bestChoice.row = 0;
                    bestChoice.col = 2;
                    break;
                } else if (boardTTC[row][col] === p1 && inBounds(row + 1, col) && boardTTC[row + 1][col] === none) {
                    bestChoice.row = row + 1;
                    bestChoice.col = col;
                    break;
                } else if (row == 0 && col == 0 && boardTTC[row][col] == none) {
                    bestChoice.row = 0;
                    bestChoice.col = 0;
                    break;
                } else if (boardTTC[row][col] === p1 && inBounds(row, col + 1) && boardTTC[row][col + 1] === none) {
                    bestChoice.row = row;
                    bestChoice.col = col + 1;
                    break;
                } else if (row == 2 && col == 0 && boardTTC[row][col] == none) {
                    bestChoice.row = 2;
                    bestChoice.col = 0;
                    break;
                } else if (boardTTC[row][col] === p1 && inBounds(row, col - 1) && boardTTC[row][col - 1] === none) {
                    bestChoice.row = row;
                    bestChoice.col = col - 1;
                    break;
                } else if (row == 2 && col == 2 && boardTTC[row][col] == none) {
                    bestChoice.row = 2;
                    bestChoice.col = 2;
                    break;

                } else if (boardTTC[row][col] === p1 && inBounds(row - 1, col) && boardTTC[row - 1][col] === none) {
                    bestChoice.row = row - 1;
                    bestChoice.col = col;
                    break;
                }
            }
        }
    } else if (difficulty == 2) {

        for (let i = 0; i < dim; i++) {
            for (let e = 0; e < dim; e++) {
                if (boardTTC[i][e] == p1) {
                    if (inBounds(i, e + 1) && boardTTC[i][e + 1] == p1 && inBounds(i, e + 2) && boardTTC[i][e + 2] == none) {
                        bestChoice.row = i;
                        bestChoice.col = e + 2;
                        break;
                    } else if (inBounds(i, e - 1) && boardTTC[i][e - 1] == p1 && inBounds(i, e - 2) && boardTTC[i][e - 2] == none) {
                        bestChoice.row = i;
                        bestChoice.col = e - 2;
                        break;
                    } else if (inBounds(i + 1, e) && boardTTC[i + 1][e] == p1 && inBounds(i + 2, e) && boardTTC[i + 2][e] == none) {
                        bestChoice.row = i + 2;
                        bestChoice.col = e;
                        break;
                    } else if (inBounds(i - 1, e) && boardTTC[i - 1][e] == p1 && inBounds(i - 2, e) && boardTTC[i - 2][e] == none) {
                        bestChoice.row = i - 2;
                        bestChoice.col = e;
                        break;
                    } else if (inBounds(i + 1, e + 1) && boardTTC[i + 1][e + 1] == p1 && inBounds(i + 2, e + 2) && boardTTC[i + 2][e + 2] == none) {
                        bestChoice.row = i + 2;
                        bestChoice.col = e + 2;
                        break;
                    }
                    else if (inBounds(i - 1, e - 1) && boardTTC[i - 1][e - 1] == p1 && inBounds(i - 2, e - 2) && boardTTC[i - 2][e - 2] == none) {
                        bestChoice.row = i - 2;
                        bestChoice.col = e - 2;
                        break;
                    }
                    else if (inBounds(i + 1, e - 1) && boardTTC[i + 1][e - 1] == p1 && inBounds(i + 2, e - 2) && boardTTC[i + 2][e - 2] == none) {
                        bestChoice.row = i + 2;
                        bestChoice.col = e - 2;
                        break;
                    }
                    else if (inBounds(i - 1, e + 1) && boardTTC[i - 1][e + 1] == p1 && inBounds(i - 2, e + 2) && boardTTC[i - 2][e + 2] == none) {
                        bestChoice.row = i - 2;
                        bestChoice.col = e + 2;
                        break;
                    }
                } else {
                    if (inBounds(i - 1, e) && boardTTC[i - 1][e] === none) {
                        bestChoice.row = i - 1;
                        bestChoice.col = e;
                        break;
                    } else if (inBounds(i, e + 1) && boardTTC[i][e + 1] === none) {
                        bestChoice.row = i;
                        bestChoice.col = e + 1;
                        break;
                    } else if (inBounds(i, e - 1) && boardTTC[i][e - 1] === none) {
                        bestChoice.row = i;
                        bestChoice.col = e - 1;
                        break;
                    } else if (inBounds(i + 1, e) && boardTTC[i + 1][e] === none) {
                        bestChoice.row = i + 1;
                        bestChoice.col = e;
                        break;
                    }
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
                    if (score >= bestScore) {
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
                    alert("La AI te ha ganado!");
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