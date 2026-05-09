import QuizGame from './games/QuizGame.jsx';
import MemoryGame from './games/MemoryGame.jsx';
import { WORLD_STOPS } from '../data/worldPath.js';
import { SCIENCE, GEOGRAPHY, HISTORY, GK, getQuestion } from '../data/questions.js';

const TYPE_COLORS = {
  M:'#8e2de2', S:'#2193b0', G:'#1e8449',
  H:'#c0392b', GK:'#e67e22',
};
const TYPE_NAMES = {
  M:'Memory Challenge', S:'Science', G:'Geography', H:'History', GK:'General Knowledge',
  SQUID:'Giant Squid!', LUCKY:'Lucky Star!',
};

const CATEGORY_MAP = { S:'SCIENCE', G:'GEOGRAPHY', H:'HISTORY', GK:'GK' };

export default function MiniGame({ tile, playerName, playerColor, difficulty, onResult }) {
  const type = tile.type;
  const color = TYPE_COLORS[type] ?? '#667eea';
  const name = TYPE_NAMES[type] ?? type;
  const stop = WORLD_STOPS.find(s => s.id === tile.id);

  let question = null;
  if (CATEGORY_MAP[type]) {
    question = getQuestion(CATEGORY_MAP[type], difficulty);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          {stop && (
            <div style={{ fontSize:'1.6rem', marginBottom:'0.3rem' }}>
              {stop.landmark} {stop.flag} {stop.animal}
            </div>
          )}
          <div className="modal-category-badge" style={{ background: color }}>
            {tile.icon} {name} {stop ? `— ${stop.name}` : ''}
          </div>
          <div className="modal-title">{playerName}'s Challenge!</div>
          <div style={{ fontSize:'0.85rem', color:'#888', fontWeight:600, marginTop:'0.2rem' }}>
            Answer correctly to keep your spot on the map!
          </div>
        </div>

        {type === 'M' && <MemoryGame onResult={onResult} />}
        {question && <QuizGame question={question} onResult={onResult} />}
      </div>
    </div>
  );
}
