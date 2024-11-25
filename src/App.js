import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EcoTrackingForm from './pages/EcoTrackingForm';
import EcoDeliveryPage from './pages/EcoDeliveryPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [deliveryData, setDeliveryData] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    orderId: 'ORD-1528550',
    items: [
      { name: 'Laptop', weight: 12.5 },
      { name: 'Headphones', weight: 0.3 }
    ],
    totalWeight: 12.8,
    deliveryDistance: 150,
    estimatedDate: 'Nov 15 - Nov 20'
  });

  useEffect(() => {
    // Fetch delivery data from data.json
    const fetchDeliveryData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch data.json');
        const data = await response.json();
        setDeliveryData(data);
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      }
    };

    fetchDeliveryData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <EcoTrackingForm setOrderDetails={setOrderDetails} />
          }
        />
        <Route
          path="/main"
          element={
            <EcoDeliveryPage
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              orderDetails={orderDetails}
              deliveryData={deliveryData} // Pass fetched data here
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              selectedOption={selectedOption}
              orderDetails={orderDetails}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
