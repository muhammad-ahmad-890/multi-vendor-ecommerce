import React from "react";
import { Eye, Send, Download, Clock, CheckCircle, XCircle } from "lucide-react";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import { VendorPayment } from "./types";

interface PaymentTableProps {
  payments: VendorPayment[];
  onViewPayment: (payment: VendorPayment) => void;
  onProcessPayment: (payment: VendorPayment) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  getStatusBadge: (
    status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  ) => React.ReactNode;
  getPaymentMethodBadge: (
    method: "bank_transfer" | "paypal" | "stripe" | "check"
  ) => React.ReactNode;
  getStatusIcon: (
    status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  ) => React.ReactNode;
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  onViewPayment,
  onProcessPayment,
  formatCurrency,
  formatDate,
  getStatusBadge,
  getPaymentMethodBadge,
  getStatusIcon,
}) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {payment.vendorName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.vendorId}
                    </div>
                    <div className="text-xs text-gray-400">{payment.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPaymentMethodBadge(payment.paymentMethod)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(payment.netAmount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {payment.orderCount} orders •{" "}
                      {formatCurrency(payment.totalSales)} sales
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(payment.status)}
                    {getStatusBadge(payment.status)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(payment.dueDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewPayment(payment)}
                      className="text-blue-600 hover:text-blue-700"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {payment.status === "pending" && (
                      <button
                        onClick={() => onProcessPayment(payment)}
                        className="text-green-600 hover:text-green-700"
                        title="Process Payment"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      className="text-purple-600 hover:text-purple-700"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default PaymentTable;
