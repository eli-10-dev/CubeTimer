import './Scrambles.css';

type ScrambleProps = {
    cubeScramble: Array<string>;
    // For functions: 
    // <prop name> : (<parameters>: <parameter types>) => <return type>
    generateScramble: () => Array<string>;
}

function Scrambles({ cubeScramble, generateScramble }: ScrambleProps) {
    return(
        <div className="scramble flex-center">
            {cubeScramble.join(" ")}
        </div>
    )
}

export default Scrambles;