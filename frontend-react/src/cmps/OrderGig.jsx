import { Link, NavLink } from "react-router-dom"
import React, { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import { orderGigSvgs } from "../cmps/Svgs"

export function OrderGig({gig}) {
    const [ selectedPackage, setSelectedPackage ] = useState("basic")
    const  gigToOrder = gig


    const handlePackageChage = (level) => {
        setSelectedPackage(level)
    }
    
    return (
        <section className="order-main-container">
            <div className="order-container">

                <div className="packages-container">
                    <button className={"package basic" + (selectedPackage === "basic" ? ' selected' : '')} onClick={() => handlePackageChage("basic")}>
                        Basic
                    </button>
                    <button className={"package standard" + (selectedPackage === "standard" ? ' selected' : '')} onClick={() => handlePackageChage("standard")}>
                        Standard
                    </button>
                    <button className={"package premium" + (selectedPackage === "premium" ? ' selected' : '')} onClick={() => handlePackageChage("premium")}>
                        Premium
                    </button>
                </div>

                <div className="order-details">
                    <header className="package-header">
                        <h3>Startup Basic Package
                            <div className="price-wrap">
                                {'₪' + gigToOrder.price} {orderGigSvgs.exclamationMark}
                            </div>
                        </h3>
                        <p>
                            {gigToOrder.description}
                        </p>
                    </header>
                    <article>
                        <div  className="additional-info">
                            <p className="delivery-time">
                               {orderGigSvgs.clock} <span>{gig.daysToMake}-day delivery</span> 
                            </p>
                            <p className="revisions">
                                {orderGigSvgs.recycle} <span>2 Revisions</span>
                            </p>
                        </div>
                        <ul className="features">
                            {gig.aboutThisGig.services.map(service => (
                                 <li>{orderGigSvgs.check} <span>{service}</span></li>
                            ))}
                        </ul>
                    </article>
                    <footer className="order-footer">
                        <NavLink to={`/gig/:${gig._id}/checkout`}><button className="order-footer-btn order">Continue <span>{orderGigSvgs.arrow}</span></button></NavLink>
                        <button className="order-footer-btn compare">Compare packages</button>
                    </footer> 
                </div>
            </div>
        </section>
    )

    
}