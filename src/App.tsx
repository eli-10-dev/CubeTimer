import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// https://github.com/cubing/scramble-display
import { ScrambleDisplay  } from 'scramble-display';
import Scrambles from './Scrambles';
import TimeDisplay from './TimeDisplay';
import TimeTable from './TimeTable';

type Solve = {
  time: number;
  ao5: string;
  ao12: string;
}

type Notation = {
  notation: string;
  opposite: string;
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
  const notationsArray: Array<Notation> = [
    { notation: "F", opposite: "B" }, 
    { notation: "B", opposite: "F" }, 
    { notation: "U", opposite: "D" }, 
    { notation: "D", opposite: "U" }, 
    { notation: "R", opposite: "L" }, 
    { notation: "L", opposite: "R" }
  ];

  const typeOfTurn : Record<number, string> = { 1: "", 2: "2", 3: "'"};

  const generateScramble = () => {
    // Place array inside of the function so that a new reference 
    // is generated or a new instance of the array is seen by react.
    const scrambleArray: string[] = new Array(20).fill("");
    let i = 0;

    // console.log(" ===== NEW SCRAMBLE GENERATED! NEW SCRAMBLE GENERATED! NEW SCRAMBLE GENERATED! ===== ");
    while (i < scrambleArray.length){
      // console.log("========== GENERATING NEW NOTATION ==========");

      let generatedMove = "";
      const notationType = notationsArray[Math.floor(Math.random() * 6)].notation;
      const notationTypeIndex = notationsArray.findIndex(move => move.notation === notationType);
      const notationTypeOpposite = notationsArray[notationTypeIndex].opposite;
      const turnType = typeOfTurn[Math.floor(Math.random() * 3 + 1)];

      // Bracket notation takes the [nth] character in a string (prevNotation)
      const prevMove = scrambleArray[i - 1];
      const prevNotation = prevMove?.[0];
      const doublePrevMove = scrambleArray[i - 2];
      const doublePrevNotation = doublePrevMove?.[0];

      if (notationType === doublePrevNotation){
        const noRepeatArray = notationsArray.filter(move => move.notation !== doublePrevNotation);
        const noRepeatNotation = noRepeatArray[Math.floor(Math.random() * 5)].notation;
        generatedMove = `${noRepeatNotation}${turnType}`;
      }

      if (notationTypeOpposite === prevNotation){
        const noOppositeArray = notationsArray.filter(move => move.notation !== notationTypeOpposite && move.notation !== notationType);
        const noOppositeNotation = noOppositeArray[Math.floor(Math.random() * 4)].notation;
        generatedMove = `${noOppositeNotation}${turnType}`

        // console.log(`Current notation: ${notationType}${turnType} opposite: ${notationTypeOpposite} prevMove: ${prevMove}`);
        // console.log(`${notationTypeOpposite} === ${prevNotation}; New notation: ${generatedMove}`);
        // console.log("noOppositeArray: ", noOppositeArray);
      } else if (notationType === prevNotation){             
        const noRepeatArray = notationsArray.filter(move => move.notation !== prevNotation);
        const noRepeatNotation = noRepeatArray[Math.floor(Math.random() * 5)].notation;
        generatedMove = `${noRepeatNotation}${turnType}`;
      } 
      else {
        generatedMove = `${notationType}${turnType}`;
      }

      scrambleArray[i] = generatedMove;
      i += 1;
    } 

    setCubeScramble(scrambleArray);
    console.log("SCRAMBLE ARRAY: ", scrambleArray);
  };

  const recordTime = () => {
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
    setAo12(newAo12);
  };

  const calculateAo5 = (array: Solve[]) => {
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
    const average = (sum / 3).toFixed(3).toString();

    // console.log(`New Array[${newArray.length}]: `, JSON.stringify(newArray, null, 2));
    // console.log("Trimmed Array: ", JSON.stringify(middleTimes, null, 2));
    // console.log("Sum: ", sum);
    // console.log("Average: ", average);
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
    const middleTimes = [...twelveSoles].sort((a: Solve, b: Solve) => a.time - b.time).slice(1, 11);
    const sum = middleTimes.reduce((sum, currentValue) => sum + currentValue.time, 0);
    const average = (sum / 10).toFixed(3).toString();

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
    setAo5(() => {
      return calculateAo5(solvesArray);
    });
    setAo12(() => {
      return calculateAo12(solvesArray);
    });

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
          ao5={ao5}
          ao12={ao12}
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