import { useMemo } from 'react';
import Board from './components/Board.jsx';
import Keyboard from './components/Keyboard.jsx';
import useWordle from './hooks/useWordle.js';
import './App.css';

const STATUS_PRIORITY = { absent: 1, present: 2, correct: 3 };

export default function App() {
  const {
    currentGuess,
    evaluatedGuesses,
    gameStatus,
    message,
    onKey,
    restart,
  } = useWordle();

  const keyStatuses = useMemo(() => {
    const statuses = {};
    evaluatedGuesses.forEach(({ guess, result }) => {
      [...guess].forEach((letter, index) => {
        const status = result[index];
        if ((STATUS_PRIORITY[status] ?? 0) > (STATUS_PRIORITY[statuses[letter]] ?? 0)) {
          statuses[letter] = status;
        }
      });
    });
    return statuses;
  }, [evaluatedGuesses]);

  return (
    <main className="app-shell">
      <header className="header">
        <div className="header-spacer" aria-hidden="true" />
        <h1>WORDLE</h1>
        <button className="restart-button" onClick={restart} aria-label="Start a new game" title="New game">
          ↻
        </button>
      </header>
      <div className="game">
        <p className={`message${message ? ' visible' : ''}`} role="status" aria-live="polite">
          {message || '\u00a0'}
        </p>
        <Board
          evaluatedGuesses={evaluatedGuesses}
          currentGuess={currentGuess}
          gameStatus={gameStatus}
        />
        <Keyboard onKey={onKey} keyStatuses={keyStatuses} />
        {gameStatus !== 'playing' && (
          <button className="play-again" onClick={restart}>Play again</button>
        )}
      </div>
      <footer>Guess the five-letter word in six tries.</footer>
    </main>
  );
}
