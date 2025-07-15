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
  const mountFrequency = useRef(0);
  const [cubeScramble, setCubeScramble] = useState<Array<string>>();
  const [solvesArray, setSolvesArray] = useState<Solve[]>([]);
  const [recordReady, setRecordReady] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [ao5, setAo5] = useState<string>("");
  const [ao12, setAo12] = useState<string>("");
  // Added to track if spacebar is being pressed for the time style
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);

  const notationsArray: Array<string> = ["F", "B", "U", "D", "R", "L"];
  const typeOfTurn : Record<number, string> = { 1: "", 2: "2", 3: "'"};

  const generateScramble = () => {
    // Place array inside of the function so that a new reference 
    // is generated or a new instance of the array is seen by react.
    console.log("Generate scramble function was called!");
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
    console.log("Record function was called!");
    console.log("Recording time: ", time);

    let newSolve = {
      time,
      ao5,
      ao12,
    };

    setSolvesArray((prevSolves) => [...prevSolves, newSolve]);
  };

  const spacebarPress = (event: KeyboardEvent) => {
    if (event.key === ' '){
      setIsSpacePressed(true);
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
      console.log("Spacebar is released!");
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

  useEffect(() => {
    if (mountFrequency.current <= 1) {
      mountFrequency.current += 1;
      return;
    }

    if (!isSpacePressed && !isTimerRunning){
      recordTime();
    }
  }, [isTimerRunning, isSpacePressed]);

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
  }, [isTimerRunning])

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
          />
        </section>        
      </section>
    </div>
  );
}

export default App;