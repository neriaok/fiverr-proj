import React, { useEffect, useState } from 'react';
import { orderService } from '../services/order/order.service.local';

export function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from orderService
  useEffect(() => {
    async function fetchOrders() {
      const fetchedOrders = await orderService.query(); // Get orders from your service
      setOrders(fetchedOrders);
    }
    fetchOrders();
  }, []);

  return (
    
    <div className="table-container">
        <h2>Orders</h2>
        <table className="table">
          <thead>
            <tr className="table-row">
              <td className="table-header">SELLER</td>
              <td className="table-header">GIG</td>
              <td className="table-header">PACKAGE</td>
              <td className="table-header">CATEGORY</td>
              <td className="table-header">DUE ON</td>
              <td className="table-header">TOTAL</td>
              <td className="table-header">STATUS</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="table-row">
                <td className="table-cell">
                  <div className='seller-container'>
                    <img className="seller-img" src={order.seller.imgUrl} alt="" />
                    {order.seller.name}
                  </div>
                </td>
                <td className="table-cell name">
                  <div className="name-container">
                    <img className="order-img" src={order.order.img} alt="" />
                    {order.order.title}
                  </div>
                </td>
                <td className="table-cell">{order.package} package</td>
                <td className="table-cell">{order.category}</td>
                <td className="table-cell">{order.orderDate}</td>
                <td className="table-cell">₪{order.order.price}</td>
                <td className="table-cell">
                  <span className={`status ${order.status === 'Pending' ? 'pending' : 'fulfill'}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
