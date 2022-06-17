import { useState } from "react";
import "./App.css";
import { gameCards } from "./gameCards";
import PiranhaPlant from "../src/images/piranhaPlant.png"
import OneOne from "../src/images/oneOne.png"
import EightFour from "../src/images/eightFour.png"
import BulletBills from "../src/images/bulletBills.png"
import MarioFireball from "../src/images/marioFireball.png"


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

  const [background, setBackground] = useState("none");

  const handleSelect = (event) => {
    setBackground(event.target.value);
  };

  return (
    <div
      style={{
        height: "100vh",
        padding: "3em",
        background: "black",
        backgroundSize: "100% 100%",
        backgroundImage: background === "piranha" ? `url(${PiranhaPlant})` : background === "marioFireball" ? `url(${MarioFireball})` : background === "bulletBills" ? `url(${BulletBills})` : background === "oneOne" ? `url(${OneOne})` : background === "eightFour" ? `url(${EightFour})` : "none" ,
      }}
    >
      <h1 style={{ color: "white", marginTop: 0 }}>Guess Count: {guessCount}</h1>
      <label
        style={{ color: "white", marginRight: "1em" }}
        for="background"
      >
        Choose a background:
      </label>

      <select name="background" id="background" onChange={handleSelect}>
        <option value="none">None</option>
        <option value="oneOne">1-1</option>
        <option value="eightFour">8-4</option>
        <option value="piranha">Piranha</option>
        <option value="bulletBills">Bullet Bill</option>
        <option value="marioFireball">Mario Fireball</option>
      </select>

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
            <div className="front"></div>
            <div
              className="back"
              style={{ backgroundImage: `url(${card.image})` }}
            ></div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
