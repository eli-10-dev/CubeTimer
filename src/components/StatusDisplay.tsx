import './StatusDisplay.css';
import { Solve } from '../types/types';
import { recalculateAllAverages } from '../utils/recalculateAllAverages';

type StatusDisplayProps = {
    solvesArray: Solve[];
    setSolvesArray: React.Dispatch<React.SetStateAction<Solve[]>>;
    selectedIndex: number;
    setShowSolve: React.Dispatch<boolean>;
    setAo5: React.Dispatch<React.SetStateAction<string>>;
    setAo12: React.Dispatch<React.SetStateAction<string>>;
}

function StatusDisplay({ solvesArray, setSolvesArray, selectedIndex, setShowSolve }: StatusDisplayProps) {

    const plusTwo = () => {
        console.log("Plus Two Solve function called!");
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
    
            const newAverages = recalculateAllAverages(newArray);
            console.log("newAverages: ", newAverages);
            setSolvesArray(newAverages);
            setShowSolve(false);
        }
    };

    const deleteSolve = () => { 
        console.log("Delete Solve function called!");
        const updatedArray = solvesArray.filter((_, index) => {
            return index !== selectedIndex;
        });
        const newAverages = recalculateAllAverages(updatedArray);
        setSolvesArray(newAverages);
        setShowSolve(false);
    };

    const dnfSolve = () => {
        if (!solvesArray[selectedIndex].dnf){
            const updatedSolve = {
                ...solvesArray[selectedIndex],
                dnf: true
            }

            const newArray = [...solvesArray];
            newArray[selectedIndex] = updatedSolve;

            const newAverages = recalculateAllAverages(newArray);
            setSolvesArray(newAverages);
            setShowSolve(false);
        }
    };

    return (
        <div className="status-display-container"> 
            <div className="status-dispay-background">  
                <div className="status-display-content">
                    <div className="status-content-header"><i className="fa-solid fa-xmark close-status-display" 
                        onClick={() => {
                                setShowSolve(false);
                            }}> </i></div>

                    <p>Solve No.: {selectedIndex + 1}</p>
                    <p>Time: {solvesArray[selectedIndex].time.toFixed(2)} {!solvesArray[selectedIndex].addedTwo ? "" : "+"}</p>
                    <p>scramble: {solvesArray[selectedIndex].scramble?.join(" ")}</p>

                    <span className="stats-buttons">
                        <p onClick={() => plusTwo()}> +2 </p>

                        <p onClick={() => dnfSolve()}>DNF</p>

                        <p onClick={() => deleteSolve()}>
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