import React from "react";
import { Search, Calendar } from "lucide-react";
import Badge from "../UI/Badge";
import { Chat } from "./types";

interface ChatSidebarProps {
  activeTab: "active" | "closed";
  onTabChange: (tab: "active" | "closed") => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  endDate: string;
  onEndDateChange: (value: string) => void;
  filteredChats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  activeTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  filteredChats,
  selectedChat,
  onChatSelect,
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onTabChange("active")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "active"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Active Chats
          </button>
          <button
            onClick={() => onTabChange("closed")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "closed"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Closed Chats
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-6 border-b border-gray-200 space-y-4 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
            />
          </div>
          <span className="text-gray-500">to</span>
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChat?.id === chat.id ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <Badge
                    variant={chat.status === "active" ? "success" : "error"}
                    size="sm"
                  >
                    {chat.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Assigned to {chat.assignedAgent}
                </p>
                <p className="text-sm text-gray-600 mt-2 truncate">
                  {chat.lastMessage}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1 ml-4">
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
                {chat.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
