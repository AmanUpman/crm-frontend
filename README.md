Mini CRM & Campaign Management App (Frontend)
This is the frontend of the Mini CRM & Campaign Management App, built using React.js and styled with Tailwind CSS. The app provides a user-friendly interface for managing customers, orders, audience segments, campaigns, and messages.

🚀 Features
Customer Management: Add, edit, view, and delete customer information.
Order Tracking: Manage and view customer orders.
Audience Segmentation: Create audience segments based on custom criteria.
Campaign Management: Create and send campaigns, track message statuses.
Message Logs: View logs of sent messages with delivery status updates.
User Profile: Display and manage user profile information.

🛠️ Tech Stack
Frontend: React.js
Styling: Tailwind CSS
State Management: React Hooks (useState, useEffect)
API Calls: Axios
Routing: React Router

📂 Folder Structure
frontend/
├── public/
│   ├── index.html
├── src/               
│   ├── components/         
│   │   ├── CustomerForm.jsx
│   │   ├── Navbar.jsx
│   │   └── OrderForm.jsx
│   ├── pages/               
│   │   ├── AudiencesPage.jsx
│   │   ├── CampaignsPage.jsx
│   │   ├── CustomersPage.jsx
│   │   ├── MessagePage.jsx
│   │   ├── OrdersPage.jsx
│   │   └── ProfilePage.jsx
│   ├── services/            
│   │   └── api.js
│   └── utils/                 
│       └── validationUtils.js
├── .env                      
├── package.json               
├── tailwind.config.js       
             
