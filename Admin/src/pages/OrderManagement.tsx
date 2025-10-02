import React, { useState } from "react";
import {
  OrderManagementHeader,
  OrderStats,
  BulkActions,
  OrderFilters,
  OrdersTable,
  OrderDetailsModal,
  BulkActionModal,
  type Order,
} from "../components/OrderManagement";

const OrderManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);

  const orders: Order[] = [
    {
      id: "#ORD-12345",
      customer: "Alice Johnson",
      store: "Tech Solutions Inc",
      items: 2,
      total: "$1,299.98",
      status: "delivered",
      orderDate: "2024-01-10",
      deliveryDate: "2024-01-15",
      shippingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Credit Card (**** 4532)",
      subOrders: [
        { id: "#SUB-001", status: "delivered", items: 1 },
        { id: "#SUB-002", status: "delivered", items: 1 },
      ],
      products: [
        { name: "iPhone 15 Pro Max", quantity: 1, price: "$1,199.99" },
        { name: "Phone Case", quantity: 1, price: "$29.99" },
      ],
    },
    {
      id: "#ORD-12346",
      customer: "Bob Smith",
      store: "Fashion Hub",
      items: 1,
      total: "$89.99",
      status: "processing",
      orderDate: "2024-01-12",
      deliveryDate: null,
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
      paymentMethod: "PayPal",
      subOrders: [{ id: "#SUB-003", status: "processing", items: 1 }],
      products: [{ name: "Summer Dress", quantity: 1, price: "$89.99" }],
    },
    {
      id: "#ORD-12347",
      customer: "Carol Davis",
      store: "Home & Garden Store",
      items: 3,
      total: "$245.50",
      status: "pending_payment",
      orderDate: "2024-01-13",
      deliveryDate: null,
      shippingAddress: "789 Pine Rd, Chicago, IL 60601",
      paymentMethod: "Credit Card (**** 8765)",
      subOrders: [
        { id: "#SUB-004", status: "pending_payment", items: 2 },
        { id: "#SUB-005", status: "pending_payment", items: 1 },
      ],
      products: [
        { name: "Garden Tool Set", quantity: 1, price: "$156.50" },
        { name: "Plant Pot", quantity: 2, price: "$44.50" },
      ],
    },
    {
      id: "#ORD-12348",
      customer: "David Wilson",
      store: "Tech Solutions Inc",
      items: 1,
      total: "$299.99",
      status: "cancelled",
      orderDate: "2024-01-14",
      deliveryDate: null,
      shippingAddress: "321 Elm St, Houston, TX 77001",
      paymentMethod: "Apple Pay",
      subOrders: [{ id: "#SUB-006", status: "cancelled", items: 1 }],
      products: [
        { name: "Wireless Headphones", quantity: 1, price: "$299.99" },
      ],
    },
    {
      id: "#ORD-12349",
      customer: "Emma Brown",
      store: "Sports Store",
      items: 2,
      total: "$159.98",
      status: "failed",
      orderDate: "2024-01-15",
      deliveryDate: null,
      shippingAddress: "654 Maple Dr, Miami, FL 33101",
      paymentMethod: "Credit Card (**** 1234)",
      subOrders: [{ id: "#SUB-007", status: "failed", items: 2 }],
      products: [
        { name: "Nike Air Max", quantity: 1, price: "$129.99" },
        { name: "Sports Socks", quantity: 1, price: "$29.99" },
      ],
    },
    {
      id: "#ORD-12350",
      customer: "Frank Miller",
      store: "Beauty Store",
      items: 1,
      total: "$45.00",
      status: "refunded",
      orderDate: "2024-01-16",
      deliveryDate: "2024-01-18",
      shippingAddress: "987 Cedar Ln, Seattle, WA 98101",
      paymentMethod: "PayPal",
      subOrders: [{ id: "#SUB-008", status: "refunded", items: 1 }],
      products: [{ name: "Beauty Cream", quantity: 1, price: "$45.00" }],
    },
  ];

  const columns = [
    { key: "id", label: "Order ID", sortable: true },
    { key: "customer", label: "Customer Name", sortable: true },
    { key: "store", label: "Store Name", sortable: true },
    { key: "shippingAddress", label: "Shipping Address", sortable: true },
    { key: "subOrders", label: "Sub Orders", sortable: true },
    { key: "items", label: "Items", sortable: true },
    { key: "total", label: "Total", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "orderDate", label: "Order Date", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    // Date filter
    let matchesDate = true;
    const orderDate = new Date(order.orderDate);
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (dateFilter === "today")
      matchesDate = orderDate.toDateString() === today.toDateString();
    else if (dateFilter === "lastWeek") matchesDate = orderDate >= lastWeek;
    else if (dateFilter === "lastMonth") matchesDate = orderDate >= lastMonth;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Changing order ${orderId} status to ${newStatus}`);
    // In a real app, this would make an API call
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on orders:`, selectedOrders);
    setShowBulkActionModal(false);
    setSelectedOrders([]);
    // In a real app, this would make an API call
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleOrderSelect = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <OrderManagementHeader />

      {/* Stats Cards */}
      <OrderStats />

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <BulkActions
          selectedCount={selectedOrders.length}
          onClearSelection={() => setSelectedOrders([])}
          onBulkAction={() => setShowBulkActionModal(true)}
        />
      )}

      {/* Filters and Search */}
      <OrderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />

      {/* Orders Table */}
      <OrdersTable
        orders={filteredOrders}
        selectedOrders={selectedOrders}
        onOrderSelect={handleOrderSelect}
        onSelectAll={handleSelectAll}
        onOrderClick={handleOrderClick}
        renderCell={() => null} // This will be handled internally by OrdersTable
        columns={columns}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
      />

      {/* Bulk Action Modal */}
      <BulkActionModal
        isOpen={showBulkActionModal}
        onClose={() => setShowBulkActionModal(false)}
        selectedCount={selectedOrders.length}
        onConfirm={() => handleBulkAction("trash")}
      />
    </div>
  );
};

export default OrderManagement;
