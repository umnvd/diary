import { FunctionComponent } from 'react';
import DateFilterConfig, { defaultDateFilterConfig } from '../models/DateFilterConfig';
import Button from './common/Button';
import Input from './common/Input';
import '../styles/FilterAndSort.css'
import { dateToTs, tsToInputDate } from '../data/utils/dateUtils';

interface DateFilterProps {
    config: DateFilterConfig;
    setConfig: (config: DateFilterConfig) => void;
}

const DateFilter: FunctionComponent<DateFilterProps> = (
    { config, setConfig }
) => {
    const setDate = (date: string, isStart: boolean) => {
        if (date) {
            const ts = dateToTs(date);
            const newConfig = isStart
                ? { ...config, startDate: ts }
                : { ...config, endDate: ts };
            setConfig(newConfig);
        }
    }

    const toStringDate = (ts?: number) => {
        return ts
            ? tsToInputDate(ts)
            : ''
    }

    const handleClear = () => {
        if (config !== defaultDateFilterConfig)
            setConfig(defaultDateFilterConfig)
    }

    return (<div className='date-filter'>
        <Input
            type='date'
            max={toStringDate(config.endDate)}
            value={toStringDate(config.startDate)}
            onChange={e => setDate(e.target.value, true)} />
        <Input
            type='date'
            min={toStringDate(config.startDate)}
            value={toStringDate(config.endDate)}
            onChange={e => setDate(e.target.value, false)} />
        <Button
            onClick={handleClear}>
            Сбросить
        </Button>
    </div>);
}

export default DateFilter;