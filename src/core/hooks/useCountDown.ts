import { useEffect, useState, useCallback } from 'react';

interface Timer {
  minutes: string;
  seconds: string;
  isFinished: boolean;
  restart: () => void;
}

const useCountdown = (initialSeconds: number): Timer => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isFinished, setIsFinished] = useState(false);

  const formatTime = (time: number) => (time < 10 ? `0${time}` : `${time}`);

  const minutes = formatTime(Math.floor(secondsLeft / 60));
  const seconds = formatTime(secondsLeft % 60);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsFinished(true);
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

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
