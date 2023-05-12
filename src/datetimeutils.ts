import moment from 'moment';


function stringToDate(dateString: string): Date | null {
    const dateFormats = [
        ['DD-MMM', 'DD/MMM', 'MMM/DD', 'MMM/DD/YYYY'],
        ['YYYY/MM/DD'],
        ['MM/DD/YYYY']
    ];

    for (const format of dateFormats) {
        const momentDate = moment(dateString, format, true);
        if (momentDate.isValid()) {
            return momentDate.toDate();
        }
    }

    return null;
}


export function stringToTime(timeString: string): Date | null {
    timeString = timeString.toUpperCase().trim();
    const timeFormats = [
        'h:mmA',
        'h:mm A',
        'h:mmsA',
        'h:mms A',
        'H:mm'
    ];

    for (const format of timeFormats) {
        const momentTime = moment(timeString, format, true);
        if (momentTime.isValid()) {
            const now = moment();
            const parsedTime = moment(momentTime.format('H:mm'), 'H:mm');
            if (parsedTime.isBefore(now)) {
                parsedTime.add(1, 'day');
            }
            return parsedTime.toDate();
        }
    }

    return null;
}


export function displayFormalDate(dateString: string): string {
    const temp = stringToDate(dateString.trim());
    if(temp === null){
        return dateString;
    } else {
        return temp.toDateString();
    }
}


export function displayFormalTime(timeString: string): string {
    const temp = stringToTime(timeString);
    if(temp === null){
        return timeString;
    }
    else {
        return `${temp.getHours()}:${temp.getMinutes().toString().padStart(2, '0')}`;
    }
}