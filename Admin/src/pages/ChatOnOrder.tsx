import React, { useState } from "react";
import {
  ChatSidebar,
  ChatHeader,
  ChatMessages,
  MessageInput,
  CartSidebar,
  CatalogueSidebar,
  EmptyState,
  type Chat,
  type Message,
} from "../components/ChatOnOrder";

const ChatOnOrder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"active" | "closed">("active");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showCatalogue, setShowCatalogue] = useState(false);

  const chats: Chat[] = [
    {
      id: 1,
      name: "Ali Raza",
      status: "active",
      assignedAgent: "Alice Brown",
      lastMessage: "Kya aapke pass wireless headphones available hain?",
      timestamp: "2:30 PM",
      unreadCount: 2,
      phone: "+92 300 1234567",
      email: "ali.raza@example.com",
      cartItems: [
        {
          id: 1,
          name: "TechPro Wireless Headphones",
          price: 1299,
          quantity: 1,
          image:
            "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100",
        },
        {
          id: 2,
          name: "Phone Case",
          price: 299,
          quantity: 2,
          image:
            "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=100",
        },
      ],
      messages: [
        {
          id: 1,
          content:
            "Assalam-o-alaikum! Kya aapke pass wireless headphones available hain?",
          timestamp: "2:25 PM",
          sender: "customer",
        },
        {
          id: 2,
          content:
            "Ji bilkul! Humare pass TechPro wireless headphones available hain. Price ₹1299 hai.",
          timestamp: "2:28 PM",
          sender: "agent",
        },
        {
          id: 3,
          content: "Kya aapke pass wireless headphones available hain?",
          timestamp: "2:30 PM",
          sender: "customer",
        },
      ],
    },
    {
      id: 2,
      name: "Sara Khan",
      status: "active",
      assignedAgent: "Bob Smith",
      lastMessage: "Order confirm ho gaya hai",
      timestamp: "1:45 PM",
      unreadCount: 0,
      phone: "+92 301 2345678",
      email: "sara.khan@example.com",
      cartItems: [
        {
          id: 3,
          name: "Summer Dress",
          price: 899,
          quantity: 1,
          image:
            "https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=100",
        },
      ],
      messages: [
        {
          id: 1,
          content: "Hello, I want to place an order for wireless headphones.",
          timestamp: "1:30 PM",
          sender: "customer",
        },
        {
          id: 2,
          content:
            "Sure! I can help you with that. What specific model are you looking for?",
          timestamp: "1:35 PM",
          sender: "agent",
        },
        {
          id: 3,
          content: "Order confirm ho gaya hai",
          timestamp: "1:45 PM",
          sender: "customer",
        },
      ],
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      status: "active",
      assignedAgent: "Carol Davis",
      lastMessage: "Delivery kab tak milega?",
      timestamp: "12:15 PM",
      unreadCount: 1,
      phone: "+92 302 3456789",
      email: "ahmed.hassan@example.com",
      cartItems: [
        {
          id: 4,
          name: "Garden Tool Set",
          price: 1565,
          quantity: 1,
          image:
            "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=100",
        },
        {
          id: 5,
          name: "Plant Pot",
          price: 445,
          quantity: 2,
          image:
            "https://images.pexels.com/photos/1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
        },
      ],
      messages: [
        {
          id: 1,
          content: "Mera order kab deliver hoga?",
          timestamp: "12:00 PM",
          sender: "customer",
        },
        {
          id: 2,
          content: "Your order will be delivered within 2-3 business days.",
          timestamp: "12:10 PM",
          sender: "agent",
        },
        {
          id: 3,
          content: "Delivery kab tak milega?",
          timestamp: "12:15 PM",
          sender: "customer",
        },
      ],
    },
    {
      id: 4,
      name: "Fatima Ali",
      status: "closed",
      assignedAgent: "David Wilson",
      lastMessage: "Thank you for your help!",
      timestamp: "11:30 AM",
      unreadCount: 0,
      phone: "+92 303 4567890",
      email: "fatima.ali@example.com",
      messages: [
        {
          id: 1,
          content: "I have a question about my recent order.",
          timestamp: "11:00 AM",
          sender: "customer",
        },
        {
          id: 2,
          content:
            "I'd be happy to help you with your order. What's your order number?",
          timestamp: "11:05 AM",
          sender: "agent",
        },
        {
          id: 3,
          content: "Thank you for your help!",
          timestamp: "11:30 AM",
          sender: "customer",
        },
      ],
    },
  ];

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = chat.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: selectedChat.messages.length + 1,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "agent",
      };

      // In a real app, this would be sent to the backend
      console.log("Sending message:", message);
      setNewMessage("");
    }
  };

  const handleCreateOrder = () => {
    console.log("Creating order for:", selectedChat?.name);
    // Add order creation functionality
  };

  const handleEndChat = () => {
    console.log("Ending chat with:", selectedChat?.name);
    // Add chat ending functionality
  };

  const handleFileUpload = () => {
    console.log("File upload clicked");
    // Add file upload functionality
  };

  const handleCartToggle = () => {
    setShowCart(!showCart);
    setShowCatalogue(false);
  };

  const handleCatalogueToggle = () => {
    setShowCatalogue(!showCatalogue);
    setShowCart(false);
  };

  const getCartTotal = () => {
    if (!selectedChat?.cartItems) return 0;
    return selectedChat.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    if (!selectedChat?.cartItems) return 0;
    return selectedChat.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <ChatSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        filteredChats={filteredChats}
        selectedChat={selectedChat}
        onChatSelect={setSelectedChat}
      />

      {/* Right Section - Chat Conversation */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedChat ? (
          <>
            {/* Chat Header - Sticky/Fixed at Top */}
            <ChatHeader
              selectedChat={selectedChat}
              onCartToggle={handleCartToggle}
              onCatalogueToggle={handleCatalogueToggle}
              onCreateOrder={handleCreateOrder}
              onEndChat={handleEndChat}
              getCartItemCount={getCartItemCount}
            />

            {/* Cart Sidebar */}
            <CartSidebar
              isOpen={showCart && !!selectedChat?.cartItems}
              onClose={handleCartToggle}
              cartItems={selectedChat?.cartItems || []}
              getCartTotal={getCartTotal}
            />

            {/* Catalogue Sidebar */}
            <CatalogueSidebar
              isOpen={showCatalogue}
              onClose={handleCatalogueToggle}
            />

            {/* Chat Messages - Only This Area Scrolls */}
            <ChatMessages messages={selectedChat.messages} />

            {/* Message Input - Fixed at Bottom */}
            <MessageInput
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
            />
          </>
        ) : (
          /* Empty State */
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ChatOnOrder;
