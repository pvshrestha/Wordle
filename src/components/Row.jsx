import Tile from './Tile.jsx';

export default function Row({ guess = '', result = [], isCurrent = false }) {
  const letters = guess.split('');

  return (
    <div className={`row${result.length ? ' submitted' : ''}${isCurrent ? ' current' : ''}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Tile
          key={index}
          index={index}
          letter={letters[index] ?? ''}
          status={result[index] ?? ''}
        />
      ))}
    </div>
  );
}
