import "./App.css";
import gameCards from "./gameCards.json";

function App() {
  const gameGrid = gameCards.concat(gameCards).sort(() => 0.5 - Math.random());
  return (
    <section className="grid">
      {gameGrid.map((card) => (
        <div data-name={card.name} className="card">
          {card.name}
          <div className="front"></div>
          <div className="back"></div>
        </div>
      ))}
    </section>
  );
}

export default App;
