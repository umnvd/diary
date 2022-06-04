export default interface DateFilterConfig {
    startDate?: number;
    endDate?: number;
}

export const defaultDateFilterConfig: DateFilterConfig = {
    startDate: undefined,
    endDate: undefined
}