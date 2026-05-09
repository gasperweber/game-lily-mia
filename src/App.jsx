import { useState, useEffect, useRef } from 'react';
import PlayerSetup from './components/PlayerSetup.jsx';
import Board from './components/Board.jsx';
import Dice from './components/Dice.jsx';
import MiniGame from './components/MiniGame.jsx';
import { BOARD_TILES } from './data/board.js';

const PLAYER_COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12'];
const PLAYER_NAMES_SHORT = ['Red','Blue','Green','Yellow'];
const LAST_TILE = BOARD_TILES[BOARD_TILES.length - 1].id;

function clamp(pos) {
  return Math.min(Math.max(pos, 0), LAST_TILE);
}

export default function App() {
  const [phase, setPhase] = useState('setup'); // setup | playing | minigame | won
  const [players, setPlayers] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [rolled, setRolled] = useState(false);
  const [prevPos, setPrevPos] = useState(0);
  const [activeTile, setActiveTile] = useState(null);
  const [notification, setNotification] = useState(null);
  const [winner, setWinner] = useState(null);
  const notifTimer = useRef(null);

  function showNotif(message, type = 'info') {
    clearTimeout(notifTimer.current);
    setNotification({ message, type });
    notifTimer.current = setTimeout(() => setNotification(null), 3500);
  }

  function startGame(playerList) {
    setPlayers(playerList);
    setCurrentIdx(0);
    setPhase('playing');
    setRolled(false);
    setDiceValue(1);
  }

  function rollDice() {
    if (rolling || rolled) return;
    setRolling(true);

    // Animate through random values
    let ticks = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      ticks++;
      if (ticks >= 12) {
        clearInterval(interval);
        const final = Math.floor(Math.random() * 6) + 1;
        setDiceValue(final);
        setRolling(false);
        setRolled(true);
        doMove(final);
      }
    }, 80);
  }

  function doMove(steps) {
    const player = players[currentIdx];
    const oldPos = player.position;
    const newPos = clamp(oldPos + steps);
    const tile = BOARD_TILES[newPos];

    setPrevPos(oldPos);
    setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: newPos } : p));

    if (newPos >= LAST_TILE) {
      // Reached finish!
      setTimeout(() => {
        setWinner(players[currentIdx]);
        setPhase('won');
      }, 400);
      return;
    }

    // Handle special tiles immediately
    if (tile.type === 'SQUID') {
      const backPos = clamp(newPos - 3);
      setTimeout(() => {
        setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: backPos } : p));
        showNotif(`🦑 Eaten by a Giant Squid! ${players[currentIdx].name} goes back 3 spaces!`, 'error');
        setRolled(false);
        advanceTurn();
      }, 600);
      return;
    }

    if (tile.type === 'LUCKY') {
      const bonusPos = clamp(newPos + 3);
      setTimeout(() => {
        setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: bonusPos } : p));
        if (bonusPos >= LAST_TILE) {
          setWinner(players[currentIdx]);
          setPhase('won');
          return;
        }
        showNotif(`⭐ Lucky Star! ${players[currentIdx].name} jumps forward 3 spaces!`, 'success');
        setRolled(false);
        advanceTurn();
      }, 600);
      return;
    }

    if (tile.type === 'START' || tile.type === 'FINISH') {
      setTimeout(() => { setRolled(false); advanceTurn(); }, 600);
      return;
    }

    // Challenge tile — open mini-game
    setTimeout(() => {
      setActiveTile(tile);
      setPhase('minigame');
    }, 500);
  }

  function handleMiniGameResult(passed) {
    setPhase('playing');
    setActiveTile(null);

    if (passed) {
      showNotif(`🎉 Correct! ${players[currentIdx].name} stays on tile ${players[currentIdx].position}!`, 'success');
    } else {
      // Send player back to previous position
      setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: prevPos } : p));
      showNotif(`😔 Wrong! ${players[currentIdx].name} goes back to tile ${prevPos}.`, 'error');
    }

    setRolled(false);
    advanceTurn();
  }

  function advanceTurn() {
    setCurrentIdx(prev => {
      let next = (prev + 1) % players.length;
      // Handle skipNext
      if (players[next]?.skipNext) {
        setPlayers(ps => ps.map((p, i) => i === next ? { ...p, skipNext: false } : p));
        showNotif(`💤 ${players[next].name} skips a turn!`, 'info');
        next = (next + 1) % players.length;
      }
      return next;
    });
  }

  function resetGame() {
    setPhase('setup');
    setPlayers([]);
    setCurrentIdx(0);
    setDiceValue(1);
    setRolled(false);
    setRolling(false);
    setActiveTile(null);
    setWinner(null);
    setNotification(null);
  }

  const currentPlayer = players[currentIdx];

  if (phase === 'setup') return <PlayerSetup onStart={startGame} />;

  if (phase === 'won') {
    return (
      <div className="win-screen">
        <div className="win-confetti">🏆</div>
        <div className="win-title">Winner Winner!</div>
        <div className="win-name" style={{ color: PLAYER_COLORS[winner?.id] }}>{winner?.name}</div>
        <div className="win-subtitle">🧠 Champion of The Great Brain Race!!! 🧠</div>
        <button className="play-again-btn" onClick={resetGame}>🔄 Play Again!</button>
      </div>
    );
  }

  return (
    <div className="game-screen">
      {/* Header */}
      <div className="game-header">
        <div className="game-title">🧠 The Great Brain Race!!!</div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {players.map((p, i) => (
            <div
              key={p.id}
              style={{
                background: i === currentIdx ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.2)',
                color: i === currentIdx ? PLAYER_COLORS[p.id] : '#fff',
                borderRadius: 20,
                padding: '0.3rem 0.8rem',
                fontWeight: 800,
                fontSize: '0.85rem',
                border: i === currentIdx ? `2px solid ${PLAYER_COLORS[p.id]}` : '2px solid transparent',
                transition: 'all 0.3s',
              }}
            >
              {p.name} — Tile {p.position}
            </div>
          ))}
        </div>
        <button
          onClick={resetGame}
          style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 8, padding: '0.3rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
        >
          ↺ New Game
        </button>
      </div>

      {/* Board */}
      <Board players={players} />

      {/* Turn panel */}
      <div className="turn-panel">
        <div className="turn-info">
          <div className="turn-player-name" style={{ color: PLAYER_COLORS[currentPlayer?.id] }}>
            {currentPlayer?.name}'s Turn
          </div>
          <div className="turn-instruction">
            {rolled ? 'Moved! Waiting for challenge...' : 'Roll the dice to move!'}
          </div>
        </div>

        <div className="dice-container">
          <Dice value={diceValue} rolling={rolling} />
          {diceValue && rolled && (
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>Rolled: {diceValue}</div>
          )}
        </div>

        <button className="roll-btn" onClick={rollDice} disabled={rolling || rolled || phase !== 'playing'}>
          {rolling ? '🎲 Rolling...' : '🎲 Roll Dice!'}
        </button>
      </div>

      {/* Mini-game modal */}
      {phase === 'minigame' && activeTile && currentPlayer && (
        <MiniGame
          tile={activeTile}
          playerName={currentPlayer.name}
          playerColor={PLAYER_COLORS[currentPlayer.id]}
          onResult={handleMiniGameResult}
        />
      )}

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}
