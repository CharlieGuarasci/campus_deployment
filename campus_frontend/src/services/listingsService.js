import axios from 'axios';

const API_URL = 'http://localhost:8000/api/listings/';

export const listingsService = {
  getAllListings: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  },

  getListing: async (id) => {
    try {
      const response = await axios.get(`${API_URL}${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw error;
    }
  },

  createListing: async (listingData, category) => {
    try {
      let endpoint = API_URL;
      switch (category) {
        case "BOOKS":
          endpoint += "books/";
          break;
        case "SUBLETS":
          endpoint += "sublets/";
          break;
        case "ROOMMATES":
          endpoint += "roommates/";
          break;
        case "RIDESHARE":
          endpoint += "rideshare/";
          break;
        case "EVENTS":
        case "OTHER":
          endpoint += "events/";
          break;
        default:
          break;
      }
      const response = await axios.post(endpoint, listingData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  },

  updateListing: async (id, listingData) => {
    try {
      const response = await axios.put(`${API_URL}${id}/`, listingData);
      return response.data;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  },

  deleteListing: async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  },
};
