import { FunctionComponent } from 'react';
import Button from './common/Button';
import Input from './common/Input';

interface SearchBarProps {
    query: string;
    sotQuery: (query: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = (
    { query, sotQuery  }
) => {
    const handleClear = () => {
        if (query !== '')
            sotQuery('')
    }

    return (<div className='search-bar'>
        <Input type="text" value={query} onChange={e => sotQuery(e.target.value)} />
        <Button onClick={handleClear}>Очистить</Button>
    </div>);
}

export default SearchBar;