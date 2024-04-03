import GameState from "./GameState";

function Reset({ gameState, onReset }) {
  // Verifica se la partita è ancora in corso, se sì, non mostra nulla
  if (gameState === GameState.inProgress) {
    return null;
  }
  
  // Se la partita è finita, mostra il pulsante per giocare di nuovo
  return (
    <button onClick={onReset} className="reset-button">
      Gioca di nuovo
    </button>
  );
}

export default Reset;
