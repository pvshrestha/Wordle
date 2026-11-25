import Row from './Row.jsx';

export default function Board({ evaluatedGuesses, currentGuess, gameStatus }) {
  const rows = [...evaluatedGuesses];
  if (gameStatus === 'playing') {
    rows.push({ guess: currentGuess, result: [], isCurrent: true });
  }
  while (rows.length < 6) rows.push({ guess: '', result: [] });

  return (
    <section className="board" aria-label="Word guess board">
      {rows.map((row, index) => (
        <Row
          key={index}
          guess={row.guess}
          result={row.result}
          isCurrent={row.isCurrent}
        />
      ))}
    </section>
  );
}
