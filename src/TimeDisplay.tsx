import './TimeDisplay.css';

type TimeDisplayProps = {
    timer: Number;
}

function TimeDisplay({ timer }: TimeDisplayProps) {
    return(
        <div>
            <div className="timer">
                {timer.toString()}
            </div>

            <div className="average-of-5">
                ao5: 
            </div>
            
            <div className="average-of-12">
                ao12: 
            </div>
        </div>
    )
}

export default TimeDisplay;