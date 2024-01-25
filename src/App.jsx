import Player from "./component/Player.jsx"
import GameBoard from "./component/GameBoard.jsx"
import { useState } from "react"
import Log from "./component/Log.jsx";
import { WINNING_COMBINATIONS } from "./winningCombination.js";
import GameOver from "./component/gameOver.jsx";
function getActivePlayer(gameTurn){
  let currPlayer = 'X';
  if(gameTurn.length > 0 && gameTurn[0].player === 'X'){
    currPlayer = 'O';
  }
  return currPlayer
}
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function App() {
  let winner;
  const [player, setPlayer] = useState({'X' : 'Player 1', 'O' : 'Player 2'});
  const [gameTurn, setGameTurn] = useState([]);
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  const activePlayer = getActivePlayer(gameTurn);
    for(const turn of gameTurn){
        const {position, player} = turn;
        const {row, col} = position;
        gameBoard[row][col] = player;
    }
  for(const combination of WINNING_COMBINATIONS){
    const firstCombination  = gameBoard[combination[0].row][combination[0].column]
    const secondCombination  = gameBoard[combination[1].row][combination[1].column]
    const thirdCombination  = gameBoard[combination[2].row][combination[2].column]
    console.log(firstCombination, secondCombination, thirdCombination);
    if(firstCombination && firstCombination === secondCombination && firstCombination === thirdCombination)
    {
      winner = player[firstCombination];
      console.log(player, 'playeraname');
      console.log(winner, 'winner');
    }
  }
  let isDraw =  (gameTurn.length === 9 && !winner);
  const currActive = (rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      let currPlayer = getActivePlayer(prevTurn);
      const updatedTurns =  [{position : {row : rowIndex, col: colIndex}, player: currPlayer},...prevTurn];
      return updatedTurns;
    })
    
  }
  const replayGame = () => {
    setGameTurn([]);
  }
  const handlePlayerChange = (symbol, name) => {
    setPlayer((prevPlayer) =>{return {
      ...prevPlayer,
      [symbol] : name
    };
  })
  console.log(player, 'playeraname');
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X" active={activePlayer === 'X'} onChangeName={handlePlayerChange}/>
            <Player initialName="Player 2" symbol="O" active={activePlayer === 'O'} onChangeName={handlePlayerChange}/>
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} reset = {replayGame}/>}
        <GameBoard onSelectBox ={currActive} board ={gameBoard}/>
      </div>
      <Log turns= {gameTurn}/> 
    </main>
  )
}

export default App
