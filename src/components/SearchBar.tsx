import { FunctionComponent } from 'react';

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = (
    { query, setQuery }
) => {
    const handleClear = () => {
        if (query !== '')
            setQuery('')
    }

    return (<div>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
        <button onClick={handleClear}>Очистить</button>
    </div>);
}

export default SearchBar;