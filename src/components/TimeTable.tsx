import { StringLiteral } from 'typescript';
import './TimeTable.css';
import { Solve } from '../types/types';

type TimeTableProps = {
    solvesArray: Solve[];
    setSelectedIndex: React.Dispatch<number>;
    setShowStats: React.Dispatch<boolean>;
}

function TimeTable({ solvesArray, setSelectedIndex, setShowStats }: TimeTableProps) {
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
                        <tr key={index} 
                            onClick={() => {
                                        setSelectedIndex(Number(index));
                                        setShowStats(true);
                                    }}>

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