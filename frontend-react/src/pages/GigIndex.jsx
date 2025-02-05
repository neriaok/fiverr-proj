import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom' // 

import { loadGigs } from '../store/actions/gig.actions' // loadgigs
import {setFilter,clearFilter} from '../store/actions/filter.actions'
import { useDispatch} from 'react-redux';

import { gigService } from '../services/gig'
import { userService } from '../services/user'
import { FilterBar } from '../cmps/FilterBar'
import { GigList } from '../cmps/GigList'

export function GigIndex() {
    const dispatch = useDispatch();
    const currentFilter = useSelector(state => state.filterModule.filterBy);
    console.log(currentFilter , 'gig index filterstore');

    const { gigTag } = useParams()
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const [filterBy, setFilterBy] = useState(currentFilter);
    
    const filterHandler = (newCurrentFilter) => {
        dispatch(setFilter(newCurrentFilter));
    };


    const clearFilterHandler = () => {
        dispatch(clearFilter());
    };

    
    useEffect(() => {
        setFilterBy(currentFilter)
    }, [currentFilter])

    useEffect(() => {
        console.log(filterBy,'filterbynew');
        
        loadGigs(filterBy);
        filterHandler(filterBy)
        
    }, [filterBy]);

    useEffect(() => {
        console.log('gigtag');
        
        var newFilterBy = filterBy
        newFilterBy.tag = gigTag

        loadGigs(newFilterBy)
        filterHandler(newFilterBy)
    }, [gigTag])


    return (
        <main className="gig-index main-container full">
            <FilterBar filterBy={filterBy} setFilterBy={setFilterBy} />
            <GigList gigs={gigs} />
        </main>
    )
}