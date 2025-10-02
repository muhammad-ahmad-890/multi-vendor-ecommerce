import React from "react";
import { Settings } from "lucide-react";
import Card from "../UI/Card";

const NotificationSettings: React.FC = () => {
  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">
          Email Notifications
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700">New Vendor Registration</span>
          <input
            type="checkbox"
            defaultChecked
            className="rounded text-blue-600"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700">New Order Placed</span>
          <input
            type="checkbox"
            defaultChecked
            className="rounded text-blue-600"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700">Payout Requests</span>
          <input
            type="checkbox"
            defaultChecked
            className="rounded text-blue-600"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700">Product Reviews</span>
          <input type="checkbox" className="rounded text-blue-600" />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700">Customer Support</span>
          <input
            type="checkbox"
            defaultChecked
            className="rounded text-blue-600"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700">System Updates</span>
          <input type="checkbox" className="rounded text-blue-600" />
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings;
