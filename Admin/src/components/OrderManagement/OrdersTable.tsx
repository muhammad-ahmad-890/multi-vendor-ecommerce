import React from "react";
import {
  Eye,
  Trash2,
  User,
  Store,
  MapPin,
  Package,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react";
import Card from "../UI/Card";
import Table from "../UI/Table";
import Badge from "../UI/Badge";
import { Order } from "./types";

interface OrdersTableProps {
  orders: Order[];
  selectedOrders: string[];
  onOrderSelect: (orderId: string) => void;
  onSelectAll: () => void;
  onOrderClick: (order: Order) => void;
  renderCell: (order: Order, column: any) => React.ReactNode;
  columns: any[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  selectedOrders,
  onOrderSelect,
  onSelectAll,
  onOrderClick,
  renderCell,
  columns,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_payment":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <Clock className="h-4 w-4" />;
      case "failed":
        return <Clock className="h-4 w-4" />;
      case "refunded":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const renderCellContent = (order: Order, column: any) => {
    switch (column.key) {
      case "id":
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedOrders.includes(order.id)}
              onChange={() => onOrderSelect(order.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span
              className="font-medium text-blue-600 cursor-pointer hover:text-blue-800"
              onClick={() => onOrderClick(order)}
            >
              {order.id}
            </span>
          </div>
        );
      case "customer":
        return (
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900">{order.customer}</span>
          </div>
        );
      case "store":
        return (
          <div className="flex items-center space-x-2">
            <Store className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900">{order.store}</span>
          </div>
        );
      case "shippingAddress":
        return (
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900 truncate max-w-xs">
              {order.shippingAddress}
            </span>
          </div>
        );
      case "subOrders":
        return (
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900">
              {order.subOrders.length} sub-orders
            </span>
          </div>
        );
      case "status":
        return (
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
          >
            <div className="flex items-center space-x-1">
              {getStatusIcon(order.status)}
              <span>{order.status.replace("_", " ")}</span>
            </div>
          </Badge>
        );
      case "actions":
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOrderClick(order)}
              className="text-blue-600 hover:text-blue-700"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              className="text-red-600 hover:text-red-700"
              title="Move to Trash"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      default:
        return order[column.key as keyof Order];
    }
  };

  return (
    <Card padding={false}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={
                selectedOrders.length === orders.length && orders.length > 0
              }
              onChange={onSelectAll}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              Select All ({orders.length} orders)
            </span>
          </div>
          <span className="text-sm text-gray-600">
            {orders.length} orders found
          </span>
        </div>
      </div>
      <Table columns={columns} data={orders} renderCell={renderCellContent} />
    </Card>
  );
};

export default OrdersTable;
