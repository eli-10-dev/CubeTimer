import './TimeTable.css';
import { Solve } from '../types/types';

type TimeTableProps = {
    solvesArray: Solve[];
    setSelectedIndex: React.Dispatch<number>;
    setShowSolve: React.Dispatch<boolean>;
}

function TimeTable({ solvesArray, setSelectedIndex, setShowSolve }: TimeTableProps) {
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
                    {
                    solvesArray.map(( {time, ao5, ao12, addedTwo, dnf}, index ) => (
                        <tr key={index}>
                            <td onClick={() => {
                                        setSelectedIndex(Number(index));
                                        setShowSolve(true);
                                    }}>{index + 1}</td>
                            <td onClick={() => {
                                        setSelectedIndex(Number(index));
                                        setShowSolve(true);
                                    }}>{dnf === true ? "DNF" : time.toFixed(2)}{!addedTwo ? "" : "+"}
                            </td>
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