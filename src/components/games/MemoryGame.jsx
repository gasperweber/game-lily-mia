import { useState, useEffect, useCallback } from 'react';

const EMOJI_POOL = ['🐶','🐱','🐭','🐹','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐧','🦋','🦄','🐙','🦖','🦕','🌟','🍕','🍦','🎸'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryGame({ onResult }) {
  const PAIRS = 8;
  const TIME_LIMIT = 90;

  const [cards, setCards] = useState(() => {
    const chosen = shuffle(EMOJI_POOL).slice(0, PAIRS);
    return shuffle([...chosen, ...chosen].map((emoji, id) => ({ id, emoji, flipped: true, matched: false })));
  });
  const [phase, setPhase] = useState('preview'); // preview | playing | done
  const [selected, setSelected] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [matchedCount, setMatchedCount] = useState(0);
  const [resultSent, setResultSent] = useState(false);

  // Hide cards after preview
  useEffect(() => {
    const t = setTimeout(() => {
      setCards(c => c.map(card => ({ ...card, flipped: false })));
      setPhase('playing');
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  // Countdown
  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      if (!resultSent) { setResultSent(true); onResult(false); }
      return;
    }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft, onResult, resultSent]);

  const handleCardClick = useCallback((id) => {
    if (phase !== 'playing') return;
    setCards(prev => {
      const card = prev.find(c => c.id === id);
      if (!card || card.flipped || card.matched) return prev;
      const newSel = [...selected, id];
      const flipped = prev.map(c => c.id === id ? { ...c, flipped: true } : c);

      if (newSel.length === 2) {
        const [a, b] = newSel.map(sid => flipped.find(c => c.id === sid));
        if (a.emoji === b.emoji) {
          setTimeout(() => {
            setCards(c => c.map(card => newSel.includes(card.id) ? { ...card, matched: true } : card));
            setMatchedCount(m => {
              const newCount = m + 1;
              if (newCount === PAIRS && !resultSent) {
                setResultSent(true);
                onResult(true);
              }
              return newCount;
            });
            setSelected([]);
          }, 500);
        } else {
          setTimeout(() => {
            setCards(c => c.map(card => newSel.includes(card.id) && !card.matched ? { ...card, flipped: false } : card));
            setSelected([]);
          }, 800);
        }
        setSelected(newSel);
        return flipped;
      }
      setSelected(newSel);
      return flipped;
    });
  }, [phase, selected, PAIRS, onResult, resultSent]);

  return (
    <div className="memory-game">
      {phase === 'preview' && (
        <div style={{ textAlign: 'center', color: '#666', fontWeight: 700, fontSize: '1rem' }}>
          👀 Memorise the cards — they flip in 3 seconds!
        </div>
      )}
      {phase === 'playing' && (
        <div className={`memory-timer ${timeLeft <= 15 ? 'urgent' : ''}`}>
          ⏱ {timeLeft}s — {matchedCount}/{PAIRS} matched
        </div>
      )}

      <div className="memory-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-face card-back">🧩</div>
            <div className="card-face card-front">{card.emoji}</div>
          </div>
        ))}
      </div>

      {phase === 'playing' && (
        <div className="memory-status">Find all {PAIRS} matching pairs!</div>
      )}
    </div>
  );
}
