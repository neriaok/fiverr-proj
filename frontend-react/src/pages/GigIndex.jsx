import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom' // 

import { loadGigs } from '../store/actions/gig.actions' // loadgigs



import { gigService } from '../services/gig/gig.service.local'
import { userService } from '../services/user'
import { FilterBar } from '../cmps/FilterBar'
import { GigList } from '../cmps/GigList'

export function GigIndex() {

 

    const { gigTag } = useParams()
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const [filterBy, setFilterBy] = useState(gigService.defaultFilter());
    const location = useLocation() // new
    const isGigIndex = location.pathname === '/gigs' ? true : false

    
    
    function filterHandler(filerBy)  {        
        setFilterBy(filerBy)
    }

    useEffect(() => {
        console.log('USE EFFECT 2');

        loadGigs(filterBy);
        
    }, [filterBy]);

    useEffect(() => {
        console.log('GIG TAG');
    
        var newFilterBy = filterBy
        newFilterBy.tag = gigTag

        loadGigs(newFilterBy)
        filterHandler(newFilterBy)
    }, [gigTag])


    return (
        <main className="gig-index main-container full">
            <FilterBar filterBy={filterBy} setFilterBy={filterHandler} />
            <GigList gigs={gigs} />
        </main>
    )
}