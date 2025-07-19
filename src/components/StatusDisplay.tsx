import './StatusDisplay.css';
import { Solve } from '../types/types';

type StatusDisplayProps = {
    solvesArray: Solve[];
    selectedIndex: number;
}

function StatusDisplay({ solvesArray, selectedIndex }: StatusDisplayProps) {

    return (
        <div className="status-display-container"> 
            <div className="status-dispay-background">  
                <div className="status-display-content">
                    <p>time: {solvesArray[selectedIndex].time}</p>
                    <p>scramble: {solvesArray[selectedIndex].scramble}</p>
                </div>
            </div>
        </div>
    );
}

export default StatusDisplay;