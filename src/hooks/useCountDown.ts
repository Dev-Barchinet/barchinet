import { useEffect, useState, useCallback } from 'react';

interface Timer {
  minutes: number;
  seconds: number;
  isFinished: boolean;
  restart: () => void;
}

const useCountdown = (initialSeconds: number): Timer => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isFinished, setIsFinished] = useState(false);

  // Format minutes and seconds from secondsLeft
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsFinished(true);
      return;
    }

    // Start countdown
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    // Clean up interval on component unmount or reset
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const restart = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setIsFinished(false);
  }, [initialSeconds]);

  return {
    minutes,
    seconds,
    isFinished,
    restart,
  };
};

export default useCountdown;
