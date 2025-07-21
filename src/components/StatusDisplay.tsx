import './StatusDisplay.css';
import { useEffect } from 'react';
import { Solve } from '../types/types';
import { calculateAo5 } from '../utils/calculateAo5';
import { calculateAo12 } from '../utils/calculateAo12';


type StatusDisplayProps = {
    solvesArray: Solve[];
    setSolvesArray: React.Dispatch<React.SetStateAction<Solve[]>>;
    selectedIndex: number;
    setShowSolve: React.Dispatch<boolean>;
    setAo5: React.Dispatch<React.SetStateAction<string>>;
    setAo12: React.Dispatch<React.SetStateAction<string>>;
}

function StatusDisplay({ solvesArray, setSolvesArray, selectedIndex, setShowSolve, setAo5, setAo12 }: StatusDisplayProps) {

    const plusTwo = () => {
        if (!solvesArray[selectedIndex].addedTwo) {
            const updatedSolve = {
                // I made existingSolve because I iterated through each key in the object,
                // turns out I can just do ...solvesArray[selectedIndex] and edit the keys that I want
                // const existingSolve = solvesArray[selectedIndex];
                ...solvesArray[selectedIndex],
                time: solvesArray[selectedIndex].time + 2,
                addedTwo: true
            };

            const newArray = [...solvesArray];
            newArray[selectedIndex] = updatedSolve;
            
            const newAo5 = calculateAo5(newArray);
            const newAo12 = calculateAo12(newArray);

            setSolvesArray(newArray);
            setAo5(newAo5);
            setAo12(newAo12);
        }
    };

    const deleteSolve = () => { 
        setSolvesArray(prevArray => 
            prevArray.filter((solve, index) => 
                index !== selectedIndex
            )
        );
    };

    return (
        <div className="status-display-container"> 
            <div className="status-dispay-background">  
                <div className="status-display-content">
                    <div className="status-content-header"><i className="fa-solid fa-xmark close-status-display" 
                        onClick={() => {
                                setShowSolve(false);
                            }}> </i></div>

                    <p>Solve No.: {selectedIndex}</p>
                    <p>Time: {solvesArray[selectedIndex].time.toFixed(2)} {!solvesArray[selectedIndex].addedTwo ? "" : "+"}</p>
                    <p>scramble: {solvesArray[selectedIndex].scramble?.join(" ")}</p>

                    <span className="stats-buttons">
                        <p onClick={() => plusTwo()}> +2 </p>

                        <p>DNF</p>

                        <p onClick={() => {
                            deleteSolve()
                            setShowSolve(false)
                        }}>
                            <i className="fa-solid fa-xmark"></i>
                        </p>

                        <p onClick={() => setShowSolve(false)}>OK</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StatusDisplay;