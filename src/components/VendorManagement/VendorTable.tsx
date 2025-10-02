import React from "react";
import {
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  Edit,
  Video,
  Package,
  DollarSign,
  Store,
  UserCheck,
  UserX,
} from "lucide-react";
import Card from "../UI/Card";
import Table from "../UI/Table";
import Badge from "../UI/Badge";
import { Vendor } from "./types";

interface VendorTableProps {
  vendors: Vendor[];
  columns: Array<{ key: string; label: string; sortable: boolean }>;
  onViewVendor: (vendor: Vendor) => void;
  onEditVendor: (vendor: Vendor) => void;
  onToggleActive: (vendor: Vendor) => void;
  formatCurrency: (amount: number) => string;
  renderCell: (vendor: Vendor, column: any) => React.ReactNode;
}

const VendorTable: React.FC<VendorTableProps> = ({
  vendors,
  columns,
  renderCell,
}) => {
  return (
    <Card padding={false}>
      <Table columns={columns} data={vendors} renderCell={renderCell} />
    </Card>
  );
};

export default VendorTable;
