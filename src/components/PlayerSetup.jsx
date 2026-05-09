import { useState } from 'react';

const PLAYER_COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12'];
const PLAYER_EMOJIS = ['🔴','🔵','🟢','🟡'];
const DEFAULT_NAMES = ['Player 1','Player 2','Player 3','Player 4'];

export default function PlayerSetup({ onStart }) {
  const [count, setCount] = useState(2);
  const [names, setNames] = useState(['','','','']);

  function updateName(i, val) {
    setNames(n => { const c = [...n]; c[i] = val; return c; });
  }

  function handleStart() {
    const players = Array.from({ length: count }, (_, i) => ({
      id: i,
      name: names[i].trim() || DEFAULT_NAMES[i],
      position: 0,
      skipNext: false,
    }));
    onStart(players);
  }

  return (
    <div className="setup-screen">
      <h1 className="setup-title">🧠 The Great Brain Race!!! 🧠</h1>
      <p className="setup-subtitle">The ultimate kids' quiz board game!</p>

      <div className="setup-card">
        <h2>Who's playing?</h2>
        <div className="player-inputs">
          {Array.from({ length: count }, (_, i) => (
            <div key={i} className="player-input-row">
              <div className="player-dot" style={{ background: PLAYER_COLORS[i] }}>
                {PLAYER_EMOJIS[i]}
              </div>
              <input
                type="text"
                placeholder={DEFAULT_NAMES[i]}
                value={names[i]}
                onChange={e => updateName(i, e.target.value)}
                maxLength={16}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {count > 1 && (
            <button className="add-player-btn" style={{ maxWidth: 140 }} onClick={() => setCount(c => c - 1)}>
              ➖ Remove Player
            </button>
          )}
          {count < 4 && (
            <button className="add-player-btn" style={{ maxWidth: 140 }} onClick={() => setCount(c => c + 1)}>
              ➕ Add Player
            </button>
          )}
        </div>

        <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f4ff', borderRadius: 12, fontSize: '0.85rem', color: '#555', lineHeight: 1.6 }}>
          <strong style={{ color: '#764ba2' }}>How to play:</strong> Roll the dice, move your piece, then answer the challenge on your tile to keep your spot!
          <br />🧩 Memory · 🔬 Science · 🌍 Geography · 📜 History · 🧠 General Knowledge
          <br />🦑 Giant Squid = go back 3 spaces! · ⭐ Lucky Star = jump forward 3!
        </div>

        <button className="start-btn" onClick={handleStart}>
          🚀 Start the Race!
        </button>
      </div>
    </div>
  );
}
