import React from "react";
import { Settings, Edit, Trash2, Shield, Lock } from "lucide-react";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import { Staff } from "./types";

interface StaffTableProps {
  staff: Staff[];
  onEditStaff: (staff: Staff) => void;
  onDeleteStaff: (staff: Staff) => void;
  onManagePermissions: (staff: Staff) => void;
  getStatusBadge: (status: "active" | "inactive") => React.ReactNode;
  getPermissionCount: (staff: Staff) => number;
}

const StaffTable: React.FC<StaffTableProps> = ({
  staff,
  onEditStaff,
  onDeleteStaff,
  onManagePermissions,
  getStatusBadge,
  getPermissionCount,
}) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avatar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((staffMember) => (
              <tr key={staffMember.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={staffMember.avatar}
                    alt={staffMember.name}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {staffMember.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {staffMember.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {staffMember.role}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(staffMember.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {getPermissionCount(staffMember)} permissions
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onManagePermissions(staffMember)}
                      className="text-blue-400 hover:text-blue-600"
                      title="Manage Permissions"
                    >
                      <Lock className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        console.log("Manage staff:", staffMember.id)
                      }
                      className="text-gray-400 hover:text-gray-600"
                      title="Manage"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEditStaff(staffMember)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteStaff(staffMember)}
                      className="text-red-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
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

export default StaffTable;
