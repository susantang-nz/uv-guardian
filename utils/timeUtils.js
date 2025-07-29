export function formatLocalTime(input) {
    let dateObj;
    if (typeof input === "number") {
        dateObj = new Date(input * 1000);
    } else if (typeof input === "string") {
        dateObj = new Date(input);
    } else {
        return "Invalid Input";
    }
    return dateObj.toLocaleString();
}

export function getCurrentYear() {
    return new Date().getFullYear();
}

export function formatTodayString() {
    const today = new Date();
    return today.toLocaleDateString("en-NZ", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}