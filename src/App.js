import { useState } from "react";
import "./App.css";
import { gameCards } from "./gameCards";
const originalGameBoard = gameCards
  .concat(gameCards)
  .sort(() => 0.5 - Math.random());
function App() {
  // Double the size of the grid
  const gameGrid = originalGameBoard;
  let firstGuess = "";
  let secondGuess = "";
  let count = 0;
  let previousTarget = null;
  let delay = 1200;

  const [guessCount, setGuessCount] = useState(0);

  const match = () => {
    const selected = document.querySelectorAll(".selected");
    selected.forEach((card) => {
      card.classList.add("match");
    });
  };

  const resetGuesses = () => {
    firstGuess = "";
    secondGuess = "";
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll(".selected");
    selected.forEach((card) => {
      card.classList.remove("selected");
    });
    setGuessCount((prev) => prev + 1);
  };

  const handleClick = (event) => {
    const clicked = event.target;

    if (
      clicked.nodeName === "SECTION" ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains("selected") ||
      clicked.parentNode.classList.contains("match")
    ) {
      return;
    }

    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add("selected");
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add("selected");
      }

      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
          setTimeout(match, delay);
        }
        setTimeout(resetGuesses, delay);
      }
      previousTarget = clicked;
    }
  };

  return (
    <>
      <h1 style={{ color: "white" }}>Guess Count: {guessCount}</h1>
      <section className="grid">
        {gameGrid.map((card, index) => (
          <div
            onClick={(event) => {
              handleClick(event);
            }}
            data-name={card.name}
            key={index}
            className="card"
          >
            {card.name}
            <div className="front"></div>
            <div
              className="back"
              style={{ backgroundImage: `url(${card.image})` }}
            ></div>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
