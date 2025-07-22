import React, { useState, useEffect, useRef } from 'react';
import { ScrambleDisplay  } from 'scramble-display'; // https://github.com/cubing/scramble-display
import './App.css';

// Components
import Scrambles from './components/Scrambles';
import TimeDisplay from './components/TimeDisplay';
import TimeTable from './components/TimeTable';
import StatusDisplay from './components/StatusDisplay';
import AverageDisplay from './components/AverageDisplay';

// hooks 
import { useTimer } from './hooks/useTimer';

// Types
import { Solve, timesAndScrambles } from './types/types';

// Utils
import { calculateAo5 } from './utils/calculateAo5';
import { calculateAo12 } from './utils/calculateAo12';
import { generateScramble } from './utils/generateScramble';

function App() {
  // Prevents record() on initial rendertimesAndScrambles
  const [hasStarted, setHasStarted] = useState(false);
  const [cubeScramble, setCubeScramble] = useState<Array<string>>();
  const [prevScramble, setPrevScramble] = useState<Array<string>>();
  const [solvesArray, setSolvesArray] = useState<Solve[]>(() => {
    const stored = localStorage.getItem("solvesStorage");
    return stored ? JSON.parse(stored) : []
  });
  const {time, setTime, isTimerRunning, setIsTimerRunning} = useTimer();
  const [ao5, setAo5] = useState<string>(' ');
  const [ao12, setAo12] = useState<string>(' ');
  // Added to track if spacebar is being pressed for the time style
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex]= useState<number>(0);
  const [showSolve, setShowSolve] = useState<boolean>(false);
  const [showAverages, setShowAverages] = useState<boolean>(false);
  const [selectedAo5, setSelectedAo5] = useState<string>("");
  const [slicedArrayDisplay, setSlicedArrayDisplay] = useState<timesAndScrambles[]>([]);

  const recordTime = () => {
    // This idea is from AI to get the 5th solves into the calculateAo5() function.
    // Temporarily insert a placeholder solve with current time. I tried the same but without a mockSolve, only by adding the key of time in the newSolve object
    const mockSolve = { time, ao5: "-", ao12: "-", scramble: prevScramble, addedTwo: false, dnf: false };
    const freshArray = [...solvesArray, mockSolve];

    // Place ao5 inside of newSolve.ao5 before updating solvesArray
    const newAo5:string = calculateAo5(freshArray);
    const newAo12:string = calculateAo12(freshArray);
  
    let newSolve = {
      time,
      ao5: newAo5,
      ao12: newAo12,
      scramble: prevScramble,
      addedTwo: false,
      dnf: false
    };

    const updatedArray = [...solvesArray, newSolve];
    setSolvesArray(updatedArray);
    setAo5(newAo5);
    setAo12(newAo12);
  };

  const indexSetting = (index: number): number => {
    setSelectedIndex((prevIndex) => {
      // console.log("index: ", index + 1);
      return index;
    });
    return index;
  };

  const showAo5 = (index: number) => {

    if (solvesArray[index].ao5 === "-"){
      return;
    } else {
      const slicedArray = solvesArray.slice(index - 4, index + 1);
      const sortedArray = slicedArray.sort((a: Solve, b: Solve) => a.time - b.time);
      console.log("Sorted Array: ", sortedArray);    
      console.log("Specific index's ao5: ", solvesArray[index].ao5);

      const clickedAo5 = solvesArray[index].ao5.toString();
      const timesAndScrambles = sortedArray.map((solve: Solve): { time: string, scramble: string } => {
        return {
          time: solve.time.toString(),
          scramble: JSON.stringify(solve.scramble),
        }
      });

      // console.log("typeof: ", typeof timesAndScrambles);
      // console.log("Array.isArray(timesAndScrambles): ", Array.isArray(timesAndScrambles));
      // console.log("timesAndScrambles: ", JSON.stringify(timesAndScrambles, null, 2));
      
      setSelectedAo5(clickedAo5);
      setSlicedArrayDisplay(timesAndScrambles);
      setShowAverages(true);
      return timesAndScrambles;
    }
  };

  // Spacebar interactions
  const spacebarPress = (event: KeyboardEvent) => {
    if (event.key === ' '){
      // console.log("Spacebar is pressed!");
      setIsSpacePressed(true);

      setCubeScramble(scramble => {
        setPrevScramble(scramble);
        return scramble;
      })

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
          setCubeScramble(generateScramble());
        }      
        return newState;
      });
    }
  };

  // RECORDING TIME
  useEffect(() => {
    if (!hasStarted){
      return;
    } 

    if (!isSpacePressed && !isTimerRunning){
      recordTime();
    }
  }, [isTimerRunning, isSpacePressed]);

  // Save SolvesArray to localStorage
  useEffect(() => {
    localStorage.setItem("solvesStorage", JSON.stringify(solvesArray));
    // console.log("solvesArray: ", JSON.stringify(solvesArray, null, 2));
  }, [solvesArray]);

  // INITIAL RENDER
  useEffect(() => {
    setCubeScramble(generateScramble());  
    document.addEventListener('keydown', spacebarPress);
    document.addEventListener('keyup', spacebarRelease);
    setAo5(calculateAo5(solvesArray));
    setAo12(calculateAo12(solvesArray));

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

      {
        showSolve && 
        <StatusDisplay
        solvesArray={solvesArray}
        setSolvesArray={setSolvesArray}
        selectedIndex={selectedIndex}
        setShowSolve={setShowSolve}
        setAo5={setAo5}
        setAo12={setAo12}
        />
      }

      {
        showAverages && 
        <AverageDisplay
        setShowAverages={setShowAverages}
        slicedArrayDisplay={slicedArrayDisplay}
        selectedAo5={selectedAo5}
        />
      }

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
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setShowSolve={setShowSolve}
          indexSetting={indexSetting}
          showAo5={showAo5}
          />
        </section>        
      </section>
    </div>
    
  );
}

export default App;