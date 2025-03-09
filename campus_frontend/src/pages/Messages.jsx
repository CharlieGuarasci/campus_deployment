import React, { useState } from 'react';

const Messages = () => {
  // Add selected conversation state
  const [selectedConversation, setSelectedConversation] = useState(1);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: null,
        lastMessage: 'Is this still available?',
        timestamp: '2:30 PM'
      },
      product: {
        id: 1,
        title: 'Calculus Early Transcendentals',
        price: '$75',
        image: '/placeholder-book.jpg',
        seller: 'Alice Johnson'
      },
      messages: [
        {
          id: 1,
          sender: 'John Doe',
          content: 'Hi, is this textbook still available?',
          timestamp: '2:30 PM',
          isSender: false
        },
        {
          id: 2,
          sender: 'You',
          content: 'Yes, it is! Are you interested in buying it?',
          timestamp: '2:31 PM',
          isSender: true
        },
        {
          id: 3,
          sender: 'John Doe',
          content: 'Great! Could we meet tomorrow to exchange?',
          timestamp: '2:33 PM',
          isSender: false
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        avatar: null,
        lastMessage: 'Great, I can meet tomorrow',
        timestamp: '1:45 PM'
      },
      product: {
        id: 2,
        title: 'Physics for Scientists and Engineers',
        price: '$65',
        image: '/placeholder-book.jpg',
        seller: 'Bob Wilson'
      },
      messages: [
        {
          id: 1,
          sender: 'Jane Smith',
          content: 'Hello! Is the physics textbook still for sale?',
          timestamp: '1:30 PM',
          isSender: false
        },
        {
          id: 2,
          sender: 'You',
          content: 'Yes, it is! When would you like to meet?',
          timestamp: '1:40 PM',
          isSender: true
        },
        {
          id: 3,
          sender: 'Jane Smith',
          content: 'Great, I can meet tomorrow',
          timestamp: '1:45 PM',
          isSender: false
        }
      ]
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  // Get current conversation
  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Create new message object
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessageObj = {
      id: currentConversation.messages.length + 1,
      sender: 'You',
      content: newMessage.trim(),
      timestamp: currentTime,
      isSender: true
    };

    // Update conversations with new message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: [...conv.messages, newMessageObj],
          user: {
            ...conv.user,
            lastMessage: newMessage.trim(),
            timestamp: currentTime
          }
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setNewMessage('');
  };

  // Auto-scroll to bottom when new message is added
  React.useEffect(() => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [currentConversation?.messages]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      {/* Left Panel - Conversations */}
      <div className="w-[220px] bg-white border-r border-gray-200 relative">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900">Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-112px)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
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
          ))}
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
                  className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition"
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