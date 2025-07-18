import { useState, useEffect } from 'react';

export const useTimer = () => {
    const [time, setTime] = useState<number>(0);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    // ReturnType<whatever type setInterval gives>
    let timerInterval: ReturnType<typeof setInterval>;
    if (isTimerRunning){
      timerInterval = setInterval(() => {
        setTime(prev => prev + 0.01)
      }, 10);
    } 
    return () => {
      return clearInterval(timerInterval);
    }
  }, [isTimerRunning]);

  return { time, setTime, isTimerRunning, setIsTimerRunning }
};