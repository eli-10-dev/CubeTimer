export type Solve = {
  time: number,
  ao5: string,
  ao12: string,
  scramble: string[] | undefined,
  addedTwo: boolean,
  dnf: boolean
};

export type Notation = {
  notation: string,
  opposite: string
}

export type TypetimesAndScrambles = {
  time: string,
  scramble: string
  dnf: boolean
}