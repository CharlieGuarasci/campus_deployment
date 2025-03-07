import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";
import { listingsService } from '../services/listingsService';

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = async () => {
    try {
      console.log('Starting to fetch listings...');
      const data = await listingsService.getAllListings();
      console.log('Received listings:', data);
      setListings(data);
      setLoading(false);
    } catch (err) {
      console.error('Error in Marketplace:', err);
      setError(err.message || 'Failed to fetch listings');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Loading listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        {listings.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">No listings found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {listings.map((listing) => (
              <BookCard 
                key={listing.id} 
                {...listing} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
