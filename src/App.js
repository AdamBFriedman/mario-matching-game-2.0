import "./App.css";
import gameCards from "./gameCards.json";

function App() {
  return (
    <section className="grid">
      {gameCards.map((card) => (
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
