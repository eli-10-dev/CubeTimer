  import { Solve } from '../types/types';
  
  export const calculateAo12 = (array: Solve[]) => {
    let newArray: Solve[] = [];

    if (array.length < 12){
      newArray = [...array];
      return "-"; 
    }

    newArray = [...array];
    const twelveSoles = newArray.slice(-12);
    const middleTimes = [...twelveSoles].sort((a: Solve, b: Solve) => a.time - b.time).slice(1, 11);
    const sum = middleTimes.reduce((sum, currentValue) => sum + currentValue.time, 0);
    const average = (sum / 10).toFixed(3).toString();

    return average;
  }