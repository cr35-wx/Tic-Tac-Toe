//Gameboard (TicTacToe grid) created through javascript 
((rows, cols) => {
    const gameboard = document.getElementById("board");
    gameboard.style.setProperty("--grid-cols", cols);
    gameboard.style.setProperty("--grid-rows", rows);
    for (c = 0 ; c < (rows * cols) ; c++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        gameboard.appendChild(cell);
    }
})(3, 3)


const Player = (name, mark) => {
    return {name, mark}
}
const player1 = Player(null, "x");
const player2 = Player(null, "o")


const gameBoard = (() => {
    
    const _playerInputDisplay = document.getElementById("players");
    const _firstPlayerInput = document.getElementById("player-one");
    const _secondPlayerInput = document.getElementById("player-two");
    const _winningMessage = document.getElementById("winning-message");
    const _gameBoard = document.querySelectorAll(".cell");
    let currentClass = player1.mark
    
    const startGame = (e) => {
        e.preventDefault();
        player1.name = _firstPlayerInput.value;
        player2.name = _secondPlayerInput.value;
        if (player1.name === "" || player2.name === "") {
            return
        }
        _playerInputDisplay.classList.add("hide");
        document.getElementById("board").classList.add("show");
        
    }
    
    const placeMark = (e) => {
        let cell = e.target
        cell.classList.add(currentClass)
        game.checkWin()
        game.checkDraw()
        _swapPlayer()
    }
    const _swapPlayer = () => {
        currentClass === player1.mark ? currentClass = player2.mark : currentClass = player1.mark
    }
    
    const resetGameBoard = () => {
        _gameBoard.forEach(cell => {
            cell.classList.contains("x") ? cell.classList.remove("x") : cell.classList.remove("o");
            cell.removeEventListener("click", placeMark);
            cell.addEventListener("click", placeMark, { once: true })
        })
        currentClass = player1.mark;
        _winningMessage.classList.remove("show");
    }
    
    
    _gameBoard.forEach(cell => {
        cell.addEventListener("click", placeMark, { once: true })
    })
    
    document.getElementById("submit-players").addEventListener("click", startGame);
    document.getElementById("restartButton").addEventListener("click", resetGameBoard);
})()


const game = (() => {
    const _winningMessage = document.getElementById("winning-message");
    const _gameBoard = document.querySelectorAll(".cell");
    const _winnerText = document.getElementById("winner-text");
    
    let winner = ""
    const checkWin = () => {
        
        if (_gameBoard[0].classList.contains("x") && _gameBoard[1].classList.contains("x") && _gameBoard[2].classList.contains("x") || 
        _gameBoard[3].classList.contains("x") && _gameBoard[4].classList.contains("x") && _gameBoard[5].classList.contains("x") || 
        _gameBoard[6].classList.contains("x") && _gameBoard[7].classList.contains("x") && _gameBoard[8].classList.contains("x") ||
        _gameBoard[0].classList.contains("x") && _gameBoard[3].classList.contains("x") && _gameBoard[6].classList.contains("x") ||
        _gameBoard[1].classList.contains("x") && _gameBoard[4].classList.contains("x") && _gameBoard[7].classList.contains("x") || 
        _gameBoard[2].classList.contains("x") && _gameBoard[5].classList.contains("x") && _gameBoard[8].classList.contains("x") ||
        _gameBoard[0].classList.contains("x") && _gameBoard[4].classList.contains("x") && _gameBoard[8].classList.contains("x") ||
        _gameBoard[2].classList.contains("x") && _gameBoard[4].classList.contains("x") && _gameBoard[6].classList.contains("x")) {
            winner = player1;
            showWinner()
        } else if (_gameBoard[0].classList.contains("o") && _gameBoard[1].classList.contains("o") && _gameBoard[2].classList.contains("o") || 
        _gameBoard[3].classList.contains("o") && _gameBoard[4].classList.contains("o") && _gameBoard[5].classList.contains("o") || 
        _gameBoard[6].classList.contains("o") && _gameBoard[7].classList.contains("o") && _gameBoard[8].classList.contains("o") ||
        _gameBoard[0].classList.contains("o") && _gameBoard[3].classList.contains("o") && _gameBoard[6].classList.contains("o") ||
        _gameBoard[1].classList.contains("o") && _gameBoard[4].classList.contains("o") && _gameBoard[7].classList.contains("o") || 
        _gameBoard[2].classList.contains("o") && _gameBoard[5].classList.contains("o") && _gameBoard[8].classList.contains("o") ||
        _gameBoard[0].classList.contains("o") && _gameBoard[4].classList.contains("o") && _gameBoard[8].classList.contains("o") ||
        _gameBoard[2].classList.contains("o") && _gameBoard[4].classList.contains("o") && _gameBoard[6].classList.contains("o")) {
            winner = player2
            showWinner()
        }
    }  //fix this
    
    const checkDraw = () => {
        let isGameBoardFull 
        let gameBoardArray = Array.from(_gameBoard) 
        if (gameBoardArray.every(cell=> cell.classList.contains("x") || cell.classList.contains("o"))) {
            isGameBoardFull = true
            winner = null
        } else {
            isGameBoardFull = false
        }
        if (isGameBoardFull === true) {
            checkWin()
            showWinner()
        }
    } 
    
    const showWinner = () => {
        winner === player1 ? _winnerText.innerHTML =  `${player1.name} Wins!` : winner === player2 ? 
        _winnerText.innerHTML = `${player2.name} Wins!` : _winnerText.innerHTML = "Draw!"
        _winningMessage.classList.add("show");
    }
    
    return { checkWin, checkDraw } 
})()





















//end notes
//maybe at the end i can upload to github then add an option  for players to choose their mark (with their name), x or o then upload that to github 
//as an unapproved version (?)