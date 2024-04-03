import Strike from "./Strike";
import Tile from "./Tile";

function Board({ tiles, onTileClick, playerTurn, strikeClass }) {
  // Funzione per rendere un singolo Tile
  const renderTile = (index, classNames = "") => (
    <Tile
      key={index}
      playerTurn={playerTurn}
      onClick={() => onTileClick(index)}
      value={tiles[index]}
      className={classNames}
    />
  );

  return (
    <div className="board">
      {[0, 1, 2].map((riga) => (
        <div key={riga} className="riga-board">
          {[0, 1, 2].map((colonna) => {
            const index = riga * 3 + colonna;
            let classNames = "";
            // Aggiunge la classe per il bordo inferiore se non è l'ultima riga
            if (riga < 2) classNames += "bordo-inferiore ";
            // Aggiunge la classe per il bordo destro se non è l'ultima colonna
            if (colonna < 2) classNames += "bordo-destro ";
            // Rende il Tile con le classi dei bordi
            return renderTile(index, classNames.trim());
          })}
        </div>
      ))}
      <Strike strikeClass={strikeClass} />
    </div>
  );
}

export default Board;
