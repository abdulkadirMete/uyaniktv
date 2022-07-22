import moment from "moment";
import "moment/dist/locale/tr";

// remaining days
export function daysRemaining(date) {
    var date = moment(date);
    var todaysdate = moment();
    return date.diff(todaysdate, "days");
}

// readable date format
export const readableDateFormatter = (date) => {
    return moment(date, "YYYY-MM-DD").locale("tr").format("Do MMMM dddd YYYY");
};

export const unixToHour = (unixtime) => {
    return moment.unix(unixtime).locale("tr").format("HH:mm"); //date use
};

// process data
export const processData = (programs) => {
    try {
        let guideItem = { day: "", unix: "", programsArray: [] };
        let processedData = [];

        for (let i = 0; i < programs.length; i++) {
            guideItem.day = programs[i].Time.split(" ")[0];

            guideItem.programsArray.push({
                hour: programs[i].Time.split(" ")[1],
                program: programs[i].ProgramName,
                unixtime: programs[i].unixtime,
            });

            if (i + 1 === programs.length) {
                processedData.push(guideItem);
                break;
            }
            if (guideItem.day !== programs[i + 1].Time.split(" ")[0]) {
                processedData.push(guideItem);
                guideItem = { day: "", programsArray: [] };
            }
        }

        return processedData;
    } catch (error) {
        console.log(error);
    }
};

// get current day
export const getCurrentDayGuide = (guides) => {
    const currentDay = moment().format("D");
    let currentGuide;
    guides.forEach((guide) => {
        const guideDay = moment(guide.day, "YYYY-MM-DD").format("D");
        if (guideDay === currentDay) {
            currentGuide = guide;
        }
    });

    return currentGuide;
};

// get currentProgram
export const getCurrentProgram = (guide) => {
    let minDif;
    let currentProgram;
    guide.programsArray.forEach((programItem) => {
        const currentUnix = moment();
        const programUnix = moment.unix(programItem.unixtime);
        const diff = moment.duration(currentUnix.diff(programUnix));
        if (!minDif || (diff > 0 && diff < minDif)) {
            minDif = diff;
            currentProgram = programItem;
        }
    });

    return currentProgram;
};
