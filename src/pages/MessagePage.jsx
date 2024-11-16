import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const MessagePage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        setMessages(Array.isArray(response.data) ? response.data : []);  
        } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Message Logs</h1>
      <ul>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <li key={message._id} className="p-2 border-b">
              {`To: ${message.customerId} | Message: ${message.message} | Status: ${message.status}`}
            </li>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </ul>
    </motion.div>
  );
  
};

export default MessagePage;
