import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";
import { listingsService } from '../services/listingsService';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { searchTerm } = useSearch();

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

  const filteredListings = listings.filter(listing => {
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(listing.category);
    const matchesSearch = searchTerm.trim() === '' || 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.price.toString().includes(searchTerm);
    
    return matchesCategories && matchesSearch;
  });

  const handleFiltersSubmit = (filters) => {
    console.log('Applying filters:', filters);
    setSelectedCategories(filters.categories || []);
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        <div className="fixed top-16 left-0 bottom-0 z-30 hidden sm:block">
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} onFiltersSubmit={handleFiltersSubmit} />
        </div>
        <main className={`flex-1 transition-all duration-300 sm:${isCollapsed ? 'ml-12' : 'ml-64'} ml-0`}>
          <div className="p-6 bg-gray-50 min-h-full flex items-center justify-center">
            <p className="text-gray-600">Loading listings...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        <div className="fixed top-16 left-0 bottom-0 z-30 hidden sm:block">
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
        <main className={`flex-1 transition-all duration-300 sm:${isCollapsed ? 'ml-12' : 'ml-64'} ml-0`}>
          <div className="p-6 bg-gray-50 min-h-full flex items-center justify-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full">
      <div className="fixed top-16 left-0 bottom-0 z-30 hidden sm:block">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} onFiltersSubmit={handleFiltersSubmit} />
      </div>
      <main className={`flex-1 transition-all duration-300 sm:${isCollapsed ? 'ml-12' : 'ml-64'} ml-0`}>
        <div className="p-6 pb-24 sm:pb-6 bg-gray-50 min-h-full">
          {filteredListings.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600">No listings found</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Post Listing Card */}
              <div 
                onClick={() => navigate('/post-listing')}
                className="hidden sm:block border-2 border-dashed border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-lg hover:border-black transition-all duration-200 bg-white cursor-pointer"
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

              {filteredListings.map((listing) => (
                <BookCard 
                  key={listing.id} 
                  {...listing} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
