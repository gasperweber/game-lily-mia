import { useState } from 'react';

export default function QuizGame({ question, onResult }) {
  const [highlighted, setHighlighted] = useState(null); // selected but not confirmed
  const [confirmed, setConfirmed] = useState(false);

  function handleSelect(idx) {
    if (confirmed) return;
    setHighlighted(idx);
  }

  function handleConfirm() {
    if (highlighted === null || confirmed) return;
    setConfirmed(true);
  }

  const passed = confirmed && highlighted === question.a;

  return (
    <div>
      <div className="quiz-question">{question.q}</div>

      <div className="quiz-options">
        {question.opts.map((opt, idx) => {
          let cls = 'quiz-option-btn';
          if (!confirmed && idx === highlighted) cls += ' highlighted';
          if (confirmed) {
            if (idx === question.a) cls += ' correct';
            else if (idx === highlighted) cls += ' incorrect';
          }
          return (
            <button
              key={idx}
              className={cls}
              onClick={() => handleSelect(idx)}
              disabled={confirmed}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Confirm button — only show when something is highlighted but not yet confirmed */}
      {highlighted !== null && !confirmed && (
        <button
          className="modal-action-btn"
          style={{ background:'linear-gradient(135deg,#667eea,#764ba2)', marginBottom:'0.75rem' }}
          onClick={handleConfirm}
        >
          🙋 Have a Go! — "{question.opts[highlighted]}"
        </button>
      )}

      {!confirmed && highlighted === null && (
        <p style={{ textAlign:'center', color:'#aaa', fontSize:'0.9rem', fontWeight:600 }}>
          Tap an answer, then press <strong>Have a Go!</strong>
        </p>
      )}

      {confirmed && (
        <>
          <div className={`quiz-result ${passed ? 'pass' : 'fail'}`}>
            {passed
              ? '🎉 Correct! Brilliant!'
              : `❌ Oops! The answer was: "${question.opts[question.a]}"`}
          </div>
          <button
            className={`modal-action-btn ${passed ? 'pass-btn' : 'fail-btn'}`}
            onClick={() => onResult(passed)}
          >
            {passed ? '✅ Keep my spot!' : '😔 Go Back'}
          </button>
        </>
      )}
    </div>
  );
}
