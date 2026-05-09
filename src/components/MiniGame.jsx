import QuizGame from './games/QuizGame.jsx';
import MemoryGame from './games/MemoryGame.jsx';
import { TILE_NAMES } from '../data/board.js';
import { SCIENCE, GEOGRAPHY, HISTORY, GK, getRandomQuestion } from '../data/questions.js';

const CATEGORY_COLORS = {
  M:  '#8e2de2', S: '#2980b9', G: '#1e8449',
  H:  '#c0392b', GK: '#e67e22',
};

export default function MiniGame({ tile, playerName, playerColor, onResult }) {
  const type = tile.type;
  const color = CATEGORY_COLORS[type] || '#667eea';
  const name = TILE_NAMES[type] || type;

  let question = null;
  if (type === 'S')  question = getRandomQuestion(SCIENCE);
  if (type === 'G')  question = getRandomQuestion(GEOGRAPHY);
  if (type === 'H')  question = getRandomQuestion(HISTORY);
  if (type === 'GK') question = getRandomQuestion(GK);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-category-badge" style={{ background: color }}>
            {tile.icon} {name}
          </div>
          <div className="modal-title">{playerName}'s Challenge!</div>
          <div className="modal-player-name" style={{ color }}>
            Answer correctly to keep your spot!
          </div>
        </div>

        {type === 'M' && <MemoryGame onResult={onResult} />}

        {(type === 'S' || type === 'G' || type === 'H' || type === 'GK') && question && (
          <QuizGame question={question} onResult={onResult} />
        )}
      </div>
    </div>
  );
}
