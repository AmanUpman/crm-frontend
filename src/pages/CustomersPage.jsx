import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import CustomerForm from '../components/CustomerForm';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        console.log(response.data); // Log the response to inspect its structure
        setCustomers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerCreated = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditCustomer(customer);
  };

  const handleUpdateCustomer = async (updatedCustomer) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/customers/${updatedCustomer._id}`, updatedCustomer);
      setCustomers(customers.map(customer => customer._id === updatedCustomer._id ? response.data : customer));
      setEditCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <CustomerForm onCustomerCreated={handleCustomerCreated} />
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Phone</th>
            <th className="border px-4 py-2 text-left">Total Spending</th>
            <th className="border px-4 py-2 text-left">Orders Count</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customers) && customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer._id}>
                <td className="border px-4 py-2">{customer.name}</td>
                <td className="border px-4 py-2">{customer.email}</td>
                <td className="border px-4 py-2">{customer.phone}</td>
                <td className="border px-4 py-2">{customer.totalSpending}</td>
                <td className="border px-4 py-2">{customer.orders.length}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditCustomer(customer)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer._id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border px-4 py-2 text-center">
                No customers available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {editCustomer && (
        <div className="mt-4 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateCustomer(editCustomer);
          }}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={editCustomer.name}
                onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editCustomer.email}
                onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={editCustomer.phone}
                onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Update</button>
            <button
              type="button"
              onClick={() => setEditCustomer(null)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

export default CustomersPage;
