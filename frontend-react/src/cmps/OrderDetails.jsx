import React, { useState, useEffect, useRef } from "react"

export function OrderDetails({order}) {


    return (
        <section className="order-modal-container">
            <div className="order-modal">
                <header>
                    <h3>Order Details</h3>
                </header>
                <div className="modal-content">
                    <div className="mini-user">
                        <img src={order.seller.imgUrl} alt="" />
                        <p>ordered the <span>{order.package}</span> package from you for <span>${order.order.price}</span></p>
                        
                    </div>
                    <div className="contact-buyer">
                    <button>Contact</button>
                    </div>
                    <div className="order-info">
                        <h4>Order Information</h4>
                        <ul>
                            <li>
                                <span>Due on</span>
                                <span>{order.orderDate}</span>
                            </li>
                            <li>
                                <span>Delivery Time</span>
                                <span>{order.deliveryTime}</span>
                            </li>
                            <li>
                                <span>Status</span>
                                <span>{order.status}</span>
                            </li>
                            <li>
                                <span>Order ID</span>
                                <span>{order._id}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}