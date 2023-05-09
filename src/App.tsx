import React, {useEffect, useState} from 'react';
import './App.css';
import {ExamRequest, ExamTiming} from "./interfaces";
import {createSplit} from "./lastnamesplit";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';


type Decision = {
    course: string;
    section: string;  // blank if all / not stated
}

type PropsToExamDecisionWrapper = {
    decisionList: Decision[];
    lastName: string;
    allData: ExamRequest;
}


/**
 * Returns the exam timing object, or null if it doesn't exist.
 * @param eTimes the list of all possible exam timings
 * @param decision contains the course and section code
 * @param lastName the last name of the user
 */
function searchExamTimings(eTimes: ExamTiming[], decision: Decision, lastName: string): ExamTiming | null {
    const courseCode = decision.course;
    const section = decision.section;
    for (let et of eTimes) {
        if (courseCode !== et.course) continue;
        console.log(et.course);
        if (et.section !== "ALL" && section !== et.section) continue;
        // last name split detector
        const split = createSplit(et.split);
        if (split.isInSplit(lastName)) {
            return et;
        }
    }
    return null;
}


type SingleTiming = {
    examTiming: ExamTiming;
}


function ExamTimingComponent(props: SingleTiming) {
    const timingInfo = props.examTiming;
    return (
        <div>
            {timingInfo.course} | {timingInfo.date} | {timingInfo.start}-{timingInfo.end} | {timingInfo.location}
        </div>
    )
}


function ExamDecisionWrapper(props: PropsToExamDecisionWrapper) {
    const decisions = props.decisionList;
    const displayCourses: ExamTiming[] = [];
    for (let i = 0; i < decisions.length; i++) {
        const decision = decisions[i];
        const result = searchExamTimings(props.allData.examTimes, decision, props.lastName);
        if (result !== null) {
            displayCourses.push(result);
        }
    }
    displayCourses.sort((a, b) => {
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
        return 0;

    });
    console.log("Display courses", displayCourses)
    return (
        <div>
            <div>
                {displayCourses.map((et) => <ExamTimingComponent key={`${et.course}-${et.location}`} examTiming={et}/>)}
            </div>
        </div>
    )
}



function App() {

    const [lastName, setLastName] = useState('');
    const [examRequestData, setExamRequestData] = useState<ExamRequest | null>(null);
    const [decisionInput, setDecisionInput] = useState<Decision[]>([]);


    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/exams_20231.json");
            const responseJson = await response.json();
            setExamRequestData(responseJson);
        }

        fetchData().then(() => console.log("Fetched", examRequestData));
    }, []);

    const [counter, setCounter] = useState(0);
    let tempVar = "Among us";

    function handleDataUpdate(data: Decision[]) {
        console.log('Table data updated:', data);
        setDecisionInput(data);
    }

    const whiteBG = {
        backgroundColor: 'white',
        padding: '6px',
        borderRadius: '5px'
    }





    const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLastName(event.target.value);
    };

    return (
        <div className="App">
            <header className="App-header">

                    <h1>UofT Exam Timetable Generator</h1>
                    <div style={whiteBG}>
                        <BasicSelect onSessionUpdate={(ses) => {
                            async function fetchSession(session: string) {
                                const response = await fetch(`/exams_${session}.json`);
                                const responseJson = await response.json();
                                setExamRequestData(responseJson);
                            }

                            fetchSession(ses).then(() => console.log("Fetched session", ses));
                        }
                        }/></div>

                    <div>
                        <label>
                            <div>
                                Your surname:
                            </div>
                            <input type="text" onChange={handleNameChange}/>
                        </label>

                    </div>

                    <MyTable onDataUpdate={handleDataUpdate}/>
                    {/*<button onClick={() => setCounter(counter + 1)}>Click me</button>*/}
                    {examRequestData ?
                        (<ExamDecisionWrapper decisionList={decisionInput} lastName={lastName}
                                              allData={examRequestData}
                        />) : null
                    }
                    <div className="Small-width">
                        <p> Enter the course in COURSE and section in SECTION.
                        </p>
                        <p>You must type the FULL course code, including the campus number and section. For example, CSC108<strong>H1F</strong>.</p>
                        <p>You only need the section if the course splits exams on sections, which is rare.</p>
                        <p>Online exams will not display. If your last name is not in any split, the course will not show.</p>
                        <p>Your surname is not case sensitive.</p>


                    </div>

            </header>
        </div>
    );
}


type OnSelectUpdate = {
    onSessionUpdate: (ses: string) => void;
}


// the session selector
function BasicSelect(props: OnSelectUpdate) {
    const [age, setAge] = React.useState('20231');

    const handleChange = (event: SelectChangeEvent) => {

        setAge(event.target.value);
        props.onSessionUpdate(event.target.value);
    };

    return (
        <Box sx={{color: 'white', minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Session</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={20231}>Winter 2023</MenuItem>
                    <MenuItem value={20229}>Fall 2022</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}


// chaos start


type MyTableProps = {
    onDataUpdate: (data: Decision[]) => void;
};

function MyTable(props: MyTableProps) {
    const [data, setData] = useState<Decision[]>([{course: '', section: ''}]);

    function handleAddRow() {
        const newData = [...data, {course: '', section: ''}];
        setData(newData);
        props.onDataUpdate(newData);
    }

    function handleRemoveRow(index: number) {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
        props.onDataUpdate(newData);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, index: number, key: keyof Decision) {
        const newData = [...data];
        newData[index][key] = event.target.value.toUpperCase();
        setData(newData);
        props.onDataUpdate(newData);
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Course</th>
                    <th>Section</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>
                            <input
                                type="text"
                                value={row.course}
                                onChange={(event) => handleChange(event, index, 'course')}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={row.section}
                                onChange={(event) => handleChange(event, index, 'section')}
                            />
                        </td>
                        <td>
                            <button onClick={() => handleRemoveRow(index)}>X</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleAddRow}>Add Row</button>
        </div>
    );
}

export default App;




