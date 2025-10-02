import React from "react";
import { Eye, Ban, UserCheck, MoreHorizontal } from "lucide-react";
import Card from "../UI/Card";
import Table from "../UI/Table";
import Badge from "../UI/Badge";
import { Customer } from "./types";

interface CustomerTableProps {
  customers: Customer[];
  onViewCustomer: (customer: Customer) => void;
  onStatusChange: (customerId: number, newStatus: string) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onViewCustomer,
  onStatusChange,
}) => {
  const columns = [
    { key: "name", label: "Customer Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "registrationDate", label: "Registration", sortable: true },
    { key: "orders", label: "Orders", sortable: true },
    { key: "totalSpent", label: "Total Spent", sortable: true },
    { key: "lastOrder", label: "Last Order", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  const renderCell = (customer: Customer, column: any) => {
    switch (column.key) {
      case "status":
        return (
          <Badge variant={customer.status === "active" ? "success" : "error"}>
            {customer.status}
          </Badge>
        );
      case "actions":
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewCustomer(customer)}
              className="text-blue-600 hover:text-blue-700"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            {customer.status === "active" ? (
              <button
                onClick={() => onStatusChange(customer.id, "blocked")}
                className="text-red-600 hover:text-red-700"
                title="Block Customer"
              >
                <Ban className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => onStatusChange(customer.id, "active")}
                className="text-green-600 hover:text-green-700"
                title="Unblock Customer"
              >
                <UserCheck className="h-4 w-4" />
              </button>
            )}
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        );
      default:
        return customer[column.key as keyof Customer];
    }
  };

  return (
    <Card padding={false}>
      <Table columns={columns} data={customers} renderCell={renderCell} />
    </Card>
  );
};

export default CustomerTable;
