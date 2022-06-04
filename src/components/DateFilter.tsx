import moment from 'moment';
import { FunctionComponent } from 'react';
import DateFilterConfig, { defaultDateFilterConfig } from '../models/DateFilterConfig';

interface DateFilterProps {
    config: DateFilterConfig;
    setConfig: (config: DateFilterConfig) => void;
}

const DateFilter: FunctionComponent<DateFilterProps> = (
    { config, setConfig }
) => {
    const setDate = (date: string, isStart: boolean) => {
        if (date) {
            const ts = parseInt(moment(date).format('x'));
            const newConfig = isStart
                ? { ...config, startDate: ts }
                : { ...config, endDate: ts };
            setConfig(newConfig);
        }
    }

    const toStringDate = (ts?: number) => {
        return ts
            ? moment(ts).format('yyyy-MM-DD')
            : ''
    }

    const handleClear = () => {
        if (config !== defaultDateFilterConfig)
            setConfig(defaultDateFilterConfig)
    }

    return (<div>
        <input
            type='date'
            max={toStringDate(config.endDate)}
            value={toStringDate(config.startDate)}
            onChange={e => setDate(e.target.value, true)} />
        <input
            type='date'
            min={toStringDate(config.startDate)}
            value={toStringDate(config.endDate)}
            onChange={e => setDate(e.target.value, false)} />
        <button
            onClick={handleClear}>
            Сбросить
        </button>
    </div>);
}

export default DateFilter;