import { FunctionComponent } from 'react';
import SortOption, { SortConfig } from '../models/Sort';

interface SortSelectorProps {
    options: SortOption[],
    config: SortConfig,
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

    return (<div>
        {options.map(option =>
            isActive(option)
                ? <button
                    key={option.value}
                    onClick={_ => handleClick(option)}
                    className={'sort-option-button-active'}>
                    {option.title + ' ' + config.order}
                </button>
                : <button
                    key={option.value}
                    onClick={_ => handleClick(option)}>
                    {option.title}
                </button>
        )}
    </div>);
}

export default SortSelector;