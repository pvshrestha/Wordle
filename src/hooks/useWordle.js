import { useCallback, useEffect, useState } from 'react';
import { VALID_GUESSES, getRandomAnswer } from '../data/words.js';
import checkGuess from '../utils/checkGuess.js';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export default function useWordle() {
  const [answer, setAnswer] = useState(getRandomAnswer);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [message, setMessage] = useState('');
  const [gameStatus, setGameStatus] = useState('playing');

  const submitGuess = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage('Not enough letters');
      return;
    }
    if (!VALID_GUESSES.has(currentGuess)) {
      setMessage('Word not found');
      return;
    }

    const nextGuesses = [...guesses, currentGuess];
    setGuesses(nextGuesses);
    setCurrentGuess('');
    setMessage('');

    if (currentGuess === answer) {
      setGameStatus('won');
      setMessage('Brilliant!');
    } else if (nextGuesses.length === MAX_GUESSES) {
      setGameStatus('lost');
      setMessage(answer.toUpperCase());
    }
  }, [answer, currentGuess, gameStatus, guesses]);

  const onKey = useCallback((key) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      submitGuess();
      return;
    }
    if (key === 'BACKSPACE' || key === 'DELETE') {
      setCurrentGuess((guess) => guess.slice(0, -1));
      setMessage('');
      return;
    }
    if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((guess) => (guess.length < WORD_LENGTH ? guess + key.toLowerCase() : guess));
      setMessage('');
    }
  }, [currentGuess.length, gameStatus, submitGuess]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      onKey(event.key === 'Backspace' ? 'BACKSPACE' : event.key.toUpperCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKey]);

  const restart = useCallback(() => {
    let nextAnswer = getRandomAnswer();
    while (nextAnswer === answer) nextAnswer = getRandomAnswer();
    setAnswer(nextAnswer);
    setGuesses([]);
    setCurrentGuess('');
    setMessage('');
    setGameStatus('playing');
  }, [answer]);

  const evaluatedGuesses = guesses.map((guess) => ({
    guess,
    result: checkGuess(guess, answer),
  }));

  return {
    answer,
    currentGuess,
    evaluatedGuesses,
    gameStatus,
    guesses,
    message,
    onKey,
    restart,
    submitGuess,
  };
}
