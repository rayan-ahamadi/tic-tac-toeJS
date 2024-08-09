const gameBoard = (function () {
  let gameBoardArray = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]

  let playerList = []

  let player1Turn = true
  let player2Turn = false

  const draw = function (row, column, symbol, cell) {
    let symbolType = symbol.classList[0]
    let symbolClass = symbol.classList[1]
    gameBoardArray[row][column] = symbol
    cell.appendChild(document.createElement("i")).classList.add(symbolType, symbolClass)
    console.log(gameBoardArray)
  }

  const setPlayerList = function (player1, player2) {
    playerList.push(player1)
    playerList.push(player2)
  }

  const getPlayerList = function () {
    return playerList
  }

  const updatePlayerScore = function (player) { 
    player.playerScore += 1
  }

  const checkDraw = function (row, column) {

    if (row < 0 || row > 2 || column < 0 || column > 2) {
      return false
    }

    if (gameBoardArray[row][column] === " ") {
      return true
    }
    return false
  }

  const reset = function () {
    gameBoardArray = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ]
  }

  const checkWin = function (symbol1, symbol2) {
    // Player 1
    //horizontal
    for (let row = 0; row <= 2; row++) {
      if (gameBoardArray[row][0] === symbol1 && gameBoardArray[row][1] === symbol1 && gameBoardArray[row][2] === symbol1) {
        updatePlayerScore(playerList[0])
        return `${playerList[0].playerName} Won`
      }
    }

    //vertical 
    for (let column = 0; column <= 3; column++) {
      if (gameBoardArray[0][column] == symbol1 && gameBoardArray[1][column] == symbol1 && gameBoardArray[2][column] == symbol1) {
        updatePlayerScore(playerList[0])
        return `${playerList[0].playerName} Won`
      }
    }

    //diagonal
    if (gameBoardArray[0][0] == symbol1 && gameBoardArray[1][1] == symbol1 && gameBoardArray[2][2] == symbol1) {
      updatePlayerScore(playerList[0])
      return `${playerList[0].playerName} Won`
    }

    if (gameBoardArray[0][2] == symbol1 && gameBoardArray[1][1] == symbol1 && gameBoardArray[2][0] == symbol1) {
      updatePlayerScore(playerList[0])
      return `${playerList[0].playerName} Won`
    }




    // Player 2
    //horizontal
    for (let row = 0; row <= 2; row++) {
      if (gameBoardArray[row][0] === symbol2 && gameBoardArray[row][1] === symbol2 && gameBoardArray[row][2] === symbol2) {
        updatePlayerScore(playerList[1])
        return `${playerList[1].playerName} Won`
      }
    }

    //vertical 
    for (let column = 0; column <= 3; column++) {
      if (gameBoardArray[0][column] == symbol2 && gameBoardArray[1][column] == symbol2 && gameBoardArray[2][column] == symbol2) {
        updatePlayerScore(playerList[1])
        return `${playerList[1].playerName} Won`
      }
    }

    //diagonal
    if (gameBoardArray[0][0] == symbol2 && gameBoardArray[1][1] == symbol2 && gameBoardArray[2][2] == symbol2) {
      updatePlayerScore(playerList[1])
      return `${playerList[1].playerName} Won`
    }

    if (gameBoardArray[0][2] == symbol2 && gameBoardArray[1][1] == symbol2 && gameBoardArray[2][0] == symbol2) {
      updatePlayerScore(playerList[1])
      return `${playerList[1].playerName} Won`
    }

    if (gameboardFilled()) {
      return "Draw"
    }

  }

  const printGameboard = function () {
    let gameboard = ""
    gameBoardArray.forEach(row => {
      gameboard += `${row[0]} | ${row[1]} | ${row[2]}\n`
    })
    return gameboard
  }

  const returnGameboard = function () {
    return gameBoardArray
  }

  const drawPrompt = function (playerName) {
    row = prompt(`${playerName} : Enter row`)
    column = prompt(`${playerName} : Enter column`)
  }

  const gameboardFilled = function () {
    for (let row = 0; row <= 2; row++) {
      for (let column = 0; column <= 2; column++) {
        if (gameBoardArray[row][column] === " ") {
          return false
        }
      }
    }
    return true
  }

  return {
    draw,
    reset,
    checkWin,
    returnGameboard,
    printGameboard,
    checkDraw,
    drawPrompt,
    setPlayerList,
    getPlayerList,
    player1Turn,
    player2Turn,
    updatePlayerScore
  }
})()

const displayController = (function () {

  const startGame = function () {
    const gameDisplay = document.querySelector("#game")
    const formDisplay = document.querySelector("#player-form")
    formDisplay.classList.add("hidden")
    gameDisplay.classList.remove("hidden")
  }

  const createPlayer = function () {
    const player1Name = document.querySelector("#player1-name").value
    const player2Name = document.querySelector("#player2-name").value
    const player1Symbol = document.querySelector("#carousel-one .carousel-item.active > i")
    const player2Symbol = document.querySelector("#carousel-two .carousel-item.active > i")

    const player1 = player(player1Name, 1, player1Symbol, 0)
    const player2 = player(player2Name, 2, player2Symbol, 0)

    return {
      player1,
      player2
    }
  }

  const updateScore = function (player1, player2) {
    document.querySelector(`#player-one-score`).textContent = player1.playerScore
    document.querySelector(`#player-two-score`).textContent = player2.playerScore

  }


  return {
    startGame,
    createPlayer,
    updateScore
  }
})()

const player = function (name, number, symbol, score) {
  const playerName = name
  const playerNumber = number
  const playerSymbol = symbol
  let playerScore = score
  return {
    playerName,
    number,
    symbol,
    playerScore
  }
}

//let welcome = false

while (false) {
  let player1 = player("Player 1", 1, "X")
  let player2 = player("Player 2", 2, "O")


  if (!welcome) {
    alert("Welcome to Tic Tac Toe")
    welcome = true
  }

  // Player 1 turn
  gameBoard.drawPrompt(player1.playerName)
  while (!gameBoard.checkDraw(row, column)) {
    alert("Invalid Move")
    gameBoard.drawPrompt(player1.playerName)
  }
  gameBoard.draw(row, column, player1.symbol)
  alert(gameBoard.returnGameboard())
  if (gameBoard.checkWin(player1.symbol, player2.symbol)) {
    alert("Player 1 Won, Congratulations")
    gameBoard.reset()
  }

  // Player 2 turn
  gameBoard.drawPrompt(player2.playerName)
  while (!gameBoard.checkDraw(row, column)) {
    alert("Invalid Move")
    gameBoard.drawPrompt(player2.playerName)
  }
  gameBoard.draw(row, column, player2.symbol)
  alert(gameBoard.returnGameboard())
  if (gameBoard.checkWin(player1.symbol, player2.symbol)) {
    alert("Player 2 Won, Congratulations")
    gameBoard.reset()
  }
}



document.querySelector("#choice-form").addEventListener("submit", function (e) {
  e.preventDefault()

  let { player1, player2 } = displayController.createPlayer()
  gameBoard.setPlayerList(player1, player2)

  displayController.startGame()


  document.querySelector("#player-one-name").textContent = player1.playerName
  document.querySelector("#player-two-name").textContent = player2.playerName
  console.log(gameBoard.getPlayerList())


  document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", function () {
      let row = cell.getAttribute("data-row")
      let column = cell.getAttribute("data-column")
      let symbol = gameBoard.player1Turn ? player1.symbol : player2.symbol
      
      if (gameBoard.checkDraw(row, column)) {
        gameBoard.draw(row, column, symbol, cell)
        gameBoard.player1Turn = !gameBoard.player1Turn
        gameBoard.player2Turn = !gameBoard.player2Turn
      }

      document.querySelector("#player-turn").textContent = gameBoard.player1Turn ? "Player One Turn" : "Player Two Turn"
      const checkWin = gameBoard.checkWin(player1.symbol, player2.symbol)
      if (checkWin) {
        const alertWinner = document.querySelector("#alert-winner")
        alertWinner.classList.remove("hidden","d-none")
        const winnerMessage = document.createElement("h3")
        winnerMessage.textContent = checkWin === "Draw" ? `${checkWin} !` : `${checkWin}, congratulations !`
        alertWinner.insertBefore(winnerMessage, alertWinner.firstChild)

        displayController.updateScore(player1, player2)

        const resetButton = document.querySelector("#reset")
        resetButton.classList.remove("hidden")
        resetButton.addEventListener("click", function (e) {
          winnerMessage.textContent = ""
          alertWinner.classList.add("hidden")
          gameBoard.reset()
          document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = ""
          })
          e.target.classList.add("hidden")
          console.log(gameBoard.returnGameboard())
        })
        document.querySelector("#game").insertBefore(resetButton, document.querySelector(".score"))
      }
    })
  })




})


