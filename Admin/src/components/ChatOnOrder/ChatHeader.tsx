import React from "react";
import { Plus, Phone, Mail, ShoppingBag, Grid3X3 } from "lucide-react";
import Badge from "../UI/Badge";
import { Chat } from "./types";

interface ChatHeaderProps {
  selectedChat: Chat;
  onCartToggle: () => void;
  onCatalogueToggle: () => void;
  onCreateOrder: () => void;
  onEndChat: () => void;
  getCartItemCount: () => number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedChat,
  onCartToggle,
  onCatalogueToggle,
  onCreateOrder,
  onEndChat,
  getCartItemCount,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-6 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {selectedChat.name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedChat.name}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{selectedChat.phone}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>{selectedChat.email}</span>
              </div>
            </div>
          </div>
          <Badge variant="success" size="sm">
            {selectedChat.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-3">
          {/* Cart Button */}
          <button
            onClick={onCartToggle}
            className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Cart
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </button>

          {/* Catalogue Button */}
          <button
            onClick={onCatalogueToggle}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Catalogue
          </button>

          <button
            onClick={onCreateOrder}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Order
          </button>
          <button
            onClick={onEndChat}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700"
          >
            End Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
