import { Link, NavLink } from "react-router-dom"
import React, { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import { orderGigSvgs } from "../cmps/Svgs"

export function OrderGig({gig}) {
    const  gigToOrder = gig
    console.log(gigToOrder);
    
    return (
        <section className="order-main-container">
            <div className="order-container">

                <div className="packages-container">
                    <button className="package basic">
                        Basic
                    </button>
                    <button className="package standard">
                        Standard
                    </button>
                    <button className="package premium">
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
                            {/* <li>{orderGigSvgs.check} <span>Functional website</span></li>
                            <li>{orderGigSvgs.check} <span>5 pages</span></li>
                            <li>{orderGigSvgs.check} <span>Responsive design</span></li>
                            <li>{orderGigSvgs.check} <span>Content upload</span></li>
                            <li>{orderGigSvgs.check} <span>5 plugins/extensions</span></li>
                            <li>{orderGigSvgs.check} <span>E-commerce functionality</span></li>
                            <li>{orderGigSvgs.check} <span>15 products</span></li> */}
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