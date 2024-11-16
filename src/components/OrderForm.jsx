import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ onOrderCreated }) => {
  const [formData, setFormData] = useState({ customerId: '', orderAmount: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/orders', formData);
      onOrderCreated(response.data);
      setFormData({ customerId: '', orderAmount: '' });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <div className="mb-4">
        <label className="block text-gray-700">Customer ID</label>
        <input
          type="text"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Order Amount</label>
        <input
          type="number"
          name="orderAmount"
          value={formData.orderAmount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Order</button>
    </form>
  );
};

export default OrderForm;
