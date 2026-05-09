import { useState, useRef } from 'react';
import PlayerSetup from './components/PlayerSetup.jsx';
import WorldMapBoard from './components/WorldMapBoard.jsx';
import Dice from './components/Dice.jsx';
import MiniGame from './components/MiniGame.jsx';
import { WORLD_STOPS } from './data/worldPath.js';
import { ageToTier } from './data/questions.js';

const PLAYER_COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12'];
const LAST = WORLD_STOPS.length - 1;

const TYPE_NAMES = {
  M:'Memory', S:'Science', G:'Geography', H:'History', GK:'Gen. Knowledge',
  SQUID:'🦑 Giant Squid!', LUCKY:'⭐ Lucky Star!', START:'Start', FINISH:'Finish!',
};

function clamp(p) { return Math.min(Math.max(p, 0), LAST); }

export default function App() {
  const [phase, setPhase] = useState('setup');
  const [players, setPlayers] = useState([]);
  const [age, setAge] = useState(10);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [rolled, setRolled] = useState(false);
  const [prevPos, setPrevPos] = useState(0);
  const [activeTile, setActiveTile] = useState(null);
  const [notification, setNotification] = useState(null);
  const [winner, setWinner] = useState(null);
  const notifTimer = useRef(null);

  function showNotif(msg, type = 'info') {
    clearTimeout(notifTimer.current);
    setNotification({ msg, type });
    notifTimer.current = setTimeout(() => setNotification(null), 4000);
  }

  function startGame(playerList, playerAge) {
    setPlayers(playerList);
    setAge(playerAge);
    setCurrentIdx(0);
    setPhase('playing');
    setRolled(false);
    setDiceValue(1);
  }

  function rollDice() {
    if (rolling || rolled) return;
    setRolling(true);
    let ticks = 0;
    const iv = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      if (++ticks >= 14) {
        clearInterval(iv);
        const final = Math.floor(Math.random() * 6) + 1;
        setDiceValue(final);
        setRolling(false);
        setRolled(true);
        doMove(final);
      }
    }, 75);
  }

  function doMove(steps) {
    const player = players[currentIdx];
    const oldPos = player.position;
    const newPos = clamp(oldPos + steps);
    const stop = WORLD_STOPS[newPos];

    setPrevPos(oldPos);
    setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: newPos } : p));

    if (newPos >= LAST) {
      setTimeout(() => { setWinner(players[currentIdx]); setPhase('won'); }, 500);
      return;
    }

    if (stop.type === 'SQUID') {
      const back = clamp(newPos - 3);
      setTimeout(() => {
        setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: back } : p));
        showNotif(`🦑 Oh no! A Giant Squid grabs ${players[currentIdx].name} and drags them back 3 spaces!`, 'error');
        setRolled(false);
        advanceTurn();
      }, 700);
      return;
    }

    if (stop.type === 'LUCKY') {
      const bonus = clamp(newPos + 3);
      setTimeout(() => {
        setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: bonus } : p));
        if (bonus >= LAST) { setWinner(players[currentIdx]); setPhase('won'); return; }
        showNotif(`⭐ Lucky Star! ${players[currentIdx].name} leaps forward 3 spaces to ${WORLD_STOPS[bonus].name}!`, 'success');
        setRolled(false);
        advanceTurn();
      }, 700);
      return;
    }

    if (stop.type === 'START') {
      setTimeout(() => { setRolled(false); advanceTurn(); }, 700);
      return;
    }

    setTimeout(() => {
      setActiveTile(stop);
      setPhase('minigame');
    }, 600);
  }

  function handleMiniGameResult(passed) {
    setPhase('playing');
    setActiveTile(null);
    const stop = WORLD_STOPS[players[currentIdx].position];
    if (passed) {
      showNotif(`🎉 Correct! ${players[currentIdx].name} stays in ${stop?.name ?? 'that country'}!`, 'success');
    } else {
      setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: prevPos } : p));
      const prev = WORLD_STOPS[prevPos];
      showNotif(`😔 Wrong! ${players[currentIdx].name} flies back to ${prev?.name ?? 'the previous stop'}.`, 'error');
    }
    setRolled(false);
    advanceTurn();
  }

  function advanceTurn() {
    setCurrentIdx(prev => {
      let next = (prev + 1) % players.length;
      if (players[next]?.skipNext) {
        setPlayers(ps => ps.map((p, i) => i === next ? { ...p, skipNext: false } : p));
        showNotif(`💤 ${players[next].name} skips a turn!`, 'info');
        next = (next + 1) % players.length;
      }
      return next;
    });
  }

  function resetGame() {
    setPhase('setup'); setPlayers([]); setCurrentIdx(0);
    setDiceValue(1); setRolled(false); setRolling(false);
    setActiveTile(null); setWinner(null); setNotification(null);
  }

  const currentPlayer = players[currentIdx];
  const currentStop = currentPlayer ? WORLD_STOPS[currentPlayer.position] : null;
  const difficulty = ageToTier(age);

  if (phase === 'setup') return <PlayerSetup onStart={startGame} />;

  if (phase === 'won') {
    return (
      <div className="win-screen">
        <div className="win-confetti">🏆🌍🧠</div>
        <div className="win-title">World Champion!</div>
        <div className="win-name" style={{ color: PLAYER_COLORS[winner?.id ?? 0] }}>{winner?.name}</div>
        <div className="win-subtitle">🐧 Conquered Antarctica and The Great Brain Race!!! 🐧</div>
        <button className="play-again-btn" onClick={resetGame}>🌍 Play Again!</button>
      </div>
    );
  }

  return (
    <div className="game-screen">
      {/* Header */}
      <div className="game-header">
        <div className="game-title">🧠 The Great Brain Race!!!</div>
        <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
          {players.map((p, i) => {
            const stop = WORLD_STOPS[p.position];
            return (
              <div key={p.id} style={{
                background: i===currentIdx ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.2)',
                color: i===currentIdx ? PLAYER_COLORS[p.id] : '#fff',
                borderRadius:20, padding:'0.3rem 0.8rem', fontWeight:800, fontSize:'0.82rem',
                border: i===currentIdx ? `2px solid ${PLAYER_COLORS[p.id]}` : '2px solid transparent',
                transition:'all 0.3s',
              }}>
                {p.name} — {stop?.flag}{stop?.name ?? 'Start'}
              </div>
            );
          })}
        </div>
        <button onClick={resetGame} style={{
          background:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.4)',
          color:'#fff', borderRadius:8, padding:'0.3rem 0.8rem', cursor:'pointer', fontSize:'0.8rem', fontWeight:700
        }}>↺ New Game</button>
      </div>

      {/* Map */}
      <div className="board-wrapper" style={{ padding:'0.5rem' }}>
        <div style={{ width:'100%', maxWidth:1100, margin:'0 auto' }}>
          <WorldMapBoard players={players} currentStopIdx={currentPlayer?.position ?? 0} />
        </div>
      </div>

      {/* Turn panel */}
      <div className="turn-panel">
        {currentStop && (
          <div style={{ textAlign:'center', minWidth:120 }}>
            <div style={{ fontSize:'1.6rem' }}>{currentStop.flag}</div>
            <div style={{ fontSize:'0.75rem', fontWeight:700, color:'#666' }}>{currentStop.name}</div>
            <div style={{ fontSize:'0.68rem', color:'#999' }}>{TYPE_NAMES[currentStop.type]}</div>
          </div>
        )}
        <div className="turn-info">
          <div className="turn-player-name" style={{ color: PLAYER_COLORS[currentPlayer?.id ?? 0] }}>
            {currentPlayer?.name}'s Turn
          </div>
          <div className="turn-instruction">
            {difficulty === 'junior' ? '🐣 Junior' : difficulty === 'explorer' ? '🧒 Explorer' : '🧑 Champion'} difficulty
          </div>
        </div>
        <div className="dice-container">
          <Dice value={diceValue} rolling={rolling} />
          {rolled && <div style={{ fontSize:'0.78rem', fontWeight:700, color:'#666' }}>Rolled: {diceValue}</div>}
        </div>
        <button className="roll-btn" onClick={rollDice} disabled={rolling || rolled || phase !== 'playing'}>
          {rolling ? '🎲 Rolling...' : '🎲 Roll Dice!'}
        </button>
      </div>

      {/* Mini-game */}
      {phase === 'minigame' && activeTile && currentPlayer && (
        <MiniGame
          tile={activeTile}
          playerName={currentPlayer.name}
          playerColor={PLAYER_COLORS[currentPlayer.id]}
          difficulty={difficulty}
          onResult={handleMiniGameResult}
        />
      )}

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>{notification.msg}</div>
      )}
    </div>
  );
}
