import React from "react";
import { Eye, CheckCircle } from "lucide-react";
import Card from "../UI/Card";
import Table from "../UI/Table";
import Badge from "../UI/Badge";
import { Payout } from "./types";

interface PayoutsTableProps {
  payouts: Payout[];
  onViewPayout: (payout: Payout) => void;
  onPayoutAction: (payoutId: number, action: string) => void;
  columns: any[];
}

const PayoutsTable: React.FC<PayoutsTableProps> = ({
  payouts,
  onViewPayout,
  onPayoutAction,
  columns,
}) => {
  const renderCell = (payout: Payout, column: any) => {
    switch (column.key) {
      case "status":
        return (
          <Badge
            variant={
              payout.status === "processing"
                ? "info"
                : payout.status === "pending"
                ? "warning"
                : "default"
            }
          >
            {payout.status}
          </Badge>
        );
      case "actions":
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewPayout(payout)}
              className="text-blue-600 hover:text-blue-700"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            {payout.status === "pending" && (
              <button
                onClick={() => onPayoutAction(payout.id, "approve")}
                className="text-green-600 hover:text-green-700"
                title="Approve Payout"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        );
      default:
        return payout[column.key as keyof Payout];
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Pending Payout Requests
        </h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
          Process Selected
        </button>
      </div>
      <Table columns={columns} data={payouts} renderCell={renderCell} />
    </Card>
  );
};

export default PayoutsTable;
