import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShareModal = ({ isOpen, onClose, listing }) => {
  const [message, setMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSendMessage = () => {
    // TODO: Implement sending message to selected users
    console.log('Sending message to:', selectedUsers);
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    onClose();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  const handleShare = (platform) => {
    const text = `Check out this listing: ${listing.title}`;
    const url = window.location.href;

    switch (platform) {
      case 'imessage':
        window.location.href = `sms:&body=${encodeURIComponent(`${text} ${url}`)}`;
        break;
      case 'instagram':
        // Open Instagram stories with the listing image
        // Note: This requires Instagram's sharing SDK
        break;
      case 'messenger':
        window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_FB_APP_ID`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Share Listing</h2>
              <div onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* Message to Users Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Send to Campus Users
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a message (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                rows="3"
              />
              <button
                onClick={handleSendMessage}
                className="mt-2 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Send
              </button>
            </div>

            {/* Quick Share Options */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Share via</h3>
              <div className="grid grid-cols-4 gap-4">
                <div
                  onClick={() => handleShare('imessage')}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-1 transform transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-xs group-hover:text-gray-900">iMessage</span>
                </div>

                <div
                  onClick={() => handleShare('instagram')}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white mb-1 transform transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-xs group-hover:text-gray-900">Instagram</span>
                </div>

                <div
                  onClick={() => handleShare('messenger')}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-1 transform transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.01 7.428l-3.01 3.01-1.19-1.19c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.19 1.19-3.01 3.01c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l3.01-3.01 1.19 1.19c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.19-1.19 3.01-3.01c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0z"/>
                    </svg>
                  </div>
                  <span className="text-xs group-hover:text-gray-900">Messenger</span>
                </div>

                <div
                  onClick={handleCopyLink}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white mb-1 transform transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs group-hover:text-gray-900">Copy Link</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up">
          Link successfully copied!
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ShareModal; 