import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  Key,
  LogIn,
  Calendar,
  MapPin,
  Phone,
  Coins,
  Store,
} from "lucide-react";
import Card from "../UI/Card";
import Table from "../UI/Table";
import Badge from "../UI/Badge";
import { User } from "./types";

interface UserTableProps {
  activeTab: string;
  users: User[];
  onEdit: (user: User) => void;
  onView: (user: User) => void;
  onPasswordReset: (user: User) => void;
  onSwitchTo: (user: User) => void;
  onDelete: (user: User) => void;
  renderUserType: (userType: string) => React.ReactNode;
  getColumns: () => Array<{ key: string; label: string }>;
  getCurrentTabName: () => string;
}

const UserTable: React.FC<UserTableProps> = ({
  activeTab,
  users,
  onEdit,
  onView,
  onPasswordReset,
  onSwitchTo,
  onDelete,
  renderUserType,
  getColumns,
  getCurrentTabName,
}) => {
  const renderActions = (user: User) => (
    <div className="flex space-x-2">
      <button
        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
        title="Edit"
        onClick={() => onEdit(user)}
      >
        <Edit className="h-4 w-4" />
      </button>
      <button
        className="p-1 text-green-600 hover:text-green-800 transition-colors"
        title="View"
        onClick={() => onView(user)}
      >
        <Eye className="h-4 w-4" />
      </button>
      {(activeTab === "vendors" || activeTab === "administrators") && (
        <button
          className="p-1 text-orange-600 hover:text-orange-800 transition-colors"
          title="Password Reset"
          onClick={() => onPasswordReset(user)}
        >
          <Key className="h-4 w-4" />
        </button>
      )}
      {(activeTab === "vendors" || activeTab === "administrators") && (
        <button
          className="p-1 text-purple-600 hover:text-purple-800 transition-colors"
          title="Switch To"
          onClick={() => onSwitchTo(user)}
        >
          <LogIn className="h-4 w-4" />
        </button>
      )}
      <button
        className="p-1 text-red-600 hover:text-red-800 transition-colors"
        title="Delete"
        onClick={() => onDelete(user)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {getCurrentTabName()}
          </h2>
        
        </div>

        <Table
          columns={getColumns()}
          data={users.map((user) => ({
            ...user,
            userType: renderUserType(user.userType),
            actions: renderActions(user),
            coins:
              user.coins !== undefined ? (
                <div className="flex items-center space-x-1">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{user.coins}</span>
                </div>
              ) : null,
            registrationDate: (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{user.registrationDate}</span>
              </div>
            ),
            contactDetails: (
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{user.contactDetails}</span>
              </div>
            ),
            address: (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{user.address}</span>
              </div>
            ),
            storeName: user.storeName ? (
              <div className="flex items-center space-x-1">
                <Store className="h-4 w-4 text-gray-400" />
                <span>{user.storeName}</span>
              </div>
            ) : null,
          }))}
        />
      </div>
    </Card>
  );
};

export default UserTable;
