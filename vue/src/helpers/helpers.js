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

export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
