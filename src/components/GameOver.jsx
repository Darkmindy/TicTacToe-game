import GameState from "./GameState";

function GameOver({ gameState }) {
  // Definizione delle costanti per i messaggi di vittoria
  const winMessages = {
    [GameState.playerOWins]: "⭕️ ha vinto!",
    [GameState.playerXWins]: "❌ ha vinto!",
    [GameState.draw]: "Pareggio"
  };

  // Verifica se lo stato di gioco è una vittoria o un pareggio
  const isGameOver = gameState === GameState.playerOWins || gameState === GameState.playerXWins || gameState === GameState.draw;

  // Se non è finita la partita, non mostrare nulla
  if (!isGameOver) {
    return null;
  }

  // Se è finita la partita, mostra il messaggio appropriato
  return (
    <div className="game-over">
      {winMessages[gameState]}
    </div>
  );
}

export default GameOver;
