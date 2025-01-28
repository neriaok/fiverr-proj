import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom' // 

import {loadGigs } from '../store/actions/gig.actions' // loadgigs

import { gigService } from '../services/gig'
import { userService } from '../services/user'
import { FilterBar } from '../cmps/FilterBar'
import { GigList } from '../cmps/GigList'
export function GigIndex() {
    const { gigTag } = useParams() 
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter());

    useEffect(() => {
        loadGigs(filterBy);
    }, [filterBy]);

    useEffect(() => {
        loadGigs({ tag: gigTag })
    }, [gigTag])


    return (
        <main className="gig-index">
            <FilterBar filterBy={filterBy} setFilterBy={setFilterBy} />
            <GigList gigs={gigs} />
        </main>
    )
}