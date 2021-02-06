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
        

    }else if (section === 'ticTacToeOptions') {
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
    } else if (section === 'gameAI') {
        document.getElementById(section).style.display = "block";
        document.getElementById("connectFourOptions").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("ticTacToeOptions").style.display = "none";
        document.getElementById("ticTacToe1v1").style.display = "none";
        document.getElementById("ticTacToeAI").style.display = "none";
    } else if (section === 'ticTacToeAI') {
        document.getElementById(section).style.display = "block";
        document.getElementById("connectFourOptions").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("gameAI").style.display = "none";
        document.getElementById("ticTacToe1v1").style.display = "none";
        document.getElementById("ticTacToeOptions").style.display = "none";
    } else if (section === 'ticTacToe1v1') {
        document.getElementById(section).style.display = "block";
        document.getElementById("connectFourOptions").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("gameAI").style.display = "none";
        document.getElementById("ticTacToeOptions").style.display = "none";
        document.getElementById("ticTacToeAI").style.display = "none";
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
    gameEnded = true;
    for (let row = 0; row < cantRow; row++) {
        for (let col = 0; col < cantCol; col++) {
            board[row][col] = empty;
            document.getElementById("pos" + row + col).style.backgroundColor = "white";
            document.getElementById("pos_" + row + col).style.backgroundColor = "white";
            document.getElementById("turn").innerHTML = "";
            document.getElementById("turnAI").innerHTML = "";
        }
    }
}

function endGame() {
    document.getElementById("turn").innerHTML = activePlayer + " has won!";
    document.getElementById("turnAI").innerHTML = activePlayer + " has won!";
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
    document.getElementById("turn").innerHTML = "Han empatado!"
    document.getElementById("turnAI").innerHTML = "Han empatado!"
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
            alert("The column is full")
        }

        if(isFull()) gameEnded = true;
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

function cloneBoard() {
    let /** !Array<number> */ clone = [[], [], [], [], [], []];
    for (let i = 0; i < cantRow; i++) {
        for (let e = 0; e < cantCol; e++) {
            clone[i][e] = board[i][e];
        }
    }
    return clone;
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


