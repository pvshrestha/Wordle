export default function Tile({ letter = '', status = '', index = 0 }) {
  const classes = ['tile'];
  if (status) classes.push(status);
  else if (letter) classes.push('filled');
  if (letter && !status) classes.push('pop');

  return (
    <div className={classes.join(' ')} aria-label={`Row tile ${index + 1}${letter ? `: ${letter}` : ''}`}>
      {letter}
    </div>
  );
}
