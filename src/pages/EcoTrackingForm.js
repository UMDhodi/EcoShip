import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Leaf, AlertCircle } from 'lucide-react';

const EcoTrackingForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [package_id, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleOrderTracking = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!package_id.trim()) {
        throw new Error('Please enter a package ID');
      }

      // Fetch data.json from the public directory
      const response = await fetch('/data.json'); // Adjust the path if necessary
      if (!response.ok) {
        throw new Error('Failed to load data');
      }

      const data = await response.json();

      // Check if the package_id exists in the data
      const packageDetails = data.find(
        (item) => item['Package ID'] === package_id
      );

      if (!packageDetails) {
        throw new Error('Package ID not found');
      }

      // Navigate to the next page with the package details
      navigate('/main', { state: { packageDetails } });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center mb-2">
            <Leaf className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold">Green Delivery Tracking</h2>
          <p className="text-gray-500">Access your delivery tracking dashboard</p>
        </div>

        <div className="p-4">
          <form onSubmit={handleOrderTracking} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="packageId"
                className="block text-sm font-medium text-gray-700"
              >
                Package ID
              </label>
              <input
                id="packageId"
                type="text"
                placeholder="Enter your Package ID"
                value={package_id}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                'Track'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4 border border-red-200">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcoTrackingForm;
