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
                        <h3>
                            {selectedPackage === "basic" ? 'Startup Basic Package' : null}
                            {selectedPackage === "standard" ? 'Standard Package' : null}
                            {selectedPackage === "premium" ? 'Premium Package' : null}
                            <div className="price-wrap">
                                {/* {'₪' + gigToOrder.price} {orderGigSvgs.exclamationMark} */}
                                {selectedPackage === "basic" ? ('$' + gigToOrder.price) : null}
                                {selectedPackage === "standard" ? ('$' + gigToOrder.aboutThisGig.packages.standard.price) : null}
                                {selectedPackage === "premium" ? ('$' + gigToOrder.aboutThisGig.packages.premium.price) : null}
                                {orderGigSvgs.exclamationMark}
                            </div>
                        </h3>
                        <p>
                            {gigToOrder.description}
                        </p>
                    </header>
                    <article>
                        <div  className="additional-info">
                            <p className="delivery-time">
                               {orderGigSvgs.clock} <span>
                                {selectedPackage === "basic" ? gigToOrder.daysToMake : null}
                                {selectedPackage === "standard" ? (gigToOrder.daysToMake +  2) : null}
                                {selectedPackage === "premium" ? (gigToOrder.daysToMake +  4) : null}
                                
                                -day delivery</span> 
                            </p>
                            <p className="revisions">
                                {orderGigSvgs.recycle} 
                                <span>
                                    {selectedPackage === "basic" ? 2 : null}
                                    {selectedPackage === "standard" ? 3 : null}
                                    {selectedPackage === "premium" ? 4 : null}
                                    {'\n'}
                                     Revisions</span>
                            </p>
                        </div>
                        <ul className="features">
                            {/* {gig.aboutThisGig.services.map(service => (
                                 <li>{orderGigSvgs.check} <span>{service}</span></li>
                            ))} */}
                            {selectedPackage === "basic" ? gig.aboutThisGig.services.map(service => (
                                 <li>{orderGigSvgs.check} <span>{service}</span></li>
                            )) : null }
                            {selectedPackage === "standard" ? gig.aboutThisGig.packages.standard.services.map(service => (
                                 <li>{orderGigSvgs.check} <span>{service}</span></li>
                            )) : null }
                            {selectedPackage === "premium" ? gig.aboutThisGig.packages.premium.services.map(service => (
                                 <li>{orderGigSvgs.check} <span>{service}</span></li>
                            )) : null }
                        </ul>
                    </article>
                    <footer className="order-footer">
                        <NavLink to={`/gig/:${gig._id}/:${selectedPackage}/checkout`}><button className="order-footer-btn order">Continue <span>{orderGigSvgs.arrow}</span></button></NavLink>
                        <button className="order-footer-btn compare">Compare packages</button>
                    </footer> 
                </div>
            </div>
        </section>
    )

    
}