const KEYS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export default function Keyboard({ onKey, keyStatuses }) {
  return (
    <section className="keyboard" aria-label="On-screen keyboard">
      {KEYS.map((row, index) => (
        <div className="key-row" key={row}>
          {index === 2 && (
            <button className="key key-wide" onClick={() => onKey('ENTER')} aria-label="Enter guess">
              Enter
            </button>
          )}
          {row.split('').map((letter) => (
            <button
              className={`key ${keyStatuses[letter.toLowerCase()] ?? ''}`}
              key={letter}
              onClick={() => onKey(letter)}
              aria-label={letter}
            >
              {letter}
            </button>
          ))}
          {index === 2 && (
            <button className="key key-wide" onClick={() => onKey('BACKSPACE')} aria-label="Delete letter">
              <span aria-hidden="true">⌫</span>
            </button>
          )}
        </div>
      ))}
    </section>
  );
}
