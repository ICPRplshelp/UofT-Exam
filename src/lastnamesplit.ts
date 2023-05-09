export interface LastNameSplit {
    /**
     * Returns true if lastName is in this particular split.
     * @param lastName
     */
    isInSplit(lastName: string): boolean;
}

/**
 * Creates a LastNameSplit objected based on
 * a split string that can be found on the
 * exam timetable.
 * @param splitStr the input split string
 */
export function createSplit(splitStr: string): LastNameSplit {
    let toReturn: LastNameSplit;
    splitStr = splitStr.trim().replaceAll(" ", "").toUpperCase();
    if (splitStr.match(/^[A-Z]+-[A-Z]+$/)) {
        toReturn = new DoubleLastNameSplit(splitStr);
    } else if (splitStr.match(/^[A-Z]+$/)) {
        toReturn = new SingleLastNameSplit(splitStr);
    } else if (splitStr.match(/,/)) {
        toReturn = new MultiLastNameSplit(splitStr);
    } else {
        toReturn = new NoLastNameSplit();
    }
    return toReturn;
}

class MultiLastNameSplit implements LastNameSplit {
    otherSplits: LastNameSplit[];

    constructor(splitStr: string) {
        this.otherSplits = [];
        let splitted2 = splitStr.split(',').filter((s) => s.trim() !== '')
            .map(s => s.toUpperCase().trim().replaceAll(" ", ""));
        for (let individualSplit of splitted2) {
            let newSplit: LastNameSplit;
            if (individualSplit.match(/^[A-Z]+-[A-Z]+$/)) {
                newSplit = new DoubleLastNameSplit(individualSplit);
            } else if (individualSplit.match(/^[A-Z]+$/)) {
                newSplit = new SingleLastNameSplit(individualSplit);
            } else {
                console.log("Split item created nothing", individualSplit, splitted2);
                continue;
            }
            this.otherSplits.push(newSplit);
        }
    }

    isInSplit(lastName: string): boolean {
        if (this.otherSplits.length === 0)
            return false;
        else {
            return this.otherSplits.every((item) => item.isInSplit(lastName));
        }
    }
}

class NoLastNameSplit
    implements LastNameSplit {
    isInSplit(lastName: string): boolean {
        return false;
    }
}

class SingleLastNameSplit implements LastNameSplit {
    private readonly startingString;

    /**
     * @param splitStr must match the regex ^[A-Z]+
     */
    constructor(splitStr: string) {
        this.startingString = splitStr.split("-")[0].toUpperCase();
    }

    isInSplit(lastName: string): boolean {
        return lastName.toUpperCase().startsWith(this.startingString);
    }
}

class DoubleLastNameSplit implements LastNameSplit {
    private readonly start;
    private readonly end;

    /**
     * @param splitStr must match the regex ^[A-Z]+
     */
    constructor(splitStr: string) {
        const splitString = splitStr.toUpperCase().split("-");
        if (splitString.length !== 2) {
            throw Error("Double last name split isn't actually a double last name split");
        }
        this.start = splitString[0];
        this.end = splitString[1];
    }

    isInSplit(lastName: string): boolean {
        const lastNameUpper = lastName.toUpperCase();
        return this.start <= lastNameUpper.substring(this.start.length)
            && lastNameUpper.substring(this.end.length) <= this.end;
    }
}