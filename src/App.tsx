import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// https://github.com/cubing/scramble-display
import { ScrambleDisplay  } from 'scramble-display';
import Scrambles from './Scrambles';
import TimeDisplay from './TimeDisplay';
import TimeTable from './TimeTable';

function App() {

  const [cubeScramble, setCubeScramble] = useState<Array<string>>();
  const [timer, setTimer] = useState(0);
  const [ao5, setAo5] = useState("");
  const [ao12, setAo12] = useState("");
  const [solveStats, setSolveStats] = useState([
    {
      time: "",
      ao5: "",
      ao12: ""
    }
  ]);
  const notationsArray: Array<string> = ["F", "B", "U", "D", "R", "L"];
  const typeOfTurn : Record<number, string> = { 1: "", 2: "2", 3: "'"};

  const generateScramble = () => {
    const scrambleArray: string[] = new Array(20).fill("");
    let i = 0;

    while (i < scrambleArray.length){
      let generatedMove = "";
      const notationType = notationsArray[Math.floor(Math.random() * 6)];
      const turnType = typeOfTurn[Math.floor(Math.random() * 3 + 1)];
      const prevMove = scrambleArray[i - 1];
      const prevNotation = prevMove?.[0];

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
    console.log(scrambleArray);
    return scrambleArray;
  };


  useEffect(() => {
    generateScramble();
  }, []);

  return (
    <div className="body">
      <header className="app-header flex-center">
        <Scrambles 
          cubeScramble={cubeScramble || []}
          generateScramble={generateScramble}
        />
      </header>

      <section className="time-content-container">
        <main className="time-display-container flex-center">
          <TimeDisplay 
          timer={timer}
          />
        </main>

        <section className="time-table-container flex-center">
          <TimeTable 
          solveStats={solveStats}

          />
        </section>        
      </section>
    </div>
  );
}

export default App;