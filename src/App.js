import "./App.css";
import { gameCards } from "./gameCards";

function App() {
  // Double the size of the grid
  const gameGrid = gameCards.concat(gameCards).sort(() => 0.5 - Math.random());
  let firstGuess = "";
  let secondGuess = "";
  let count = 0;
  let previousTarget = null;
  let delay = 1200;

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
    <section className="grid">
      {gameGrid.map((card) => (
        <div onClick={handleClick} data-name={card.name} className="card">
          {card.name}
          <div className="front"></div>
          <div
            className="back"
            style={{ backgroundImage: `url(${card.image})` }}
          ></div>
        </div>
      ))}
    </section>
  );
}

export default App;
