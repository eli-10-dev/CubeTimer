import { Solve } from '../types/types';
import { calculateAo5 } from './calculateAo5';
import { calculateAo12 } from './calculateAo12';

export const recalculateAllAverages = (array: Solve[]): Solve[] => {
  return array.map((_, index) => {
    const slicedArray = array.slice(0, index + 1);
    return {  
      ...array[index],
      ao5: calculateAo5(slicedArray),
      ao12: calculateAo12(slicedArray),
    };
  });
};


/*
I honestly couldn't figure this out, this function was from AI (chatgpt)
What I tried was:

useEffect(() => {
  array.map(solve => {
    setAo5(calculateAo5());
    setAo12(calculateAo12());
  });
}, [solvesArray]);
*/
