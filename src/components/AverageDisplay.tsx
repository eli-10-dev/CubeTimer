import './AverageDisplay.css';
import React from "react";
import { TypetimesAndScrambles } from '../types/types';

type AverageDisplayProps = {
    setShowAverages: React.Dispatch<boolean>;
    slicedArrayDisplay: TypetimesAndScrambles[];
    selectedAverage: string;
}

function AverageDisplay({ setShowAverages, slicedArrayDisplay, selectedAverage }: AverageDisplayProps) {

    const regex = /[\[\]",]/g;

    return (
        <div className="average-display-container"> 
            <div className="average-display-background">  
                <div className="average-display-content">
                    <div className="average-content-header">
                        <i className="fa-solid fa-xmark close-status-display" 
                            onClick={() => {
                                    setShowAverages(false);
                                }}> 
                        </i>
                    </div>

                    <div className="average-stats">

                        <p className="average-stats-ave">Average: {selectedAverage}</p>
                    {
                    slicedArrayDisplay.map(( { time, scramble, dnf}, index) => (
                        <div className="solvetime-scramble">
                            <span><p>{index + 1}.
                            </p> <p>{!dnf ? time : `DNF(${time})`}</p></span>
                            <p>{scramble.replace(regex, " ")}</p>
                        </div>
                    ))
                    }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AverageDisplay;