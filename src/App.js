import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [guessedValue, setGuessValue] = useState("");
  const [guessedStaus, setGuessedStaus] = useState("");
  const [prevArr, setPrevArr] = useState([]);
  const [gameOver, setGameOver] = useState(false)
  const [gameOverText, setGameOverText] = useState("")

  useEffect(() => {
    randomNumberFunction();
    // console.log("Nipa random number: ",randomNumber);
  }, []);

  const randomNumberFunction = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1)
  }

  const handleGuess = () => {

    if (guessedValue === "") {
      return;
    } else if (guessedValue == randomNumber) {
      setGameOverText(<span style={{ color: "green" }}>!!! Congratulations !!! You Won The Game.</span>);
      setGameOver(true);
      setGuessedStaus("");
      setGuessValue("")
      return;
    } else if (guessedValue > randomNumber) {
      let arr = prevArr;
      arr.push(guessedValue);
      setPrevArr(arr)
      setGuessedStaus("Last Guess was too large")
    } else if (guessedValue < randomNumber) {
      let arr = prevArr;
      arr.push(guessedValue);
      setPrevArr(arr)
      setGuessedStaus("Last Guess was too small")
    }
    setGuessValue("")
    if (prevArr.length == 10) {
      setGameOverText(<span style={{ color: "red" }}>!!!GAME OVER!!!</span>);
      setGuessedStaus("");
      setGameOver(true);
      return;
    }
  }

  const resetGame = () => {
    randomNumberFunction();
    setGuessValue("");
    setGuessedStaus("");
    setPrevArr([]);
    setGameOver(false);
    setGameOverText("");
  }

  return (
    <div className='container'>
      <div className="App">
        <h1>Number Guessing Game</h1>

        <p>We have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.</p>
        <div style={{ margin: "20px" }}>
          <input type={"number"}
            value={guessedValue}
            disabled={gameOver}
            onChange={(e) => setGuessValue(e.target.value)}
          />
          <button onClick={handleGuess} disabled={gameOver}> Guess</button>
        </div>
      </div>


      <div style={{ marginTop: "40px", marginLeft: "30%" }}>
        <p>{prevArr.length > 0 && !gameOver && ("Previous Guesses:" +
          prevArr.map((val) => (
            val + " "
          )))
        }
        </p>
        <p style={{ color: "red" }}>{gameOver ? gameOverText : guessedStaus ? "Wrong guess" : ""}</p>
        <p>{guessedStaus}</p>
        {
          gameOver && (
            <>
              <p style={{color: "green"}}> Correct Answer is : <span style={{ fontWeight: "bold" }}>{randomNumber}</span></p>
              <br />
              <button onClick={resetGame}>Start New game</button>
            </>
          )
        }

      </div>
    </div>
  );
}

export default App;
