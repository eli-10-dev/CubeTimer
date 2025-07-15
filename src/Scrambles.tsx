import './Scrambles.css';

type ScrambleProps = {
    cubeScramble: Array<string>;
}

function Scrambles({ cubeScramble }: ScrambleProps) {
    return(
        <div className="scramble flex-center">
            {cubeScramble.join(" ")}
        </div>
    )
}

export default Scrambles;