import { StringLiteral } from 'typescript';
import './TimeTable.css';

type Solve = {
    time: number;
    ao5: string;
    ao12: string;
}

type TimeTableProps = {
    solvesArray: Solve[];
    ao5: string;
    ao12: string;
    calculateAo5: (array: Solve[]) => string;
    calculateAo12: (array: Solve[]) => string;
}

function TimeTable({ solvesArray, calculateAo5 }: TimeTableProps) {
    return(
        <div className="time-table-contents flex-center">
            {/* <section className="session-dropdown flex-center">
                Session 
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </section> */}
                         
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>ao5</th>
                        <th>ao12</th>
                    </tr>
                </thead>
            
                <tbody>
                    {/* solvesArray.length > 0 ?  */}
                    {
                    solvesArray.map(( {time, ao5, ao12}, index ) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time.toFixed(2)}</td>
                            <td>{ao5}</td>
                            <td>{ao12}</td>
                        </tr>
                    )) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TimeTable;