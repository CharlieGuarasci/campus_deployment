import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingsService } from '../services/listingsService';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Category color and label mappings
  const categoryColors = {
    'BOOKS': "bg-blue-100 text-blue-800",
    'SUBLETS': "bg-indigo-100 text-indigo-800",
    'ROOMMATES': "bg-purple-100 text-purple-800",
    'RIDESHARE': "bg-cyan-100 text-cyan-800",
    'EVENTS': "bg-pink-100 text-pink-800",
    'OTHER': "bg-gray-100 text-gray-800",
  };

  const categoryLabels = {
    'BOOKS': "Books",
    'SUBLETS': "Sublets",
    'ROOMMATES': "Roommates",
    'RIDESHARE': "Rideshare and Travel",
    'EVENTS': "Events",
    'OTHER': "Other",
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await listingsService.getListing(id);
        setListing(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch listing details');
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  if (!listing) return null;

  const imageUrl = listing.image ? `http://localhost:8000/media/${listing.image.split('/media/')[1]}` : "/placeholder.png";

  const getConditionBadgeColor = (condition) => {
    if (!condition) return "bg-gray-100 text-gray-800"; 
    switch (condition.toUpperCase()) {
      case 'GOOD': return 'bg-green-100 text-green-800';
      case 'FAIR': return 'bg-yellow-100 text-yellow-800';
      case 'POOR': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Listings
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="p-4 sm:p-6 flex items-center justify-center bg-white">
              <div className="relative w-full aspect-square max-h-[500px]">
                <img
                  src={imageUrl}
                  alt={listing.title}
                  className="absolute inset-0 w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="p-4 sm:p-8">
              {/* Title and Course Section */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Category Badge */}
                  {listing.category && (
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[listing.category] || "bg-gray-200 text-gray-700"}`}>
                      {categoryLabels[listing.category] || listing.category}
                    </span>
                  )}
                  {/* Condition Badge - Only show if condition exists and is not empty/null */}
                  {listing.condition && listing.condition !== '' && listing.condition !== null && (
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getConditionBadgeColor(listing.condition)}`}>
                      {listing.condition}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">${listing.price}</h2>
                </div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{listing.title}</h1>
                {listing.course_code && (
                  <p className="text-base sm:text-lg text-emerald-600 font-medium">{listing.course_code}</p>
                )}
              </div>

              {/* Book Details */}
              <div className="space-y-4 mb-6 sm:mb-8">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {listing.author && (
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500">Author</p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">{listing.author}</p>
                    </div>
                  )}
                  {listing.edition && (
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500">Edition</p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">{listing.edition}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3">Description</h3>
                <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">{listing.description}</p>
              </div>

              {/* Seller Profile */}
              <div className="mb-6 sm:mb-8 bg-gray-50 rounded-lg p-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">About the Seller</h3>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      {listing.seller_avatar ? (
                        <img
                          src={`http://localhost:8000${listing.seller_avatar}`}
                          alt={listing.seller_name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-medium text-gray-600">
                          {listing.seller_name ? listing.seller_name[0].toUpperCase() : 'S'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-gray-900">{listing.seller_name || 'Anonymous'}</h4>
                    {listing.seller_program && (
                      <p className="text-sm text-gray-600 mt-1">
                        {listing.seller_program} • {listing.seller_year_of_study}
                      </p>
                    )}
                    {listing.seller_bio && (
                      <p className="text-sm text-gray-600 mt-2">{listing.seller_bio}</p>
                    )}
                    <div className="mt-3 flex items-center space-x-4">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{listing.seller_listing_count || 0}</span> listings
                      </div>
                      <div className="text-sm text-gray-600">
                        Member since {new Date(listing.seller_joined_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-4 sticky bottom-0 bg-white pt-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static">
                <button
                  onClick={() => {
                    const userData = localStorage.getItem('user');
                    if (!userData) {
                      navigate('/signin?returnTo=' + encodeURIComponent(window.location.pathname));
                      return;
                    }
                    navigate(`/messages?seller=${listing.seller_id}&listing=${listing.id}`);
                  }}
                  className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-grey-500 transition-colors flex items-center justify-center text-base sm:text-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Seller
                </button>
                
                <button
                  onClick={() => window.open(`mailto:?subject=Check out this listing: ${listing.title}&body=I found this item on Campus Marketplace: ${window.location.href}`)}
                  className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-grey-500 transition-colors flex items-center justify-center text-base sm:text-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail; 