import { FunctionComponent } from 'react';

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

    return (<div>
        <input type="text" value={query} onChange={e => sotQuery(e.target.value)} />
        <button onClick={handleClear}>Очистить</button>
    </div>);
}

export default SearchBar;