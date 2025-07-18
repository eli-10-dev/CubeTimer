import { SetStateAction } from 'react';
import './Scrambles.css';

type ScrambleProps = {
    cubeScramble: Array<string>;
    // React.Dispatch is the type for setState
    // setCubeScramble: React.Dispatch<Array<string>>;
    // setIsSpacePressed: React.Dispatch<boolean>;
    // setIsTimerRunning: React.Dispatch<boolean>;
}

function Scrambles({ cubeScramble }: ScrambleProps) {

    return(
        <div className="scramble flex-center">
            {cubeScramble.join(" ")}
        </div>
    )
}

export default Scrambles;