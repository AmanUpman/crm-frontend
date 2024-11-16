import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      className="bg-blue-600 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="flex space-x-4 text-white">
        <li><Link to="">Customers</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/audiences">Audiences</Link></li>
        <li><Link to="/campaigns">Campaigns</Link></li>
        {/* <li><Link to="/profile">Profile</Link></li> */}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
