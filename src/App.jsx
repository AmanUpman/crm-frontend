import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomersPage from './pages/CustomersPage';
import OrdersPage from './pages/OrdersPage';
import AudiencesPage from './pages/AudiencesPage';
import CampaignsPage from './pages/CampaignsPage';
import MessagePage from './pages/MessagePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
        <Route path="/" element={<CustomersPage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/audiences" element={<AudiencesPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/messages" element={<MessagePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
