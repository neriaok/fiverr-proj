import React, { useEffect, useState } from 'react';
import { orderService } from '../services/order/order.service.local';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('table');  // 'table' or 'cards'
  const [error, setError] = useState(null);

  // Fetch orders from orderService
  useEffect(() => {
    async function fetchOrders() {
      try {
        const fetchedOrders = await orderService.query(); // Get orders from your service
        setOrders(fetchedOrders);
      } catch (err) {
        setError('Failed to load orders');
        console.error(err);
      }
    }
    fetchOrders();
  }, [orders]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  const renderTableView = () => {
    return (
      <table className="table">
        <thead>
          <tr className="table-row">
            <td className="table-header">Seller</td>
            <td className="table-header">Gig</td>
            <td className="table-header">Packege</td>
            <td className="table-header">Category</td>
            <td className="table-header">Due on</td>
            <td className="table-header">Total</td>
            <td className="table-header last">Status</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="table-row">
              <td className="table-cell">
                <div className="seller-container">
                  <img
                    className="seller-img"
                    src={order.seller.imgUrl}
                    alt={`Profile picture of ${order.seller.name}`}
                  />
                  {order.seller.name}
                </div>
              </td>
              <td className="table-cell name">
                <div className="name-container">
                  <img
                    className="order-img"
                    src={order.order.img}
                    alt={`Image of the order titled ${order.order.title}`}
                  />
                  {order.order.title}
                </div>
              </td>
              <td className="table-cell">{order.package} package</td>
              {/* <td className="table-cell">{order.category}</td> */}
              <td className="table-cell">{order.category.includes('&') ? order.category.split('&').map(word => word.trim()).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('\n') : order.category }</td>
              <td className="table-cell">{order.orderDate}</td>
              <td className="table-cell">₪{order.order.price}</td>
              <td className="table-cell last">
                <span className={`${order.status === 'Pending' ? 'pending' : order.status === 'Rejected' ? 'rejected' : 'fulfill'}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderCardView = () => {
    return (
      <div className="card-layout">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="card-row header">
              <div><strong>Order Status</strong></div>
              <div className={`card-${order.status === 'Pending' ? 'pending' : order.status === 'Rejected' ? 'rejected' : 'fulfill'}`}>
                {order.status}
              </div>
              <div><strong>Due Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</div>
              <div className="progress-bar"><div className="progress progress-line" style={{ backgroundColor: 'orange' }}></div></div>
            </div>

            <div className="card-row body">
              <img
                className="order-img"
                src={order.order.img}
                alt={`Image of the order titled ${order.order.title}`}
              />
              <div className="body-text">
                <p>{order.order.title}</p>
                <p>{order.category}</p>
                <p>from {order.seller.name}</p>
              </div>
            </div>

            <div className="card-row footer">
              <p><strong>ORDER:</strong> {order.serialNumber}</p>
              <p><strong>DELIVERY TIME:</strong> {order.deliveryTime}</p>

            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="gray-background main-container full">
    <div className="orders-container">
      <div className="order-above">
        <h3>ORDERS</h3>

        {/* Buttons to switch between table and card view */}
        <div className="view-buttons">
          <button onClick={() => setView('cards')}>
            <img src="./img/icons/cards.jpg" alt="" />
          </button>
          <button onClick={() => setView('table')}>
            <img src="./img/icons/table.jpg" alt="" />
          </button>
        </div>
      </div>

      {/* Conditionally render the view */}
      {view === 'table' ? renderTableView() : renderCardView()}
    </div>
    </div>
  );
}
