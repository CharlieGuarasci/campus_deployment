import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const listingsService = {
  getAllListings: async () => {
    try {
      console.log('Fetching listings from:', `${API_URL}/listings/listings`);
      const response = await axios.get(`${API_URL}/listings/listings`);
      console.log('Listings response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error.response || error);
      throw error;
    }
  },

  createListing: async (listingData) => {
    try {
      const response = await axios.post(`${API_URL}/listings/`, listingData, {
        headers: {
          'Content-Type': 'multipart/form-data', // For handling image uploads
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  },

  getListing: async (id) => {
    try {
      console.log('Fetching listing details from:', `${API_URL}/listings/listings/${id}`);
      const response = await axios.get(`${API_URL}/listings/listings/${id}`);
      console.log('Listing detail response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching listing:', error.response || error);
      throw error;
    }
  },

  updateListing: async (id, listingData) => {
    try {
      const response = await axios.put(`${API_URL}/listings/${id}/`, listingData);
      return response.data;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  }
}; 