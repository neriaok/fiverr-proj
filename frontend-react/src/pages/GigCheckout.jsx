import React, { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadGig, addGigMsg } from '../store/actions/gig.actions.js'
import { gigCheckoutSvgs, orderGigSvgs } from "../cmps/Svgs.jsx"

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
            <section className="payment-container">
                <div className="billing-container">
                    <header className="billing-header">
                        <h3>Billing information</h3>
                    </header>
                    <div className="billing-info-container">
                        <p className="billing-info">
                            Your invoice will be issued according to the details listed here. <br />
                            Israel
                        </p>
                    </div>
                </div>
                <div className="payment-options-container">
                    <header className="payment-options-header">
                        <h3>Payment options</h3>
                    </header>
                    <div className="payment-option">
                        <label>
                            <input class="form-check-input radio" type="radio" name="visa" id="flexRadioDefault1" checked="ture"/>
                            {gigCheckoutSvgs.cards}
                        </label>
                    </div>
                    <form className="credit-card-container">
                        <article className="cradit-card-details">
                            <div className="card-number">
                                <label htmlFor="">
                                    <h4>Card number</h4>
                                </label>
                                <label className="card-number-input-container" htmlFor="">
                                    <img className="card-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAGFBMVEW1trpHcEy1trq1trq1tbm1tbqzt7u1trovSEaFAAAAB3RSTlPAAPBgsOBAB5ee4QAAAElJREFUGNNjEEQCDCgcYQcGGDBkMA+AsVmLGVgRqlQYkDQxoHKY4PoZFBjYy+GgAA8HRQ9uoynmoHjBXAFmJ1MZkrdZEhlwhg4AdjQddlokVkUAAAAASUVORK5CYII="/>
                                    <input className="card-number-input" type="text" placeholder="5326 1000 2000 3000" value="5326-1000-2000-3000" fdprocessedid="fpwrbn"></input>
                                </label>
                            </div>
                            <div className="card">
                                <div className="expiration-date">
                                    <label htmlFor="">
                                        <h4>Expiration date</h4>
                                    </label>
                                    <input type="text" name="" id="" className="input" placeholder="MM/YY" value="03/28" fdprocessedid="32mcit"></input>
                                </div>
                                <div className="security-code">
                                    <label htmlFor="">
                                        <h4>Security code</h4>
                                    </label>
                                    <input type="text" name="" id="" className="input" placeholder="NNN" value="345" fdprocessedid="vccga6"></input>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-holder-name">
                                    <label htmlFor="">
                                        <h4>Cardholder's name</h4>
                                    </label>
                                    <input type="text" name="" id="" className="input" placeholder="" value="Aviv buzaglo" fdprocessedid="dbpui"></input>
                                </div>
                            </div>
                        </article>
                    </form>
                    <div className="payment-option-1">
                        <label htmlFor="">
                            <input class="form-check-input radio" type="radio" name="paypal" id="flexRadioDefault1"/>
                            <img src="https://res.cloudinary.com/dgsfbxsed/image/upload/v1696838077/paypal-logo_uyhsmo.svg" alt="paypal" class="paypal-logo"></img>
                        </label>
                    </div>
                </div>
            </section>
            <section className="cta-container">
                <article className="cta-buyer">
                    <div className="preview-container">
                        <img src={`${gig.imgUrls[0]}`} alt="" />
                        <span className="package-desc">{gig.description}</span>
                    </div>
                    <div className="package-heading">
                        <h4 className="pack-title">Basic package</h4>
                        <h4 className="pack-price">${gig.price}</h4>
                    </div>
                    <ul className="feature-list">
                        <li>{orderGigSvgs.check} <span>Functional website</span></li>
                        <li>{orderGigSvgs.check} <span>5 pages</span></li>
                        <li>{orderGigSvgs.check} <span>Responsive design</span></li>
                        <li>{orderGigSvgs.check} <span>Content upload</span></li>
                        <li>{orderGigSvgs.check} <span>5 plugins/extensions</span></li>
                        <li>{orderGigSvgs.check} <span>E-commerce functionality</span></li>
                        <li>{orderGigSvgs.check} <span>15 products</span></li>
                    </ul>
                </article>
                <div className="summary">
                    <div className="summary-table">
                        <div className="service-fee">
                            <span className="service">Service fee</span>
                            <span className="fee">$5.25</span>
                        </div>
                        <div className="vat-fee">
                            <span className="vat">VAT</span>
                            <span className="fee">$5.95</span>
                        </div>
                    </div>
                    <div className="summary-footer">
                        <div className="user-price">
                            <span className="price">You'll pay</span>
                            <span className="final-price">${gig.price + 5.25 + 5.95}</span>
                        </div>
                        <div className="user-delivery">
                            <span>Total delivery time</span>
                            <span>{gig.daysToMake} days</span>
                        </div>
                        <div className="purchase-container">
                            <button className="purchase-btn">Pay in USD</button>
                            <span>SSL Secure Payment</span>
                        </div>
                    </div>
                </div>
                <div className="currency-options">
                    <span>
                        You will be charged ${gig.price + 5.25 + 5.95}. {'\n'}
                        The order total is an estimation and does not include additional fees your bank may apply.
                    </span>
                </div>
            </section>
        </div>
    )
}
