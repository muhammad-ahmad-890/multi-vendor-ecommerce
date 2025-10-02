import React from "react";
import { Search, Filter } from "lucide-react";

interface PaymentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter:
    | "all"
    | "pending"
    | "processing"
    | "completed"
    | "failed"
    | "cancelled";
  onStatusFilterChange: (
    value:
      | "all"
      | "pending"
      | "processing"
      | "completed"
      | "failed"
      | "cancelled"
  ) => void;
  paymentMethodFilter: "all" | "bank_transfer" | "paypal" | "stripe" | "check";
  onPaymentMethodFilterChange: (
    value: "all" | "bank_transfer" | "paypal" | "stripe" | "check"
  ) => void;
}

const PaymentFilters: React.FC<PaymentFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  paymentMethodFilter,
  onPaymentMethodFilterChange,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(
              e.target.value as
                | "all"
                | "pending"
                | "processing"
                | "completed"
                | "failed"
                | "cancelled"
            )
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={paymentMethodFilter}
          onChange={(e) =>
            onPaymentMethodFilterChange(
              e.target.value as
                | "all"
                | "bank_transfer"
                | "paypal"
                | "stripe"
                | "check"
            )
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Methods</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="paypal">PayPal</option>
          <option value="stripe">Stripe</option>
          <option value="check">Check</option>
        </select>
      </div>
    </div>
  );
};

export default PaymentFilters;
