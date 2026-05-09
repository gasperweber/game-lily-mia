import { useState } from 'react';
import { ageToTier } from '../data/questions.js';

const PLAYER_COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12'];
const PLAYER_EMOJIS = ['🔴','🔵','🟢','🟡'];
const DEFAULT_NAMES = ['Player 1','Player 2','Player 3','Player 4'];

const AGE_OPTIONS = [
  { label:'5–8 yrs',  value:7,  tier:'junior',   emoji:'🐣', desc:'Nice and easy!' },
  { label:'9–12 yrs', value:10, tier:'explorer',  emoji:'🧒', desc:'Medium challenge' },
  { label:'13+ yrs',  value:14, tier:'champion',  emoji:'🧑', desc:'Bring it on!' },
  { label:'Mixed ages', value:10, tier:'explorer', emoji:'👨‍👩‍👧‍👦', desc:'Good for everyone' },
];

export default function PlayerSetup({ onStart }) {
  const [count, setCount] = useState(2);
  const [names, setNames] = useState(['','','','']);
  const [selectedAge, setSelectedAge] = useState(1); // index into AGE_OPTIONS

  function updateName(i, val) {
    setNames(n => { const c=[...n]; c[i]=val; return c; });
  }

  function handleStart() {
    const age = AGE_OPTIONS[selectedAge];
    const players = Array.from({ length: count }, (_, i) => ({
      id: i,
      name: names[i].trim() || DEFAULT_NAMES[i],
      position: 0,
      skipNext: false,
    }));
    onStart(players, age.value);
  }

  return (
    <div className="setup-screen">
      <h1 className="setup-title">🧠 The Great Brain Race!!! 🧠</h1>
      <p className="setup-subtitle">World Tour Edition — NZ → Antarctica!</p>

      <div className="setup-card">
        {/* Age / difficulty */}
        <h2 style={{ marginBottom:'0.75rem' }}>Player age group?</h2>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem', marginBottom:'1.5rem' }}>
          {AGE_OPTIONS.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelectedAge(i)}
              style={{
                padding:'0.7rem 0.5rem',
                borderRadius:12,
                border: selectedAge===i ? '3px solid #764ba2' : '3px solid #ddd',
                background: selectedAge===i ? '#f5f0ff' : '#fafafa',
                cursor:'pointer',
                fontFamily:'Nunito, sans-serif',
                fontWeight: 800,
                fontSize:'0.85rem',
                color: selectedAge===i ? '#5a3696' : '#555',
                transition:'all 0.15s',
                textAlign:'center',
              }}
            >
              <div style={{ fontSize:'1.5rem' }}>{opt.emoji}</div>
              <div>{opt.label}</div>
              <div style={{ fontWeight:600, fontSize:'0.75rem', color:'#888' }}>{opt.desc}</div>
            </button>
          ))}
        </div>

        <h2 style={{ marginBottom:'0.75rem' }}>Who's playing?</h2>
        <div className="player-inputs">
          {Array.from({ length: count }, (_, i) => (
            <div key={i} className="player-input-row">
              <div className="player-dot" style={{ background: PLAYER_COLORS[i] }}>{PLAYER_EMOJIS[i]}</div>
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

        <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem', justifyContent:'center' }}>
          {count > 1 && (
            <button className="add-player-btn" style={{ maxWidth:150 }} onClick={() => setCount(c=>c-1)}>
              ➖ Remove Player
            </button>
          )}
          {count < 4 && (
            <button className="add-player-btn" style={{ maxWidth:150 }} onClick={() => setCount(c=>c+1)}>
              ➕ Add Player
            </button>
          )}
        </div>

        <div style={{ marginBottom:'1rem', padding:'1rem', background:'#f8f4ff', borderRadius:12, fontSize:'0.82rem', color:'#555', lineHeight:1.7 }}>
          <strong style={{ color:'#764ba2' }}>World Tour!</strong> Race from 🇳🇿 New Zealand across Asia, Europe, the Americas and finish in 🧊 Antarctica!
          <br/>🧩 Memory · 🔬 Science · 🌍 Geography · 📜 History · 🧠 General Knowledge
          <br/>🦑 Giant Squid = stuck! · ⭐ Lucky Star = bonus leap!
        </div>

        <button className="start-btn" onClick={handleStart}>
          🌍 Start the World Tour!
        </button>
      </div>
    </div>
  );
}
