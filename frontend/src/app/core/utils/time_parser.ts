
export function parseTime(time_seconds:number): number[] {
    let result = time_seconds;
    const seconds = result%60;
    result = (result - seconds)/60;
    const minutes = result%60;
    result = (result - minutes)/60;
    const hour = result%24;
    result = (result - hour)/24;
    const days = result%12;

    return [seconds, minutes, hour, days];
}

export const times_formats = ['s', 'm', 'h', 'd'];