function Tile({ className, value, onClick, playerTurn }) {
  // Determina la classe per il feedback visivo durante l'hover
  const hoverClass = value === null && playerTurn !== null ? `${playerTurn.toLowerCase()}-hover` : null;

  return (
    <div onClick={onClick} className={`tile ${className} ${hoverClass || ''}`}>
      {value}
    </div>
  );
}

export default Tile;
