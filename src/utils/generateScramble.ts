import { Notation } from '../types/types';

// For cube scramble
export const notationsArray: Array<Notation> = [
    { notation: "F", opposite: "B" }, 
    { notation: "B", opposite: "F" }, 
    { notation: "U", opposite: "D" }, 
    { notation: "D", opposite: "U" }, 
    { notation: "R", opposite: "L" }, 
    { notation: "L", opposite: "R" }
  ];

export const typeOfTurn : Record<number, string> = { 1: "", 2: "2", 3: "'"};

export const generateScramble = () => {
    // Place array inside of the function so that a new reference 
    // is generated or a new instance of the array is seen by react.
    const scrambleArray: string[] = new Array(20).fill("");
    let i = 0;

    // console.log(" ===== NEW SCRAMBLE GENERATED! NEW SCRAMBLE GENERATED! NEW SCRAMBLE GENERATED! ===== ");
    while (i < scrambleArray.length){
      // console.log("========== GENERATING NEW NOTATION ==========");

      let generatedMove = "";
      const notationType = notationsArray[Math.floor(Math.random() * 6)].notation;
      const notationTypeIndex = notationsArray.findIndex(move => move.notation === notationType);
      const notationTypeOpposite = notationsArray[notationTypeIndex].opposite;
      const turnType = typeOfTurn[Math.floor(Math.random() * 3 + 1)];

      // Bracket notation takes the [nth] character in a string (prevNotation)
      const prevMove = scrambleArray[i - 1];
      const prevNotation = prevMove?.[0];
      const doublePrevMove = scrambleArray[i - 2];
      const doublePrevNotation = doublePrevMove?.[0];

      if (notationType === doublePrevNotation && notationType !== prevNotation){
        const noRepeatArray = notationsArray.filter(move => move.notation !== doublePrevNotation);
        const noRepeatNotation = noRepeatArray[Math.floor(Math.random() * noRepeatArray.length)].notation;
        generatedMove = `${noRepeatNotation}${turnType}`;
      }

      if (notationType === doublePrevNotation){
        const noRepeatArray = notationsArray.filter(move => move.notation !== doublePrevNotation);
        const noRepeatNotation = noRepeatArray[Math.floor(Math.random() * noRepeatArray.length)].notation;
        generatedMove = `${noRepeatNotation}${turnType}`;
      }

      if (notationTypeOpposite === prevNotation){
        const noOppositeArray = notationsArray.filter(move => move.notation !== notationTypeOpposite && move.notation !== notationType);
        const noOppositeNotation = noOppositeArray[Math.floor(Math.random() * noOppositeArray.length)].notation;
        generatedMove = `${noOppositeNotation}${turnType}`

        // console.log(`Current notation: ${notationType}${turnType} opposite: ${notationTypeOpposite} prevMove: ${prevMove}`);
        // console.log(`${notationTypeOpposite} === ${prevNotation}; New notation: ${generatedMove}`);
        // console.log("noOppositeArray: ", noOppositeArray);
      } else if (notationType === prevNotation){             
        const noRepeatArray = notationsArray.filter(move => move.notation !== prevNotation);
        const noRepeatNotation = noRepeatArray[Math.floor(Math.random() * noRepeatArray.length)].notation;
        generatedMove = `${noRepeatNotation}${turnType}`;
      } 
      else {
        generatedMove = `${notationType}${turnType}`;
      }

      scrambleArray[i] = generatedMove;
      i += 1;
    } 

    //console.log("SCRAMBLE ARRAY: ", scrambleArray);
    return scrambleArray;
  };