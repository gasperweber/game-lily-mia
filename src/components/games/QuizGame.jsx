import { useState } from 'react';

export default function QuizGame({ question, onResult }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  function handleSelect(idx) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
  }

  const passed = answered && selected === question.a;

  return (
    <div>
      <div className="quiz-question">{question.q}</div>
      <div className="quiz-options">
        {question.opts.map((opt, idx) => {
          let cls = 'quiz-option-btn';
          if (answered) {
            if (idx === question.a) cls += ' correct';
            else if (idx === selected) cls += ' incorrect';
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={answered}>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <>
          <div className={`quiz-result ${passed ? 'pass' : 'fail'}`}>
            {passed ? '🎉 Correct! Well done!' : `❌ Oops! The answer was: ${question.opts[question.a]}`}
          </div>
          <button className={`modal-action-btn ${passed ? 'pass-btn' : 'fail-btn'}`} onClick={() => onResult(passed)}>
            {passed ? '✅ Continue!' : '😔 Go Back'}
          </button>
        </>
      )}
    </div>
  );
}
