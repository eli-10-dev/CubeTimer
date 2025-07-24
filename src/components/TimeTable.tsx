import './TimeTable.css';
import { Solve } from '../types/types';

type TimeTableProps = {
    solvesArray: Solve[];
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
    setShowSolve: React.Dispatch<boolean>;
    indexSetting: (selectedIndex: number) => number;
    showAo5: (index: number) => void;
    showAo12: (index: number) => void;
}

function TimeTable({ solvesArray, setShowSolve, indexSetting, showAo5, showAo12 }: TimeTableProps) {

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
                                        const newIndex = indexSetting(index);
                                        setShowSolve(true);
                                    }}
                                className="index-solve-time"
                                    > {index + 1}
                            </td>

                            <td onClick={() => {
                                        const newIndex = indexSetting(index);
                                        setShowSolve(true);
                                    }}
                                className="index-solve-time"
                                    > {dnf === true ? "DNF" : time.toFixed(2)}{!addedTwo ? "" : "+"}
                                
                            </td>

                            <td onClick={() => {
                                        const newIndex = indexSetting(index);
                                        showAo5(newIndex);
                                }}
                                style={{ cursor:`${ao5 === "-" ? "default" : "pointer"}`}}
                                className={ao5 === "-" ? "" : "td-hover"}
                                > {ao5}    
                
                            </td>

                            <td onClick={() => {
                                        const newIndex = indexSetting(index);
                                        showAo12(newIndex);
                                }}
                                style={{ cursor:`${ao12 === "-" ? "default" : "pointer"}`}}
                                className={ao12 === "-" ? "" : "td-hover"}
                                >{ao12}
                            </td>
                        </tr>
                    )) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TimeTable;