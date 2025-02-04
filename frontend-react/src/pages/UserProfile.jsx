import React, { useState, useEffect, useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import { userService } from "../services/user/user.service.local.js"
import { orderService } from "../services/order/order.service.local.js"
import { OrderDetails } from "../cmps/OrderDetails.jsx"

export function UserProfile() {
    const user = userService.getLoggedinUser()
    const [userOrders, setUserOrders] = useState([])
    const [ isModal, setIsModal ] = useState(false) // continue here 
    const [ orderToModal, setOrderToModal ] = useState({})
    const PHUserOrders = []
    const orders = orderService.query().then(orders => {
        const findUserOrders = orders.filter(order => order.seller.id === user._id)
        findUserOrders.forEach(order => {
            PHUserOrders.push(order)
        });
        setUserOrders(PHUserOrders)
        
    })

    const closeModal = () => {
        // if(isModal === true) return
        console.log('modal closing');
        
        setOrderToModal({})
        setIsModal(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(event.target.closest('.order-modal') === null && event.target.closest('.order-tr') === null) {
                closeModal()
            }
        }
        
        if(isModal) {
            document.addEventListener('click', handleClickOutside)
        } else {
            document.removeEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isModal])

    const setModal = (order) => {
        setOrderToModal(order)
        setIsModal(true)
        console.log('modal is set');
        
        // window.addEventListener('click', closeModal)
    }
    
    // const findUserOrders = (orders) => {
    //     const userOrders = orders.filter(order => order.seller.id === user._id)
    //     return userOrders 
    // }
    
    // const userOrders = orders.filter(order => order.seller.id === user._id)

    return (
        <section className="user-profile-container">
            {isModal && <OrderDetails order={orderToModal} />}
            <div className="user-details-container">
                <div className="user-card">
                    <div className="user-img">
                        <img src={user.imgUrl} alt="" />
                    </div>
                    <div className="user-profile-label">
                        <span className="fullname">{user.fullname}</span>
                        <span className="username">@{user.username}</span>
                    </div>
                    <div className="user-stats">
                        <ul className="user-stats-list">
                            <li className="user-location"><span>Location in</span> <span className="loc">Israel</span></li>
                            <li className="user-join-date"><span>Joined in</span> <span className="date">January 2025</span></li>
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
                            <tr className="order-tr" key={order._id} onClick={() => setModal(order)}>
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