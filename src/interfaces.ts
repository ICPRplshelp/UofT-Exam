export interface ExamRequest {
    examTimes: ExamTiming[];
    session: string;
}


export interface ExamTiming {
    course: string;
    section: string;
    format: string;
    split: string;
    location: string;
    date: string;
    start: string;
    end: string;
    notes: string;
}

export interface ExamStorage {
    examTerms: ExamSession[];
}

export interface ExamSession {
    session: string;
    path: string;
    name: string;
}