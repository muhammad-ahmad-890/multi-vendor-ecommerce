import React from "react";
import { Clock, Send, CheckCircle, XCircle } from "lucide-react";
import Card from "../UI/Card";

interface PaymentStatsProps {
  totalPending: number;
  totalProcessing: number;
  totalCompleted: number;
  totalFailed: number;
  formatCurrency: (amount: number) => string;
}

const PaymentStats: React.FC<PaymentStatsProps> = ({
  totalPending,
  totalProcessing,
  totalCompleted,
  totalFailed,
  formatCurrency,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalPending)}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Send className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Processing</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalProcessing)}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalCompleted)}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Failed</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalFailed)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentStats;
