import './TimeDisplay.css';

type TimeDisplayProps = {
    // <prop name> : (<parameters>: <parameter types>) => <return type>
    time: number;
    isSpacePressed: boolean;
    ao5: string;
    ao12: string;
}

function TimeDisplay({ time, isSpacePressed, ao5, ao12 }: TimeDisplayProps) {
    return(
        <div className="timer-container flex-center">
            <div className="timer" style={{ color:  isSpacePressed ? "green" : "black" }}>
                {time.toFixed(2).toString()}
            </div>

            <div className="average">
                ao5: {ao5 ? ao5 : "-"}
            </div>
             
            <div className="average">
                ao12: {ao12 ? ao12 : "-"} 
            </div>
        </div>
    )
}

export default TimeDisplay;