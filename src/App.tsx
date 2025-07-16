import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// https://github.com/cubing/scramble-display
// import { ScrambleDisplay  } from 'scramble-display';
import Scrambles from './Scrambles';
import TimeDisplay from './TimeDisplay';
import TimeTable from './TimeTable';
import { transpileModule } from 'typescript';

type Solve = {
    time: number;
     ao5: string;
    ao12: string;
}

function App() {
  // Prevents record() on initial render
  const [hasStarted, setHasStarted] = useState(false);
  const [cubeScramble, setCubeScramble] = useState<Array<string>>();
  const [solvesArray, setSolvesArray] = useState<Solve[]>(() => {
    const stored = localStorage.getItem("solvesStorage");
    return stored ? JSON.parse(stored) : []
  });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [ao5, setAo5] = useState<string>("");
  const [ao12, setAo12] = useState<string>("");
  // Added to track if spacebar is being pressed for the time style
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);

  // For cube scramble
  const notationsArray: Array<string> = ["F", "B", "U", "D", "R", "L"];
  const typeOfTurn : Record<number, string> = { 1: "", 2: "2", 3: "'"};

  const generateScramble = () => {
    // Place array inside of the function so that a new reference 
    // is generated or a new instance of the array is seen by react.
    // console.log("Generate scramble function was called!");
    const scrambleArray: string[] = new Array(20).fill("");
    let i = 0;

    while (i < scrambleArray.length){
      let generatedMove = "";
      const notationType = notationsArray[Math.floor(Math.random() * 6)];
      const turnType = typeOfTurn[Math.floor(Math.random() * 3 + 1)];
      const prevMove = scrambleArray[i - 1];
      // Bracket notation takes the [nth] character in a string
      const prevNotation = prevMove?.[0];

      // Add condition for the case: R2 L2 R2. 
      // Notation above is the same as doing L2 only.
      if (notationType === prevNotation){
        const noRepeatArray = notationsArray.filter(notation => notation !== prevNotation);
        const noRepeatNotation = noRepeatArray[Math.floor(Math.random() * 5)];
        generatedMove = `${noRepeatNotation}${turnType}`;
      } else {
        generatedMove = `${notationType}${turnType}`;
      }

      scrambleArray[i] = generatedMove;
      i += 1;
    } 

    setCubeScramble(scrambleArray);
  };

  const recordTime = () => {
    // console.log("Record function was called!");
    
    // This idea is from AI to get 5 solves into the calculateAo5() function.
    // Temporarily insert a placeholder solve with current time
    const mockSolve = { time, ao5: "-", ao12: "-" };
    const freshArray = [...solvesArray, mockSolve];

    // Place ao5 inside of newSolve.ao5 before updating solvesArray(?)
    // My idea was to calculate the ao5 using the currentState of solvesArray
    // But still 4 solves are being used.
    // const freshArray = [...solvesArray];
    const newAo5 = calculateAo5(freshArray);
    const newAo12 = calculateAo12(freshArray);
  
    let newSolve = {
      time,
      ao5: newAo5,
      ao12: newAo12,
    };

    const updatedArray = [...solvesArray, newSolve];
    setSolvesArray(updatedArray);
    setAo5(newAo5);
  };

  const calculateAo5 = (array: Solve[]) => {
    let newArray: Solve[] = [];

    if (array.length < 5){
      newArray = [...array];
      console.log(`New Array[${newArray.length}]: `, JSON.stringify(newArray, null, 1));
      return "-"; 
    }

    newArray = [...array];
    console.log(`New Array[${newArray.length}]: `, JSON.stringify(newArray, null, 2));
    const fiveSolves = newArray.slice(-5);
    const middleTimes = [...fiveSolves].sort((a: Solve, b: Solve) => a.time - b.time).slice(1, 4);
    const sum = middleTimes.reduce((sum, currentValue) => sum + currentValue.time, 0);
    const average = (sum / 3).toFixed(3).toString();
    console.log("Trimmed Array: ", JSON.stringify(middleTimes, null, 2));
    console.log("Sum: ", sum);
    console.log("Average: ", average);

    return average;
  }

  const calculateAo12 = (array: Solve[]) => {
    let newArray: Solve[] = [];

    if (array.length < 12){
      newArray = [...array];
      return "-"; 
    }

    newArray = [...array];
    const twelveSoles = newArray.slice(-12);
    const middleTimes = [...twelveSoles].sort((a: Solve, b: Solve) => a.time - b.time).slice(1, 4);
    const sum = middleTimes.reduce((sum, currentValue) => sum + currentValue.time, 0);
    const average = (sum / 3).toFixed(3).toString();

    return average;
  }

  // Spacebar interactions
  const spacebarPress = (event: KeyboardEvent) => {
    if (event.key === ' '){
      // console.log("Spacebar is pressed!");
      setIsSpacePressed(true);

      if (!hasStarted) {
        setHasStarted(true);
      }
    }

    setIsTimerRunning((state: boolean) => {
      if (state === false){
        setTime(0);
      }
      return state;
    });
  };

  const spacebarRelease = (event: KeyboardEvent) => {
    if (event.key === ' '){
      // console.log("Spacebar is released!");
      setIsSpacePressed(false);

      setIsTimerRunning((state: boolean) => {
        const newState = !state;
        if (state === true){
          generateScramble();
        }      
        return newState;
      });
    }
  };

  // Save SolvesArray to localStorage
  useEffect(() => {
    localStorage.setItem("solvesStorage", JSON.stringify(solvesArray));
  }, [solvesArray]);

  // RECORDING TIME
  useEffect(() => {
    if (!hasStarted){
      return;
    } 

    if (!isSpacePressed && !isTimerRunning){
      recordTime();
    }
  }, [isTimerRunning, isSpacePressed]);

  // TIMER
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

  // INITIAL RENDER
  useEffect(() => {
    generateScramble();
    document.addEventListener('keydown', spacebarPress);
    document.addEventListener('keyup', spacebarRelease);

    return () => {
      // Remove the event listeners so that the functions above will not run indefinitely
      document.removeEventListener('keydown', spacebarPress);
      document.removeEventListener('keyup', spacebarRelease);
    }
  }, []);

  return (
    <div className="body">
      <header className="app-header flex-center">
        <Scrambles 
          cubeScramble={cubeScramble || []}
        />
      </header>

      <section className="time-content-container">
        <main className="time-display-container flex-center">
          <TimeDisplay 
          time={time}
          isSpacePressed={isSpacePressed}
          />
        </main>

        <section className="time-table-container flex-center">
          <TimeTable 
          solvesArray={solvesArray}
          ao5={ao5}
          ao12={ao12}
          calculateAo5={calculateAo5}
          calculateAo12={calculateAo12}
          />
        </section>        
      </section>
    </div>
  );
}

export default App;