import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom' // 

import { addGig, updateGig, removeGig, addGigMsg, loadGigs } from '../store/actions/gig.actions' // loadgigs

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'

import { GigList } from '../cmps/GigList'

export function GigIndex() {
    const {gigTag} = useParams() //
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    //
      useEffect(() => {
        loadGigs({tag: gigTag})
      }, [gigTag])
      //
    console.log('Gigs inside useEffect:', gigs)

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
        if (speed === 0 || speed === gig.speed) return

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
                {userService.getLoggedinUser() && <button onClick={onAddGig}>Add a Gig</button>}
            </header>
            {console.log('Rendering gigs:', gigs)}
            <GigList
                gigs={gigs}
                onRemoveGig={onRemoveGig}
                onUpdateGig={onUpdateGig} />
        </main>
    )
}