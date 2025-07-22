import { Solve } from '../types/types';

export const calculateAo12 = (array: Solve[]) => {
  let newArray: Solve[] = [];

  if (array.length < 12){
     newArray = [...array];
    return "-"; 
  }

  newArray = [...array];
  const fiveSolves = newArray.slice(-12);
  const removeDnf = fiveSolves.filter((solve) => solve.dnf !== true);
  
  if (removeDnf.length <= 10){
    return "DNF";
  } else {
    const middleTimes = [...removeDnf].sort((a : Solve, b: Solve) => a.time - b.time).slice(1);
    const sum = middleTimes.reduce((sum, currentValue) => sum + currentValue.time, 0);
    const average = (sum / middleTimes.length).toFixed(2).toString();
    return average;
  }
}