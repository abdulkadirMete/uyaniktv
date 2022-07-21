import moment from "moment";
import "moment/dist/locale/tr";

export const secondToStringDate = (seconds) => {
    if (seconds == 0) {
        return "Canlı";
    } else {
        return new Date(seconds * 1000).toISOString().slice(11, 19);
    }
};

export const notifyMaker = (text, type) => {
    const title = { success: "Mesaj", error: "Hata", warning: "Uyarı" };
    return {
        title: title[type],
        text: text,
        type: type,
    };
};

export const getElementPosition = (element, parent) => {
    let bounds = element.getBoundingClientRect();
    let parentBounds = parent.getBoundingClientRect();
    let x = bounds.left - parentBounds.left;
    let y = bounds.top - parentBounds.top;
    return { x, y };
};

export const setElementPosition = (element, top, right, bottom, left) => {
    if (top) element.style.top = top + "px";
    if (right) element.style.right = right + "px";
    if (bottom) element.style.bottom = bottom + "px";
    if (left) element.style.left = left + "px";

    return element;
};
// wait
export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

//moment functions

export function daysRemaining(date) {
    var date = moment(date);
    var todaysdate = moment();
    return date.diff(todaysdate, "days");
}

export const readableDateFormatter = (date) => {
    return moment(date, "YYYY-MM-DD").locale("tr").format("Do MMMM dddd YYYY");
};

// process guide data
export const processData = (programs) => {
    try {
        let guideItem = { day: "", unix: "", programsArray: [] };
        let processedData = [];

        for (let i = 0; i < programs.length; i++) {
            guideItem.day = programs[i].Time.split(" ")[0];
            guideItem.unix = programs[i].unixtime;
            guideItem.programsArray.push({
                hour: programs[i].Time.split(" ")[1],
                program: programs[i].ProgramName,
            });

            if (i + 1 === programs.length) {
                processedData.push(guideItem);
                break;
            }
            if (guideItem.day !== programs[i + 1].Time.split(" ")[0]) {
                processedData.push(guideItem);
                guideItem = { day: "", unix: "", programsArray: [] };
            }
        }

        return processedData;
    } catch (error) {
        console.log(error);
    }
};

