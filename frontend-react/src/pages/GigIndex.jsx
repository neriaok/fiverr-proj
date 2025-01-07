import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadGigs, addGig, updateGig, removeGig, addGigMsg } from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { GigDetails } from './Gigs'

export function GigIndex() {

    const [ filterBy, setFilterBy ] = useState(gigService.getDefaultFilter())
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs(filterBy)
    }, [filterBy])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')            
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onAddGig() {
        const gig = gigService.getEmptyGig()
        gig.vendor = prompt('Vendor?')
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }        
    }

    async function onUpdateGig(gig) {
        const speed = +prompt('New speed?', gig.speed)
        if(speed === 0 || speed === gig.speed) return

        const gigToSave = { ...gig, speed }
        try {
            const savedGig = await updateGig(gigToSave)
            showSuccessMsg(`Gig updated, new speed: ${savedGig.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update gig')
        }        
    }

    return (
        <main className="gig-index">
            <header>
                <h2>Gigs</h2>
                {userService.getLoggedinUser() && <button onClick={onAddGig}>Add a Gig</button>}
            </header>
            <GigFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <GigList 
                gigs={gigs}
                onRemoveGig={onRemoveGig} 
                onUpdateGig={onUpdateGig}/>
                <GigDetails/>
        </main>
    )
}