import './Scrambles.css';

type ScrambleProps = {
    cubeScramble: Array<string>;
    generateScramble: () => Array<string>;
}

function Scrambles({ cubeScramble, generateScramble }: ScrambleProps) {
    return(
        <div className="scramble flex-center" onClick={() => generateScramble()}>
            {cubeScramble.join(" ")}
        </div>
    )
}

export default Scrambles;