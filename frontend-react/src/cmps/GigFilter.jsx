import { useState, useEffect } from 'react';
import { appHeaderSvgs } from './Svgs';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilter } from '../store/actions/filter.actions'; // actions

export function GigFilter({ user, filterBy, setFilterBy }) {    
    const currentFilter = filterBy;

    const [inputWidth, setInputWidth] = useState(user ? '40em' : '23em');

    useEffect(() => {
        setInputWidth(user ? '40em' : '23em');
    }, [user]);

    const filterHandler = (newFilter) => {
        setFilterBy(newFilter)
        
    };

    function handleChange(ev) {
        const { name, value } = ev.target;
        filterHandler({ ...currentFilter, [name]: value });
    }

    const clearFilterHandler = () => {
        dispatch(clearFilter());
    };

    return (
        <section className="gig-filter">
            {/* Filter input field */}
            <input
                style={{ width: inputWidth }}
                className="filter-input"
                type="text"
                name="txt"  
                value={currentFilter.txt || ''}
                placeholder="What service are you looking for today?"
                onChange={handleChange}
                required
            />
            <div className="search-svg">
                {appHeaderSvgs.magnifyingGlass}
            </div>
        </section>
    );
}
