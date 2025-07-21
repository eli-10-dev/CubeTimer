import { Solve } from '../types/types';

export const calculateAo5 = (array: Solve[]) => {
  let newArray: Solve[] = [];

  if (array.length < 5){
     newArray = [...array];
    // console.log(`New Array[${newArray.length}]: `, JSON.stringify(newArray, null, 1));
    return "-"; 
  }

    newArray = [...array];
    const fiveSolves = newArray.slice(-5);
    const middleTimes = [...fiveSolves].sort((a: Solve, b: Solve) => a.time - b.time).slice(1, 4);
    const sum = middleTimes.reduce((sum, currentValue) => sum + currentValue.time, 0);
    const average = (sum / 3).toFixed(2).toString();
    return average;
  

  // console.log(`New Array[${newArray.length}]: `, JSON.stringify(newArray, null, 2));
  // console.log("Trimmed Array: ", JSON.stringify(middleTimes, null, 2));
  // console.log("Sum: ", sum);
  // console.log("Average: ", average);
}