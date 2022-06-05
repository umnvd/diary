import moment from 'moment';

export const dateToTs = (date: string): number => {
    return parseInt(moment(date).format('x'));
}

export const tsToInputDate = (ts: number): string => {
    return moment(ts).format('yyyy-MM-DD')
}

export const tsToDateTime = (ts: number): string => {
    return moment(ts).format('DD.MM.YYYY HH:mm')
}