import React, { useEffect, useState, useCallback } from "react";
import Badge from "../components/UI/Badge";
import {
  UserManagementHeader,
  UserTabs,
  UserTable,
  EditUserModal,
  ViewUserModal,
  PasswordResetModal,
  SwitchToUserModal,
  DeleteUserModal,
  type User,
} from "../components/UserManagement";
import { apiService } from "../services/apiService";
import Toast from "../components/UI/Toast";

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [passwordResetModalOpen, setPasswordResetModalOpen] = useState(false);
  const [switchToModalOpen, setSwitchToModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; show: boolean } | null>(null);

  // Loader - fetch users per tab
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // map activeTab to API param
      const map: Record<string, "customers" | "vendors" | "vendor-staff" | "admins" | "admin-staff"> = {
        customers: "customers",
        vendors: "vendors",
        vendorStaff: "vendor-staff",
        administrators: "admins",
        adminStaff: "admin-staff",
      };
      // If customers tab, also fetch vendors and merge so vendors appear in customers list
      let collected: any[] = [];
      if (activeTab === 'customers') {
        const [resCustomers, resVendors] = await Promise.all([
          apiService.listUsersByType({ type: 'customers', limit: 200 }),
          apiService.listUsersByType({ type: 'vendors', limit: 200 }),
        ]);
        const itemsCustomers = (resCustomers.data && (resCustomers.data.users || resCustomers.data.data)) || [];
        const itemsVendors = (resVendors.data && (resVendors.data.users || resVendors.data.data)) || [];
        const merged = [...itemsCustomers, ...itemsVendors];
        const seen = new Set<string>();
        collected = merged.filter((u: any) => {
          if (seen.has(u.id)) return false;
          seen.add(u.id);
          return true;
        });
      } else {
        const res = await apiService.listUsersByType({ type: map[activeTab], limit: 200 });
        collected = (res.data && (res.data.users || res.data.data)) || [];
      }

      // Map backend users to UI type
      const mapped: User[] = collected.map((u: any) => {
          const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim();
          const addrParts = [u.address, u.city, u.state].filter(Boolean);
          const role = u.role || '';
          const roleToUserType = (r: string) => {
            switch (r) {
              case 'CUSTOMER': return 'Customer';
              case 'GUEST': return 'Guest';
              case 'VENDOR':
              case 'VENDOR_PENDING': return 'Vendor';
              case 'VENDOR_STAFF': return 'Vendor Staff';
              case 'ADMIN': return 'Admin';
              case 'ADMIN_STAFF': return 'Admin Staff';
              case 'USER_STAFF': return 'User Staff';
              default: return 'Registered';
            }
          };
          return {
            id: u.id,
            userName: u.userName || u.username || u.email || u.mobile || u.phone || u.id,
            name: fullName || u.name || (u.role === 'GUEST' ? 'Guest User' : '-') ,
            contactDetails: u.mobile || u.phone || u.email || '-',
            address: addrParts.length ? addrParts.join(', ') : '-',
            userType: roleToUserType(role),
            coins: u.coins,
            registrationDate: u.createdAt ? new Date(u.createdAt).toLocaleString() : '-',
            status: u.status || (u.isActive ? 'Active' : 'Inactive'),
            storeName: u.storeName,
          } as User;
        });
      setUsers(mapped);
    } catch (e) {
      console.error(e);
      setError("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getCurrentData = () => users;

  const getColumns = () => {
    const baseColumns = [
      { key: "userName", label: "User Name" },
      {
        key: "name",
        label:
          activeTab === "customers"
            ? "Customer Name"
            : activeTab === "vendors"
            ? "Vendor Name"
            : "Name",
      },
      { key: "contactDetails", label: "Contact Details" },
      { key: "address", label: "Address" },
      { key: "userType", label: "User Type" },
      { key: "registrationDate", label: "Registration Date" },
      { key: "actions", label: "Actions" },
    ];

    if (activeTab === "customers") {
      baseColumns.splice(5, 0, { key: "coins", label: "Coins" });
    }

    if (activeTab === "vendors" || activeTab === "vendorStaff") {
      baseColumns.splice(3, 0, { key: "storeName", label: "Store Name" });
    }

    return baseColumns;
  };

  const renderUserType = (userType: string) => (
    <Badge variant={userType === "Registered" ? "success" : "default"}>
      {userType}
    </Badge>
  );

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handlePasswordReset = (user: User) => {
    setSelectedUser(user);
    setPasswordResetModalOpen(true);
  };

  const handleSwitchTo = (user: User) => {
    setSelectedUser(user);
    setSwitchToModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      let res;
      // From Vendors or Vendor Staff tab: demote vendor (remove vendor-side, keep account)
      if (activeTab === 'vendors' || activeTab === 'vendorStaff') {
        res = await apiService.demoteVendorToCustomer(selectedUser.id);
      } else {
        // From other tabs: full delete
        res = await apiService.deleteUser(selectedUser.id);
      }
      if (res.success) {
        setToast({ message: 'Action completed successfully', type: 'success', show: true });
        setDeleteModalOpen(false);
        setSelectedUser(null);
        fetchUsers();
      } else {
        setToast({ message: res.message || 'Failed to delete user', type: 'error', show: true });
      }
    } catch (e) {
      setToast({ message: 'Failed to delete user', type: 'error', show: true });
    }
  };

  const getCurrentTabName = () => {
    const tabNames: { [key: string]: string } = {
      customers: "Customers",
      vendors: "Vendors",
      vendorStaff: "Vendor Staff",
      administrators: "Administrators",
      adminStaff: "Admin Staff",
    };
    return tabNames[activeTab] || "Users";
  };

  return (
    <div className="p-6">
      {toast && toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      {/* Header */}
      <UserManagementHeader />

      {/* Tabs */}
      <UserTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      {!loading && !error && (
      <UserTable
        activeTab={activeTab}
        users={getCurrentData()}
        onEdit={handleEdit}
        onView={handleView}
        onPasswordReset={handlePasswordReset}
        onSwitchTo={handleSwitchTo}
        onDelete={handleDelete}
        renderUserType={renderUserType}
        getColumns={getColumns}
        getCurrentTabName={getCurrentTabName}
      />)}
      {loading && <div className="p-6">Loading users...</div>}
      {error && !loading && <div className="p-6 text-red-600">{error}</div>}

      {/* Edit Modal */}
      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        selectedUser={selectedUser}
        activeTab={activeTab}
        onSave={() => {
          // Handle save logic here
          setEditModalOpen(false);
        }}
      />

      {/* View Modal */}
      <ViewUserModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        selectedUser={selectedUser}
        activeTab={activeTab}
        renderUserType={renderUserType}
      />

      {/* Password Reset Modal */}
      <PasswordResetModal
        isOpen={passwordResetModalOpen}
        onClose={() => setPasswordResetModalOpen(false)}
        selectedUser={selectedUser}
        onResetPassword={() => {
          // Handle password reset logic here
          setPasswordResetModalOpen(false);
        }}
      />

      {/* Switch To Modal */}
      <SwitchToUserModal
        isOpen={switchToModalOpen}
        onClose={() => setSwitchToModalOpen(false)}
        selectedUser={selectedUser}
        activeTab={activeTab}
        onSwitchTo={() => {
          // Handle switch to user logic here
          setSwitchToModalOpen(false);
        }}
      />

      {/* Delete Modal */}
      <DeleteUserModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        selectedUser={selectedUser}
        activeTab={activeTab}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default UserManagement;
