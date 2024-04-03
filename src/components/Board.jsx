import Strike from "./Strike";
import Tile from "./Tile";

function Board({ tiles, onTileClick, playerTurn, strikeClass }) {
  // Funzione per generare dinamicamente le caselle del tabellone
  const renderTiles = () => {
    const tileComponents = [];

    for (let i = 0; i < 9; i++) {
      let classNames = "";

      // Aggiunge le classi per i bordi delle caselle
      if (i % 3 !== 2) classNames += "right-border ";
      if (Math.floor(i / 3) !== 2) classNames += "bottom-border ";

      tileComponents.push(
        <Tile
          key={i}
          playerTurn={playerTurn}
          onClick={() => onTileClick(i)}
          value={tiles[i]}
          className={classNames.trim()}
        />
      );
    }

    return tileComponents;
  };

  return (
    <div className="board">
      {renderTiles()}
      <Strike strikeClass={strikeClass} />
    </div>
  );
}

export default Board;
