import './AverageDisplay.css';
import React from "react";
import { timesAndScrambles } from '../types/types';

type AverageDisplayProps = {
    setShowAverages: React.Dispatch<boolean>;
    slicedArrayDisplay: timesAndScrambles[];
    selectedAo5: string;
}

function AverageDisplay({ setShowAverages, slicedArrayDisplay, selectedAo5 }: AverageDisplayProps) {

    const regex = /[\[\]",]/g;

    return (
        <div className="average-display-container"> 
            <div className="average-dispay-background">  
                <div className="average-display-content">
                    <div className="average-content-header">
                        <i className="fa-solid fa-xmark close-status-display" 
                            onClick={() => {
                                    setShowAverages(false);
                                }}> 
                        </i>
                    </div>
                    <div>

                        <p>Ao5: {selectedAo5}</p>
                    {
                    slicedArrayDisplay.map(( { time, scramble}, index) => (
                        <div>
                            <p>{index + 1}. {time}</p>
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