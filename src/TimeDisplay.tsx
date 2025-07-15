import './TimeDisplay.css';

type TimeDisplayProps = {
    // <prop name> : (<parameters>: <parameter types>) => <return type>
    timer: number;
    isSpacePressed: boolean;
}

function TimeDisplay({ timer, isSpacePressed }: TimeDisplayProps) {
    return(
        <div className="timer-container flex-center">
            <div className="timer" style={{ color:  isSpacePressed ? "green" : "black" }}>
                {timer.toFixed(2).toString()}
            </div>

            <div className="average">
                ao5: 
            </div>
            
            <div className="average">
                ao12: 
            </div>
        </div>
    )
}

export default TimeDisplay;