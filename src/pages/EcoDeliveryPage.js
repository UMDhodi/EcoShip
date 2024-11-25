import React, { useState } from 'react';
import { 
  Leaf, 
  Truck, 
  AlertTriangle, 
  Package, 
  Map, 
  Calendar, 
  ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// DeliveryOption Component
const DeliveryOption = ({ option, selected, onSelect, className = '' }) => {
  const getEmissionColor = (emissions) => {
    if (emissions <= 9) return 'bg-green-500';
    if (emissions <= 14) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const calculateTreeOffset = (emissions) => emissions * 0.1;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-md
        ${selected ? 'border-blue-500 bg-blue-50' : 'border-transparent'}
        ${className}`}
      onClick={() => onSelect(option)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {option.type === 'green' ? (
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="text-green-600" size={24} />
              </div>
            ) : (
              <div className="p-2 bg-gray-100 rounded-lg">
                <Truck size={24} />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg">{option.name}</h3>
              <p className="text-gray-600">Delivery in {option.time}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getEmissionColor(option.emissions)}`}
                style={{ width: `${(option.emissions / 20) * 100}%` }} // Scaled to fit the range visually
              />
            </div>
            <p className="text-sm mt-2 text-gray-600">
              {option.emissions} kg CO₂ emissions
            </p>
          </div>
        </div>

        {selected && (
          <div className="mt-4 bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-yellow-600" size={18} />
              <p className="text-gray-700 font-medium">Environmental Impact</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Car Travel Equivalent</p>
                <p className="text-lg font-bold">{(option.emissions * 4).toFixed(1)} km</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Trees Needed (1 year)</p>
                <p className="text-lg font-bold">{calculateTreeOffset(option.emissions).toFixed(1)} trees</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// EcoDeliveryPage Component
const EcoDeliveryPage = ({ selectedOption, setSelectedOption }) => {
  const navigate = useNavigate();

  const handleDeliverySelection = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const orderDetails = {
    orderId: "ORD-1528550",
    items: [
      { name: "Laptop", weight: 12.5 },
      { name: "Headphones", weight: 0.3 }
    ],
    totalWeight: 12.8,
    deliveryDistance: 150.2,
    estimatedDate: "25 Nov - 30 Nov"
  };

  const deliveryOptions = [
    {
      id: 1,
      name: 'Express Delivery',
      time: '1-2 days',
      emissions: 15.2,
      type: 'standard'
    },
    {
      id: 2,
      name: 'Standard Delivery',
      time: '3-5 days',
      emissions: 10.8,
      type: 'standard'
    },
    {
      id: 3,
      name: 'Eco-Friendly Delivery',
      time: '5-7 days',
      emissions: 7.5,
      type: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="text-green-600" />
              <h1 className="text-xl font-bold">EcoShip</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm">
                Order ID: <span className="font-medium">{orderDetails.orderId}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <InfoCard icon={Package} title="Total Weight" value={`${orderDetails.totalWeight} kg`} />
          <InfoCard icon={Map} title="Delivery Distance" value={`${orderDetails.deliveryDistance} km`} />
          <InfoCard icon={Calendar} title="Estimated Delivery" value={orderDetails.estimatedDate} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-bold mb-6">Choose Your Delivery Option</h2>
          <div className="space-y-4">
            {deliveryOptions.map((option) => (
              <DeliveryOption
                key={option.id}
                option={option}
                selected={selectedOption?.id === option.id}
                onSelect={handleDeliverySelection}
              />
            ))}
          </div>
          <button
          onClick={handleContinue}
            className="mt-8 w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-medium
              flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedOption}
          >
            Continue to Dashboard
            <ArrowRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};


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

export default EcoDeliveryPage;
