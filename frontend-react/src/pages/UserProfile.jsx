import React, { useState, useEffect, useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import { userService } from "../services/user/user.service.local.js"
import { orderService } from "../services/order/order.service.local.js"

export function UserProfile() {
    const user = userService.getLoggedinUser()
    const [userOrders, setUserOrders] = useState([])
    const PHUserOrders = []
    const orders = orderService.query().then(orders => {
        const findUserOrders = orders.filter(order => order.seller.id === user._id)
        findUserOrders.forEach(order => {
            PHUserOrders.push(order)
        });
        setUserOrders(PHUserOrders)
        
    })
    
    // const findUserOrders = (orders) => {
    //     const userOrders = orders.filter(order => order.seller.id === user._id)
    //     return userOrders 
    // }
    
    // const userOrders = orders.filter(order => order.seller.id === user._id)

    return (
        <section className="user-profile-container">
            <div className="user-details-container">
                <div className="user-card">
                    <div className="user-img">
                        <img src={user.imgUrl} alt="" />
                    </div>
                    <div className="user-profile-label">
                        {user.fullname}
                        @{user.username}
                    </div>
                    <div className="user-stats">
                        <ul className="user-stats-list">
                            <li className="user-location">Location in Israel</li>
                            <li className="user-join-date"> Joined in January 2025</li>
                        </ul>
                    </div>    
                </div>
            </div>
            <div className="manage-orders">
                <div className="manage-orders-header">
                    <h1>Manage Orders</h1>
                </div>
                <div className="orders-list">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <td>BUYER</td>
                                <td>GIG</td>
                                <td>DUE ON</td>
                                <td>TOTAL</td>
                                <td>STATUS</td> 
                            </tr>
                        </thead>
                        <tbody>
                           {userOrders.map(order => (
                            <tr key={order._id}>
                                <td>
                                    <div className="user-with-img">
                                        <img src={`${order.seller.imgUrl}`} alt="" />
                                        {order.seller.name}
                                    </div>
                                </td>
                                <td className="order-title">
                                    {order.order.title}
                                </td>
                                <td className="order-date">
                                    {order.orderDate}
                                </td>
                                <td className="order-total">
                                    ${order.order.price}
                                </td>
                                <td className="order-status">
                                    <span className={`label ${order.status}`}>{order.status}</span>
                                </td>
                            </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
    
}