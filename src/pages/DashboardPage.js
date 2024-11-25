import React from 'react';
import { Leaf, Map, Calendar, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// InfoCard Component
const InfoCard = ({ icon: Icon, title, value, className = '' }) => (
  <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="text-blue-500" size={20} />
      </div>
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

// DashboardPage Component
const DashboardPage = ({ selectedOption, orderDetails }) => {
  if (!selectedOption) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No delivery option selected. Please go back and select one.</p>
      </div>
    );
  }

  const emissions = selectedOption.emissions;
  const progressPercentage = Math.min((emissions / 20) * 100, 100); // Max scale is 6 kg CO₂.
  
  // Function to determine the color based on emissions
  const getColor = (value) => {
    if (value < 9) return '#38a169'; // Green for emissions less than 9 kg
    if (value >= 9 && value < 14) return '#fbbf24'; // Yellow for emissions between 9 and 14 kg
    return '#ef4444'; // Red for emissions greater than 14 kg
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="text-green-600" />
              <h1 className="text-xl font-bold">EcoShip Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6">Order Overview</h2>

        {/* Order Details */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <InfoCard icon={Package} title="Total Weight" value={`${orderDetails.totalWeight} kg`} />
          <InfoCard icon={Map} title="Delivery Distance" value={`${orderDetails.deliveryDistance} km`} />
          <InfoCard icon={Calendar} title="Estimated Delivery" value={orderDetails.estimatedDate} />
        </div>

        {/* Emissions Graph */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-bold mb-6">Carbon Emissions Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: 'Emissions', value: emissions }, { name: 'Car Equivalent', value: emissions * 4 }, { name: 'Trees Offset', value: emissions * 0.1 }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={getColor(emissions)} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Selected Method and Emissions */}
        <div className="bg-white rounded-lg shadow p-8 mt-8">
          <h2 className="text-xl font-bold mb-6">Selected Delivery Method</h2>
          <p className="text-lg text-gray-700">
            <span className="font-bold">Delivery Method:</span> {selectedOption.name}
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <span className="font-bold">Emissions:</span> {selectedOption.emissions} kg CO₂
          </p>

          {/* Progress Bar */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">Carbon Emissions Progress:</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className={`h-4 rounded-full`}
                style={{ width: `${progressPercentage}%`, backgroundColor: getColor(emissions) }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
