import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";
import { listingsService } from '../services/listingsService';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
            {/* Post Listing Card */}
            <div 
              onClick={() => navigate('/post-listing')}
              className="border-2 border-dashed border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-lg hover:border-black transition-all duration-200 bg-white cursor-pointer"
            >
              {/* Image Section */}
              <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center border-2  border-gray-300">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mb-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <p className="text-lg font-medium text-gray-600">Post Listing</p>
                  <p className="text-sm text-gray-400 mt-1">Sell What You Don't Need</p>
                </div>
              </div>

              {/* Empty space to match BookCard layout */}
              <h3 className="text-lg font-bold text-transparent mb-1">Course</h3>
              <div className="mb-2">
                <p className="text-sm text-transparent">Title</p>
              </div>
              <p className="text-2xl font-bold text-transparent mb-2">Price</p>
              <div className="h-[26px]"></div> {/* Space for condition badge */}
            </div>

            {listings.map((listing) => {
              console.log('Rendering listing:', listing.id);
              return (
                <BookCard 
                  key={listing.id} 
                  {...listing} 
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
