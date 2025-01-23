import React, { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadGig, addGigMsg } from '../store/actions/gig.actions.js'

export function GigCheckout () {
    const { gigId } = useParams()
    const clearGigId = gigId.replace(":", "")
    const gig = useSelector(storeState => storeState.gigModule.gig) 
    // const loading = useSelector(storeState => storeState.gigModule.loading)
    // const gig = loadGig(clearGigId)

    useEffect(() => {
        loadGig(clearGigId)
    }, [clearGigId, gig])

    return (
        <div className="checkout-container">
            {clearGigId}
            {gig && 
                <div>
                    {`${gig._id}`}
                </div>}
        </div>
        
    )
}
