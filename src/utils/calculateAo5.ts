import { Solve } from '../types/types';

export const calculateAo5 = (array: Solve[]) => {
  let newArray: Solve[] = [];

  if (array.length < 5){
     newArray = [...array];
    return "-"; 
  }

  newArray = [...array];
  const fiveSolves = newArray.slice(-5);
  const removeDnf = fiveSolves.filter((solve) => solve.dnf !== true);
  //console.log("removeDnf: ", removeDnf);
  
  if (removeDnf.length <= 3){
    return "DNF";
  } else {
    const middleTimes = [...removeDnf].sort((a : Solve, b: Solve) => a.time - b.time).slice(1);
    //console.log("middleTimes.length: ", middleTimes.length);
    const sum = middleTimes.reduce((sum, currentValue) => sum + currentValue.time, 0);
    const average = (sum / middleTimes.length).toFixed(2).toString();
    return average;
  }
  // console.log(`New Array[${newArray.length}]: `, JSON.stringify(newArray, null, 2));
  // console.log("Trimmed Array: ", JSON.stringify(middleTimes, null, 2));
  // console.log("Sum: ", sum);
  // console.log("Average: ", average);
}

/*
I encountered an error where it stated that argument of type string is not compatible with setStateAction<string | undefined>
My code here previously had both return statements inside of if and else if

My code was like this to be specific:

  if (removeDnf.length <= 3){
    return "DNF";
  } else if (removeDnf.length === 4){
    const middleTimes = [...removeDnf].sort((a : Solve, b: Solve) => a.time - b.time).slice(1);
    console.log("middleTimes.length: ", middleTimes.length);
    const sum = middleTimes.reduce((sum, currentValue) => sum + currentValue.time, 0);
    const average = (sum / middleTimes.length).toFixed(2).toString();
    return average;
  }
*/
