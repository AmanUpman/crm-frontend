import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AudiencesPage = () => {
  const [audiences, setAudiences] = useState([]);
  const [newSegment, setNewSegment] = useState({ name: '', conditions: '' });

  // Fetch existing audiences when the component mounts
  useEffect(() => {
    const fetchAudiences = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/audiences');
        console.log(response.data); // Log the response for debugging
        setAudiences(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching audiences:', error);
      }
    };
    fetchAudiences();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewSegment({ ...newSegment, [e.target.name]: e.target.value });
  };

  // Handle form submission for creating a new audience segment
  const handleCreateSegment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/audiences', {
        name: newSegment.name,
        criteria: JSON.parse(newSegment.conditions), // Parse the JSON criteria
      });
      console.log(response.data);
      setAudiences([...audiences, response.data]);
      setNewSegment({ name: '', conditions: '' }); // Reset the form
    } catch (error) {
      console.error('Error creating audience:', error);
      alert('Error: Ensure the conditions are in valid JSON format');
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Audiences</h1>

      {/* Form to create a new audience segment */}
      <form onSubmit={handleCreateSegment} className="p-4 border rounded shadow mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Segment Name</label>
          <input
            type="text"
            name="name"
            value={newSegment.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Conditions (JSON format)</label>
          <textarea
            name="conditions"
            value={newSegment.conditions}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder='Example: [{"field": "totalSpending", "operator": "gt", "value": 10000}]'
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Audience</button>
      </form>

      {/* Displaying the audience segments in a table */}
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Segment Name</th>
            <th className="border px-4 py-2 text-left">Criteria</th>
            <th className="border px-4 py-2 text-left">Size</th>
          </tr>
        </thead>
        <tbody>
          {audiences.length > 0 ? (
            audiences.map((audience) => (
              <tr key={audience._id}>
                <td className="border px-4 py-2">{audience.name}</td>
                <td className="border px-4 py-2">
                  {/* Displaying conditions in a readable format */}
                  <pre>{JSON.stringify(audience.criteria, null, 2)}</pre>
                </td>
                <td className="border px-4 py-2">{audience.size}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border px-4 py-2 text-center">
                No audiences available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AudiencesPage;
