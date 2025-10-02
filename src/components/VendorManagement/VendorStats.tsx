import React from "react";
import { Video, Package, DollarSign } from "lucide-react";
import Card from "../UI/Card";

interface VendorStatsProps {
  totalLiveStreams: number;
  totalOrders: number;
  totalSales: number;
  formatCurrency: (amount: number) => string;
}

const VendorStats: React.FC<VendorStatsProps> = ({
  totalLiveStreams,
  totalOrders,
  totalSales,
  formatCurrency,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Video className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">
              Total Live Streams
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {totalLiveStreams}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">
              {totalOrders.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">
              Total Sales Amount
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalSales)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VendorStats;
