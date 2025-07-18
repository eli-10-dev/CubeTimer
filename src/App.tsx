import React, { useState, useEffect, useRef } from 'react';
import { ScrambleDisplay  } from 'scramble-display'; // https://github.com/cubing/scramble-display
import './App.css';

// Components
import Scrambles from './components/Scrambles';
import TimeDisplay from './components/TimeDisplay';
import TimeTable from './components/TimeTable';

// hooks 
import { useTimer } from './hooks/useTimer';

// Types
import { Solve, Notation } from './types/types';

// Utils
import { calculateAo5 } from './utils/calculateAo5';
import { calculateAo12 } from './utils/calculateAo12';
import { generateScramble } from './utils/generateScramble';

function App() {
  // Prevents record() on initial render
  const [hasStarted, setHasStarted] = useState(false);
  const [cubeScramble, setCubeScramble] = useState<Array<string>>();
  const [solvesArray, setSolvesArray] = useState<Solve[]>(() => {
    const stored = localStorage.getItem("solvesStorage");
    return stored ? JSON.parse(stored) : []
  });
  const { time, setTime, isTimerRunning, setIsTimerRunning } = useTimer();
  const [ao5, setAo5] = useState<string>("");
  const [ao12, setAo12] = useState<string>("");
  // Added to track if spacebar is being pressed for the time style
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);

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

      setIsTimerRunning((state: any) => {
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

  // INITIAL RENDER
  useEffect(() => {
    setCubeScramble(generateScramble());  
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
          />
        </section>        
      </section>
    </div>
  );
}

export default App;