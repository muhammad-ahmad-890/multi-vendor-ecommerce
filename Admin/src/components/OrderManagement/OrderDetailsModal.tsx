import React from "react";
import { Trash2 } from "lucide-react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { Order } from "./types";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
  onStatusChange,
}) => {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Details" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Order Information
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Order ID:</span>
                <span className="ml-2 text-sm text-gray-900 font-medium">
                  {order.id}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Customer:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {order.customer}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Store:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {order.store}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Order Date:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {order.orderDate}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <Badge
                  variant={
                    order.status === "delivered"
                      ? "success"
                      : order.status === "shipped"
                      ? "info"
                      : order.status === "processing"
                      ? "warning"
                      : order.status === "pending_payment"
                      ? "default"
                      : order.status === "cancelled"
                      ? "error"
                      : order.status === "failed"
                      ? "error"
                      : order.status === "refunded"
                      ? "success"
                      : "default"
                  }
                  size="sm"
                >
                  {order.status.replace("_", " ")}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total:</span>
                <span className="ml-2 text-sm text-gray-900 font-medium">
                  {order.total}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Shipping & Payment
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Shipping Address:</span>
                <p className="text-sm text-gray-900 mt-1">
                  {order.shippingAddress}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Payment Method:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {order.paymentMethod}
                </span>
              </div>
              {order.deliveryDate && (
                <div>
                  <span className="text-sm text-gray-500">Delivery Date:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {order.deliveryDate}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub Orders */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Sub Orders</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Sub Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Items
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.subOrders.map((subOrder, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {subOrder.id}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          subOrder.status === "delivered"
                            ? "success"
                            : subOrder.status === "shipped"
                            ? "info"
                            : subOrder.status === "processing"
                            ? "warning"
                            : subOrder.status === "pending_payment"
                            ? "default"
                            : subOrder.status === "cancelled"
                            ? "error"
                            : subOrder.status === "failed"
                            ? "error"
                            : subOrder.status === "refunded"
                            ? "success"
                            : "default"
                        }
                        size="sm"
                      >
                        {subOrder.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {subOrder.items}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-2">
            {order.status !== "delivered" &&
              order.status !== "cancelled" &&
              order.status !== "refunded" && (
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => onStatusChange(order.id, e.target.value)}
                  defaultValue={order.status}
                >
                  <option value="pending_payment">Pending Payment</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center space-x-2">
              <Trash2 className="h-4 w-4" />
              <span>Move to Trash</span>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
