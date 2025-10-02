import React from "react";
import Card from "../UI/Card";

const PaymentSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Payment Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Automatic Payment Processing
                </p>
                <p className="text-sm text-gray-500">
                  Process payments automatically on due date
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Payment Notifications
                </p>
                <p className="text-sm text-gray-500">
                  Send email notifications for payment status
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Minimum Payment Threshold
                </p>
                <p className="text-sm text-gray-500">
                  Set minimum amount for payment processing
                </p>
              </div>
              <input
                type="number"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50"
                defaultValue="50"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSettings;
