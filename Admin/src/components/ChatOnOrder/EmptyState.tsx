import React from "react";
import { MessageCircle } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No chat selected
        </h3>
        <p className="text-gray-600">
          Select a chat from the sidebar to start messaging
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
