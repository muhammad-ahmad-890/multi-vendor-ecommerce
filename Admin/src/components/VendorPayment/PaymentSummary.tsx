import React from "react";
import { DollarSign, TrendingUp, CreditCard } from "lucide-react";
import Card from "../UI/Card";

interface PaymentSummaryProps {
  totalAmount: number;
  totalCommission: number;
  totalNetAmount: number;
  formatCurrency: (amount: number) => string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  totalAmount,
  totalCommission,
  totalNetAmount,
  formatCurrency,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <div className="text-center">
          <div className="p-2 bg-purple-100 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-sm font-medium text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalAmount)}
          </p>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="p-2 bg-orange-100 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-sm font-medium text-gray-600">Total Commission</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalCommission)}
          </p>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="p-2 bg-green-100 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-600">Net Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalNetAmount)}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSummary;
