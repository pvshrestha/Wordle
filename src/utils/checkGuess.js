export default function checkGuess(guess, answer) {
  const result = Array(guess.length).fill('absent');
  const remaining = answer.split('');

  for (let index = 0; index < guess.length; index += 1) {
    if (guess[index] === answer[index]) {
      result[index] = 'correct';
      remaining[index] = null;
    }
  }

  for (let index = 0; index < guess.length; index += 1) {
    if (result[index] === 'correct') continue;

    const matchIndex = remaining.indexOf(guess[index]);
    if (matchIndex !== -1) {
      result[index] = 'present';
      remaining[matchIndex] = null;
    }
  }

  return result;
}
