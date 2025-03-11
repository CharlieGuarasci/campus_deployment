import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingsService } from '../services/listingsService';
import { Button } from "../components/ui/button";

const PostListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'GOOD',
    course_code: '',
    author: '',
    edition: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if there's any saved form data from a previous attempt
  useEffect(() => {
    const savedData = sessionStorage.getItem('pendingListing');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      sessionStorage.removeItem('pendingListing');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        // Save form data before redirecting
        sessionStorage.setItem('pendingListing', JSON.stringify(formData));
        navigate('/signin?returnTo=/post-listing');
        return;
      }

      // Create FormData object for multipart/form-data
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });

      const response = await listingsService.createListing(submitData);
      navigate('/marketplace');
    } catch (err) {
      console.error('Error creating listing:', err);
      setError(err.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Create a New Listing</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Code
            </label>
            <input
              type="text"
              name="course_code"
              value={formData.course_code}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g., CS101"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Book title"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Author name"
            />
          </div>

          {/* Edition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edition
            </label>
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g., 3rd Edition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Describe the condition, highlights, etc."
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="GOOD">Good</option>
              <option value="FAIR">Fair</option>
              <option value="POOR">Poor</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostListing;
