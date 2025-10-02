import React, { useState } from "react";
import {
  CustomerHeader,
  CustomerStats,
  CustomerFilters,
  CustomerTable,
  CustomerDetailsModal,
  type Customer,
} from "../components/CustomerManagement";

const CustomerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const customers: Customer[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      status: "active",
      registrationDate: "2023-10-15",
      orders: 12,
      totalSpent: "$1,245.50",
      lastOrder: "2024-01-10",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@email.com",
      status: "active",
      registrationDate: "2023-11-22",
      orders: 8,
      totalSpent: "$892.30",
      lastOrder: "2024-01-08",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Los Angeles, CA 90210",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@email.com",
      status: "blocked",
      registrationDate: "2023-09-10",
      orders: 3,
      totalSpent: "$156.75",
      lastOrder: "2023-12-20",
      phone: "+1 (555) 456-7890",
      address: "789 Pine Rd, Chicago, IL 60601",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@email.com",
      status: "active",
      registrationDate: "2023-12-05",
      orders: 15,
      totalSpent: "$2,134.90",
      lastOrder: "2024-01-12",
      phone: "+1 (555) 321-0987",
      address: "321 Elm St, Houston, TX 77001",
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (customerId: number, newStatus: string) => {
    console.log(`Changing customer ${customerId} status to ${newStatus}`);
    // In a real app, this would make an API call
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CustomerHeader />

      {/* Stats Cards */}
      <CustomerStats />

      {/* Filters and Search */}
      <CustomerFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Customers Table */}
      <CustomerTable
        customers={filteredCustomers}
        onViewCustomer={handleViewCustomer}
        onStatusChange={handleStatusChange}
      />

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default CustomerManagement;
