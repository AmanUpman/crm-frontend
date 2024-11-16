import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import OrderForm from '../components/OrderForm';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderCreated = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <OrderForm onOrderCreated={handleOrderCreated} />
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Order ID</th>
            <th className="border px-4 py-2 text-left">Customer Name</th>
            <th className="border px-4 py-2 text-left">Order Amount</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.customerId ? order.customerId.name : 'N/A'}</td>
                <td className="border px-4 py-2">{order.orderAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">
                No orders available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default OrdersPage;
