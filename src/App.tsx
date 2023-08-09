import React, {useEffect, useState} from 'react';
import './App.css';
import {ExamRequest, ExamTiming} from "./interfaces";
import {createSplit} from "./lastnamesplit";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {displayFormalDate, displayFormalTime, stringToTime} from "./datetimeutils";
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import {Button, IconButton} from '@mui/material';


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
        // console.log(et.course);
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
            {timingInfo.course} | {timingInfo.date} | {timingInfo.start}-{timingInfo.end} | {timingInfo.location} | {timingInfo.split.replaceAll(" ", "")}
        </div>
    )
}


function ExamDecisionWrapper(props: PropsToExamDecisionWrapper) {
    const [isSmallScreen, setIsSmallScreen] = React.useState<boolean>(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 660); // check if the viewport width is less than 768 pixels
        };

        handleResize(); // check the screen width on mount

        window.addEventListener('resize', handleResize); // listen for window resize events

        return () => {
            window.removeEventListener('resize', handleResize); // remove event listener on unmount
        };
    }, []);


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
        if (a.date === null && b.date !== null) return -1;
        if (a.date !== null && b.date === null) return 1;
        if (a.date === null && b.date === null) return 0;
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        else {

            let stringToTime1 = stringToTime(a.start);
            let stringToTime2 = stringToTime(b.start);
            if (stringToTime1 !== null && stringToTime2 !== null)
                return stringToTime1.getHours() - stringToTime2.getHours();
            else if (stringToTime1 === null && stringToTime2 !== null) {
                return -1;
            } else if (stringToTime1 !== null && stringToTime2 === null) {
                return 1;
            } else {
                return 0;
            }
        }

    });
    // console.log("Display courses", displayCourses)
    return (
        <div>
            <div>
                {!isSmallScreen ? (<ExamTableFormal displayCourses={displayCourses}/>) :

                    displayCourses.map((et) => <ExamTimingComponent key={`${et.course}-${et.location}`}
                                                                    examTiming={et}/>)}
            </div>
        </div>
    )
}


type ExamTimingListProp = {
    displayCourses: ExamTiming[];
}

function ExamTableFormal(props: ExamTimingListProp) {
    const displayCourses = props.displayCourses;
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Course</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">End</TableCell>
                        <TableCell align="right">Location</TableCell>
                        <TableCell align="right">Split</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayCourses.map((row) => (
                        <TableRow
                            key={row.course}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.course}
                            </TableCell>
                            <TableCell align="right">{displayFormalDate(row.date)}</TableCell>
                            <TableCell align="right">{displayFormalTime(row.start)}</TableCell>
                            <TableCell align="right">{displayFormalTime(row.end)}</TableCell>
                            <TableCell align="right">{row.location}</TableCell>
                            <TableCell align="right">{row.split}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


function removeTrailingSlashes(str: string): string {
    return str.replace(/\/+$/, '');
}


type ExamTerm = {
    session: string;
    path: string;
    name: string;
}


type ExamInfoHolder = {
    examTerms: ExamTerm[];
};


const whiteBG = {
    backgroundColor: 'white',
    padding: '6px',
    borderRadius: '5px'
}

function App() {

    const [lastName, setLastName] = useState('');
    const [examRequestData, setExamRequestData] = useState<ExamRequest | null>(null);
    const [decisionInput, setDecisionInput] = useState<Decision[]>([]);
    const [examInfo, setExamInfo] = useState<ExamInfoHolder | null>(null);
    const [curSes, setCurSes] = useState<string>("");

    async function fetchSession(session: string) {
        if (session === '') {
            console.log("No session to fetch right now")
            return;
        }
        console.log("Fetching session--", session);
        const response = await fetch(`${removeTrailingSlashes(process.env.PUBLIC_URL)}/exams_${session}.json`);
        const responseJson = await response.json();
        setExamRequestData(responseJson);
    }

    useEffect(() => {
        document.title = "UofT ArtSci Exam Scheduler";

        // ExamInfoHolder
        async function fetchAllExamsData() {
            const response = await fetch(`${removeTrailingSlashes(process.env.PUBLIC_URL)}/all_exams.json`);
            const responseJson = await response.json();
            setExamInfo(responseJson);
        }

        fetchAllExamsData().then(() => {
        });
        // fetchData().then(() => console.log("Fetched", examRequestData));
    }, []);

    useEffect(() => {
        fetchSession(curSes).then(() => {
        });
    }, [curSes]);

    useEffect(() => {
        if (examInfo) {
            setCurSes(examInfo.examTerms[0].session);
        }
    }, [examInfo]);


    function handleDataUpdate(data: Decision[]) {
        // console.log('Table data updated:', data);
        setDecisionInput(data);
    }


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    return (
        <div className="App">
            <header className="App-header">

                <h1>UofT ArtSci Exam Timetable Generator</h1>
                <div style={whiteBG}>


                    {curSes === "" ? (<div>TBA</div>) :
                        (<BasicSelect onSessionUpdate={(ses) => {
                            setCurSes(ses);
                        }
                        } allExamInfo={examInfo}
                                      currentSession={curSes}/>)
                    }
                </div>

                <div>
                    <label>

                        <div style={whiteBG}>
                            <TextField id="filled-basic" label="Your last name" variant="filled" autoComplete="off"
                                       onChange={handleNameChange}/>

                        </div>
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
                    <p> Enter the course in COURSE and section in SECTION. This updates in real time.
                    </p>
                    <p>You must type the FULL course code, including the campus number and section. For example,
                        CSC108<strong>H1F</strong>.</p>
                    <p>You only need the section if the course splits exams on sections, which is rare.</p>
                    <p>If your last name is not in any split, the course will not
                        show.</p>
                    <p>Your surname is not case sensitive. DATA MAY BE OUTDATED!</p>


                </div>

            </header>
        </div>
    );
}


type OnSelectUpdate = {
    onSessionUpdate: (ses: string) => void;
    currentSession: string;
    allExamInfo: ExamInfoHolder | null;
}


// the session selector
function BasicSelect(props: OnSelectUpdate) {
    const [age, setAge] = React.useState(props.currentSession);

    const handleChange = (event: SelectChangeEvent) => {

        setAge(event.target.value);
        props.onSessionUpdate(event.target.value);
    };


    return (
        <Box sx={{color: 'white', minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Session</InputLabel>

                {props.allExamInfo ?
                    (<Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        {props.allExamInfo.examTerms.map((ei) => (
                            <MenuItem value={ei.session} key={ei.session}>{ei.name}</MenuItem>))}
                    </Select>)
                    :
                    (<div> TBA </div>)

                }
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

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number, key: keyof Decision) {
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
                            <div style={whiteBG}>
                                <TextField id="outlined-basic" label="Course code" variant="outlined" autoComplete="off"
                                           type="text"
                                           value={row.course}

                                           onChange={(event) => handleChange(event, index, 'course')}
                                />
                            </div>
                        </td>
                        <td>
                            <div style={whiteBG}>
                                <TextField id="outlined-basic" label="Lecture section" variant="outlined"
                                           autoComplete="off"
                                           type="text"
                                           value={row.section}
                                           onChange={(event) => handleChange(event, index, 'section')}
                                /></div>
                        </td>
                        <td style={{paddingLeft: "10px"}}>
                            <IconButton aria-label="delete"
                                        style={{backgroundColor: 'red', fill: '#000'}}

                                        onClick={() => handleRemoveRow(index)}>
                                <CloseIcon/>
                            </IconButton>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Button variant="contained" onClick={handleAddRow}>Add Row</Button>
        </div>
    );
}

export default App;




