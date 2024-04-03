import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import gameOverSoundAsset from "../sounds/game_over.wav";
import clickSoundAsset from "../sounds/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const PLAYER_X = "❌";
const PLAYER_O = "⭕️";

const winningCombinations = [
  // Righe
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  // Colonne
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  // Diagonali
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles) {
  for (const { combo, strikeClass } of winningCombinations) {
    const [tile1, tile2, tile3] = combo.map((index) => tiles[index]);

    if (tile1 && tile1 === tile2 && tile1 === tile3) {
      return { winner: tile1, strikeClass };
    }
  }

  const isDraw = tiles.every((tile) => tile !== null);
  if (isDraw) {
    return { draw: true };
  }

  return null;
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeInfo, setStrikeInfo] = useState(null);
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress || tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);

    const winnerInfo = checkWinner(newTiles);
    if (winnerInfo) {
      if (winnerInfo.winner) {
        setStrikeInfo({ strikeClass: winnerInfo.strikeClass });
        setGameState(winnerInfo.winner === PLAYER_X ? GameState.playerXWins : GameState.playerOWins);
      } else {
        setGameState(GameState.draw);
      }
    } else {
      setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
    }
  };

  const handleReset = () => {
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeInfo(null);
    setGameState(GameState.inProgress);
  };

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      gameOverSound.play();
    }
  }, [gameState]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeInfo ? strikeInfo.strikeClass : null}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}

export default TicTacToe;
