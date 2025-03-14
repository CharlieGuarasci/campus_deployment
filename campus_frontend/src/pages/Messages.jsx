import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { listingsService } from '../services/listingsService';

const Messages = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sellerId = searchParams.get('seller');
  const listingId = searchParams.get('listing');
  
  // Add selected conversation state
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);


  // Effect to handle new conversation from listing
  useEffect(() => {
    const initializeConversation = async () => {
      if (sellerId && listingId) {
        try {
          console.log("Initializing conversation with:", { sellerId, listingId });
          console.log("Current conversations:", conversations);
          
          // Fetch listing details
          const listingDetails = await listingsService.getListing(listingId);
          console.log("Fetched listing details:", listingDetails);
          
          if (!listingDetails) {
            console.error("No listing details found");
            return;
          }

          // Check if conversation already exists for this listing
          const existingConv = conversations.find(
            conv => conv.product?.id === parseInt(listingId)
          );
          
          console.log("Existing conversation found:", existingConv);

          if (existingConv) {
            console.log("Selecting existing conversation:", existingConv.id);
            setSelectedConversation(existingConv.id);
          } else {
            console.log("Creating new conversation");
            // Create new conversation with a unique ID
            const newConv = {
              id: Date.now(), // Use timestamp for unique ID
              user: {
                name: listingDetails.seller_name || 'Seller',
                avatar: null,
                lastMessage: '',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              },
              product: {
                id: parseInt(listingId),  // Ensure ID is a number
                title: listingDetails.title,
                price: `$${listingDetails.price}`,
                image: listingDetails.image ? `http://localhost:8000/media/${listingDetails.image.split('/media/')[1]}` : '/placeholder.png',
                seller: listingDetails.seller_name
              },
              messages: []
            };

            console.log("New conversation object:", newConv);
            setConversations(prev => {
              // Double check we're not adding a duplicate
              const isDuplicate = prev.some(conv => conv.product?.id === parseInt(listingId));
              console.log("Is duplicate check:", isDuplicate);
              if (isDuplicate) {
                return prev;
              }
              return [...prev, newConv];
            });
            setSelectedConversation(newConv.id);
          }
        } catch (error) {
          console.error('Error initializing conversation:', error);
        }
      }
    };

    initializeConversation();
  }, [sellerId, listingId, conversations]); // Added conversations to dependencies



  useEffect(() => {
    if (!selectedConversation) return;
    console.log(`🔄 Attempting WebSocket connection for conversation: ${selectedConversation}`);
  
    // Close existing WebSocket if open
    if (socketRef.current) {
      socketRef.current.close();
    }
  
    // Create a new WebSocket connection
    const token = localStorage.getItem("access_token"); // Assuming token is stored in localStorage
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${selectedConversation}/?token=${token}`);
    socketRef.current = ws;
  
    ws.onopen = () => {console.log("✅ Connected to WebSocket");};
  
    ws.onerror = (error) => {console.error("❌ WebSocket Error:", error);};

    ws.onmessage = (event) => {
      console.log("📩 WebSocket message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        console.log("✅ Parsed message:", data);
    
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConversation
              ? {
                  ...conv,
                  messages: [...conv.messages, data],
                  user: {
                    ...conv.user,
                    lastMessage: data.message,
                    timestamp: data.timestamp,
                  },
                }
              : conv
          )
        );
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };
  
    ws.onclose = () => {console.log("⚠️ WebSocket Disconnected");};
  
    // Cleanup function: Close WebSocket on component unmount or when `selectedConversation` changes
    return () => {
      console.log("🔌 Closing WebSocket...");
      ws.close();
    };
  }, [selectedConversation]); // Only depend on `selectedConversation`
  

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socketRef.current) return;

   
    const messageData = { message: newMessage.trim() };
    console.log("📤 Sending message:", messageData)
    try {
      socketRef.current.send(JSON.stringify(messageData));
      console.log("✅ Message sent successfully");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
    setNewMessage("");
  };


  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    }, [conversations]);

    const currentConversation = conversations.find(
      (conv) => conv.id === selectedConversation
    );
    
    if (!currentConversation) {
      return <div className="flex h-full items-center justify-center">Select a conversation to start messaging.</div>;
    }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      {/* Left Panel - Conversations */}
      <div className="w-[220px] bg-white border-r border-gray-200 relative">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900">Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-112px)]">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
              <p className="text-lg font-medium mb-1">No Messages Yet</p>
              <p className="text-sm text-center">Time to make some friends! Start by browsing listings and reaching out to sellers.</p>
            </div>
          ) : (
            conversations.map((conversation, index) => (
              <div
                key={`${conversation.id}-${index}`}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                  selectedConversation === conversation.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {conversation.user.name[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <div className="flex items-baseline justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{conversation.user.name}</p>
                        <p className="text-xs text-gray-500 ml-2 flex-shrink-0">{conversation.user.timestamp}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {conversation.user.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Product and Messages */}
      {currentConversation && (
        <div className="flex-1 flex flex-col bg-white">
          {/* Product Details */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-[72px] h-[72px] bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                {currentConversation.product.image ? (
                  <img
                    src={currentConversation.product.image}
                    alt={currentConversation.product.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div>
                <h2 className="text-base font-medium text-gray-900">
                  {currentConversation.product.title}
                </h2>
                <p className="text-sm text-gray-900">{currentConversation.product.price}</p>
                <p className="text-sm text-gray-500">
                  Seller: {currentConversation.product.seller}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Messages Thread */}
            <div id="messages-container" className="flex-1 overflow-y-auto px-4 py-3">
              {currentConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-2 ${
                    message.isSender ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`inline-block rounded-2xl px-3 py-2 max-w-[75%] ${
                      message.isSender
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-[11px] mt-1 ${
                        message.isSender ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages; 