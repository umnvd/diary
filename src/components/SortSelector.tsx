import { FunctionComponent } from 'react';
import SortConfig, { SortOption } from '../models/SortConfig';
import { TextButton } from './common/Button';
import '../styles/FilterAndSort.css'

interface SortSelectorProps {
    options: SortOption[];
    config: SortConfig;
    setConfig: (config: SortConfig) => void;
}

const SortSelector: FunctionComponent<SortSelectorProps> = (
    { options, config, setConfig }
) => {
    const handleClick = (
        option: SortOption
    ) => {
        const newConfig: SortConfig = {
            option: option.value,
            order: option.value === config.option
                ? !config.order
                : true
        };
        setConfig(newConfig);
    }

    const isActive = (option: SortOption) => option.value === config.option;
    const arrow = (isAsc: boolean) => isAsc ?'△' : '▽';

    return (<div className='sort-buttons'>
        {options.map(option =>
            isActive(option)
                ? <TextButton
                    key={option.value}
                    onClick={_ => handleClick(option)}>
                    {option.title + ' ' + arrow(config.order)}
                </TextButton>
                : <TextButton
                    key={option.value}
                    onClick={_ => handleClick(option)}>
                    {option.title}
                </TextButton>
        )}
    </div>);
}

export default SortSelector;