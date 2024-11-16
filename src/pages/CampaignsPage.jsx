import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignsPage = () => {
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    segments: '',
    messageTemplate: '',
    status: 'Pending',
    audienceSegmentId: '',
  });

  const [campaigns, setCampaigns] = useState([]);
  const [messages, setMessages] = useState([]);
  const [statistics, setStatistics] = useState({ audienceSize: 0, sent: 0, failed: 0 });
  const [error, setError] = useState('');

  // Fetch campaigns when the component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  // Fetch statistics for a specific campaign
  const handleFetchStatistics = async (campaignId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/statistics/${campaignId}`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching campaign statistics:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewCampaign({
      ...newCampaign,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for creating a new campaign
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const segmentsArray = newCampaign.segments.split(',').map((segment) => segment.trim());

      const response = await axios.post('http://localhost:5000/api/campaigns', {
        name: newCampaign.name,
        segments: segmentsArray,
        messageTemplate: newCampaign.messageTemplate,
        status: newCampaign.status,
        audienceSegmentId: newCampaign.audienceSegmentId,
      });

      // After creating a campaign, fetch campaigns again to update the list
      const updatedCampaigns = await axios.get('http://localhost:5000/api/campaigns');
      setCampaigns(updatedCampaigns.data);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  // Function to send campaign messages by campaignId
  const handleSendMessages = async (campaignId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/messages/send', {
        campaignId,
      });
      console.log(response.data);
      alert('Messages are being processed');
    } catch (error) {
      console.error('Error sending campaign messages:', error);
    }
  };

  // Function to fetch campaign messages by campaignId
  const handleFetchMessages = async (campaignId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages?campaignId=${campaignId}`);
      setMessages(response.data.logs);
    } catch (error) {
      console.error('Error fetching campaign messages:', error);
      setError('Error fetching messages');
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Campaign</h1>
      <form onSubmit={handleCreateCampaign}>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Campaign Name</label>
          <input
            type="text"
            name="name"
            value={newCampaign.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Audience Segments (comma-separated)</label>
          <input
            type="text"
            name="segments"
            value={newCampaign.segments}
            onChange={handleInputChange}
            required
            placeholder="e.g., Segment A, Segment B"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Message Template</label>
          <textarea
            name="messageTemplate"
            value={newCampaign.messageTemplate}
            onChange={handleInputChange}
            required
            placeholder="e.g., 'Welcome [Name], you're eligible for 10% off!'"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Audience Segment ID</label>
          <input
            type="text"
            name="audienceSegmentId"
            value={newCampaign.audienceSegmentId}
            onChange={handleInputChange}
            required
            placeholder="Audience Segment ID"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={newCampaign.status}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Active">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Campaign
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Existing Campaigns</h2>
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Campaign Name</th>
            <th className="border px-4 py-2 text-left">Message</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Audience Size</th>
            <th className="border px-4 py-2 text-left">Sent</th>
            <th className="border px-4 py-2 text-left">Failed</th>
            <th className="border px-4 py-2 text-left">Action</th>
            <th className="border px-4 py-2 text-left">View Messages</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td className="border px-4 py-2">{campaign.campaignName}</td>
                <td className="border px-4 py-2">{campaign.messageContent}</td>
                <td className="border px-4 py-2">{campaign.status}</td>
                <td className="border px-4 py-2">{campaign.stats.audienceSize}</td>
                <td className="border px-4 py-2">{campaign.stats.sent}</td>
                <td className="border px-4 py-2">{campaign.stats.failed}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      handleSendMessages(campaign._id);
                      handleFetchStatistics(campaign._id);
                    }}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md"
                  >
                    Send Messages
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleFetchMessages(campaign._id)} 
                    className="bg-green-600 text-white py-2 px-4 rounded-md"
                  >
                    View Messages
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="border px-4 py-2 text-center">
                No campaigns available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="text-2xl font-bold mt-8 mb-4">Campaign Messages</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Customer Name</th>
            <th className="border px-4 py-2 text-left">Message</th>
            <th className="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((log) => (
              <tr key={log._id}>
                <td className="border px-4 py-2">{log.customerId.name}</td>
                <td className="border px-4 py-2">{log.message}</td>
                <td className="border px-4 py-2">{log.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border px-4 py-2 text-center">No messages found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignsPage;
