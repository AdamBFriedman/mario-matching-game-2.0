import { useState } from 'react';
import './App.css';
import { gameCards } from './gameCards';
import PiranhaPlant from '../src/images/piranhaPlant.png';
import OneOne from '../src/images/oneOne.png';
import EightFour from '../src/images/eightFour.png';
import BulletBills from '../src/images/bulletBills.png';
import MarioFireball from '../src/images/marioFireball.png';
import gameOver from '../src/images/gameOver.gif';
import gameOverAudio from '../src/audio/gameOver.mp3';
import styled from 'styled-components';

const optionsList = [
  { value: 'none', display: 'None' },
  { value: 'oneOne', display: '1-1' },
  { value: 'eightFour', display: '8-4' },
  { value: 'piranha', display: 'Piranha' },
  { value: 'bulletBills', display: 'Bullet Bill' },
  { value: 'marioFireball', display: 'Mario Fireball' },
];

const originalGameBoard = gameCards
  .concat(gameCards)
  .sort(() => 0.5 - Math.random());

function App() {
  // Double the size of the grid
  const gameGrid = originalGameBoard;
  let firstGuess = '';
  let secondGuess = '';
  let count = 0;
  let previousTarget = null;
  let delay = 1200;

  const [guessCount, setGuessCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach((card) => {
      card.classList.add('match');
    });
    setMatchCount((prev) => prev + 1);
    if (matchCount === 11) {
      setIsGameOver(true);
      const audio = document.getElementById('gameOverAudio');
      audio.play();
    }
  };

  const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    selected.forEach((card) => {
      card.classList.remove('selected');
    });
    setGuessCount((prev) => prev + 1);
  };

  const handleClick = (event) => {
    const clicked = event.target;

    if (
      clicked.nodeName === 'SECTION' ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains('selected') ||
      clicked.parentNode.classList.contains('match')
    ) {
      return;
    }

    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
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

  const [background, setBackground] = useState('none');

  const handleSelect = (event) => {
    setBackground(event.target.value);
  };

  return (
    <StyledGameWrapper background={background}>
      <StyledGuessCount>Guess Count: {guessCount}</StyledGuessCount>
      <StyledLabel htmlFor="background">
        Choose a background:
      </StyledLabel>

      <StyledSelect
        name="background"
        id="background"
        onChange={handleSelect}
      >
        {optionsList.map((option) => (
          <option key={option.value} value={option.value}>
            {option.display}
          </option>
        ))}
      </StyledSelect>
      {isGameOver ? (
        <StyledGameOverWrapper>
          <StyledGameOver>You are the winner!</StyledGameOver>

          <img src={gameOver} alt="Game over" />
          <audio id="gameOverAudio">
            <source src={gameOverAudio} type="audio/mpeg" />
          </audio>

          <StyledReload onClick={() => window.location.reload()}>
            Restart?
          </StyledReload>
        </StyledGameOverWrapper>
      ) : (
        <>
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
          <button onClick={() => window.location.reload()}>
            Restart
          </button>
        </>
      )}
    </StyledGameWrapper>
  );
}

const StyledGameWrapper = styled.div`
  height: 100vh;
  padding: 3em;
  background: black;
  background-size: 100% 100%;
  background-image: ${({ background }) =>
    background === 'piranha'
      ? `url(${PiranhaPlant})`
      : background === 'marioFireball'
      ? `url(${MarioFireball})`
      : background === 'bulletBills'
      ? `url(${BulletBills})`
      : background === 'oneOne'
      ? `url(${OneOne})`
      : background === 'eightFour'
      ? `url(${EightFour})`
      : 'none'};
`;

const StyledGuessCount = styled.h1`
  color: white;
  margintop: 0;
`;

const StyledLabel = styled.label`
  color: white;
  margin-right: 1em;
  font-size: 1.5em;
`;

const StyledSelect = styled.select`
  padding: 0.5em;
  font-size: 1.5em;
  font-family: 'New Super Mario Font U', sans-serif;
`;

const StyledGameOverWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80%;
`;

const StyledGameOver = styled.h1`
  color: white;
  font-size: 3em;
`;

const StyledReload = styled.h1`
  color: white;
  cursor: pointer;
  font-size: 3em;
`;

export default App;
