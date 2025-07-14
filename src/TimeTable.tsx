import { StringLiteral } from 'typescript';
import './TimeTable.css';

type SolveStat = {
    time: string;
    ao5: string;
    ao12: string;
}

type TimeTableProps = {
    solveStats: SolveStat[];
}

function TimeTable({ solveStats }: TimeTableProps) {
    return(
        <div>
            TimeTable
        </div>
    )
}

export default TimeTable;