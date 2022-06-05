import { sortOptions } from '../models/SortConfig';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
    dateFilterChanged,
    searchQueryChanged,
    selectPosts,
    sortChanged
} from '../state/posts/postsSlice';
import DateFilter from './DateFilter';
import SearchBar from './SearchBar';
import SortSelector from './SortSelector';

const FilterAndSort = () => {
    const dispatch = useAppDispatch();
    const { sort, dateFilter, searchQuery } = useAppSelector(selectPosts);

    return (<div className='post-list__header'>
        <div className='post-list__filter'>
            <SearchBar
                query={searchQuery}
                sotQuery={query => dispatch(searchQueryChanged(query))} />
            <DateFilter
                config={dateFilter}
                setConfig={config => dispatch(dateFilterChanged(config))} />
        </div>
        <SortSelector
            options={sortOptions}
            config={sort}
            setConfig={config => dispatch(sortChanged(config))} />
    </div>);
}

export default FilterAndSort;