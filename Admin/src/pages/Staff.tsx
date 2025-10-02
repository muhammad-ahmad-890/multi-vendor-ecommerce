import React, { useState } from "react";
import {
  StaffHeader,
  StaffFilters,
  StaffTable,
  AddStaffModal,
  EditStaffModal,
  PermissionsModal,
  DeleteStaffModal,
  type Staff,
  type Permission,
} from "../components/Staff";
import Badge from "../components/UI/Badge";

const Staff: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [deletingStaff, setDeletingStaff] = useState<Staff | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  // Available permissions
  const availablePermissions: Permission[] = [
    // User Management
    {
      id: "user_view",
      name: "View Users",
      description: "Can view user list and details",
      category: "User Management",
    },
    {
      id: "user_create",
      name: "Create Users",
      description: "Can create new users",
      category: "User Management",
    },
    {
      id: "user_edit",
      name: "Edit Users",
      description: "Can edit user information",
      category: "User Management",
    },
    {
      id: "user_delete",
      name: "Delete Users",
      description: "Can delete users",
      category: "User Management",
    },

    // Product Management
    {
      id: "product_view",
      name: "View Products",
      description: "Can view product list and details",
      category: "Product Management",
    },
    {
      id: "product_create",
      name: "Create Products",
      description: "Can create new products",
      category: "Product Management",
    },
    {
      id: "product_edit",
      name: "Edit Products",
      description: "Can edit product information",
      category: "Product Management",
    },
    {
      id: "product_delete",
      name: "Delete Products",
      description: "Can delete products",
      category: "Product Management",
    },

    // Order Management
    {
      id: "order_view",
      name: "View Orders",
      description: "Can view order list and details",
      category: "Order Management",
    },
    {
      id: "order_edit",
      name: "Edit Orders",
      description: "Can edit order status and details",
      category: "Order Management",
    },
    {
      id: "order_delete",
      name: "Delete Orders",
      description: "Can delete orders",
      category: "Order Management",
    },

    // Category Management
    {
      id: "category_view",
      name: "View Categories",
      description: "Can view category list",
      category: "Category Management",
    },
    {
      id: "category_create",
      name: "Create Categories",
      description: "Can create new categories",
      category: "Category Management",
    },
    {
      id: "category_edit",
      name: "Edit Categories",
      description: "Can edit category information",
      category: "Category Management",
    },
    {
      id: "category_delete",
      name: "Delete Categories",
      description: "Can delete categories",
      category: "Category Management",
    },

    // Staff Management
    {
      id: "staff_view",
      name: "View Staff",
      description: "Can view staff list",
      category: "Staff Management",
    },
    {
      id: "staff_create",
      name: "Create Staff",
      description: "Can create new staff members",
      category: "Staff Management",
    },
    {
      id: "staff_edit",
      name: "Edit Staff",
      description: "Can edit staff information",
      category: "Staff Management",
    },
    {
      id: "staff_delete",
      name: "Delete Staff",
      description: "Can delete staff members",
      category: "Staff Management",
    },

    // Reports
    {
      id: "reports_view",
      name: "View Reports",
      description: "Can view all reports",
      category: "Reports",
    },
    {
      id: "reports_export",
      name: "Export Reports",
      description: "Can export report data",
      category: "Reports",
    },

    // Settings
    {
      id: "settings_view",
      name: "View Settings",
      description: "Can view system settings",
      category: "Settings",
    },
    {
      id: "settings_edit",
      name: "Edit Settings",
      description: "Can edit system settings",
      category: "Settings",
    },
  ];

  const [staffMembers] = useState<Staff[]>([
    {
      id: 1,
      name: "Alice Brown",
      email: "alice@company.com",
      role: "Manager",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      permissions: [
        "user_view",
        "user_create",
        "user_edit",
        "product_view",
        "product_create",
        "order_view",
        "order_edit",
        "category_view",
        "reports_view",
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@company.com",
      role: "Sales",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      permissions: ["product_view", "order_view", "order_edit", "reports_view"],
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@company.com",
      role: "Support",
      status: "inactive",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      permissions: ["user_view", "order_view", "order_edit"],
    },
    {
      id: 4,
      name: "David Lee",
      email: "david@company.com",
      role: "Logistics",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      permissions: ["order_view", "order_edit", "product_view"],
    },
  ]);

  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "",
    status: "active" as "active" | "inactive",
    permissions: [] as string[],
  });

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || staff.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddStaff = () => {
    // Add staff logic here
    console.log("Adding staff:", newStaff);
    setShowAddModal(false);
    setNewStaff({
      name: "",
      email: "",
      role: "",
      status: "active",
      permissions: [],
    });
  };

  const handleEditStaff = () => {
    // Edit staff logic here
    console.log("Editing staff:", editingStaff);
    setShowEditModal(false);
    setEditingStaff(null);
  };

  const handleDeleteStaff = () => {
    // Delete staff logic here
    console.log("Deleting staff:", deletingStaff);
    setShowDeleteModal(false);
    setDeletingStaff(null);
  };

  const openEditModal = (staff: Staff) => {
    setEditingStaff(staff);
    setShowEditModal(true);
  };

  const openDeleteModal = (staff: Staff) => {
    setDeletingStaff(staff);
    setShowDeleteModal(true);
  };

  const openPermissionsModal = (staff: Staff) => {
    setSelectedStaff(staff);
    setShowPermissionsModal(true);
  };

  const handlePermissionToggle = (permissionId: string) => {
    if (!selectedStaff) return;

    const updatedPermissions = selectedStaff.permissions.includes(permissionId)
      ? selectedStaff.permissions.filter((p) => p !== permissionId)
      : [...selectedStaff.permissions, permissionId];

    setSelectedStaff({ ...selectedStaff, permissions: updatedPermissions });
  };

  const handleNewStaffChange = (
    field: string,
    value: string | "active" | "inactive"
  ) => {
    setNewStaff({ ...newStaff, [field]: value });
  };

  const handleEditingStaffChange = (
    field: string,
    value: string | "active" | "inactive"
  ) => {
    if (!editingStaff) return;
    setEditingStaff({ ...editingStaff, [field]: value });
  };

  const handleSavePermissions = () => {
    // Save permissions logic here
    console.log("Saving permissions for:", selectedStaff);
    setShowPermissionsModal(false);
    setSelectedStaff(null);
  };

  const getStatusBadge = (status: "active" | "inactive") => {
    return status === "active" ? (
      <Badge variant="success" size="sm">
        Active
      </Badge>
    ) : (
      <Badge variant="error" size="sm">
        Inactive
      </Badge>
    );
  };

  const getPermissionCount = (staff: Staff) => {
    return staff.permissions.length;
  };

  const getPermissionsByCategory = () => {
    const categories = [
      ...new Set(availablePermissions.map((p) => p.category)),
    ];
    return categories.map((category) => ({
      category,
      permissions: availablePermissions.filter((p) => p.category === category),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <StaffHeader onAddStaff={() => setShowAddModal(true)} />

      {/* Filters */}
      <StaffFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Staff Table */}
      <StaffTable
        staff={filteredStaff}
        onEditStaff={openEditModal}
        onDeleteStaff={openDeleteModal}
        onManagePermissions={openPermissionsModal}
        getStatusBadge={getStatusBadge}
        getPermissionCount={getPermissionCount}
      />

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        newStaff={newStaff}
        onNewStaffChange={handleNewStaffChange}
        onAddStaff={handleAddStaff}
      />

      {/* Edit Staff Modal */}
      <EditStaffModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        editingStaff={editingStaff}
        onEditingStaffChange={handleEditingStaffChange}
        onSaveChanges={handleEditStaff}
      />

      {/* Permissions Modal */}
      <PermissionsModal
        isOpen={showPermissionsModal}
        onClose={() => setShowPermissionsModal(false)}
        selectedStaff={selectedStaff}
        availablePermissions={availablePermissions}
        onPermissionToggle={handlePermissionToggle}
        onSavePermissions={handleSavePermissions}
        getPermissionsByCategory={getPermissionsByCategory}
      />

      {/* Delete Staff Modal */}
      <DeleteStaffModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        deletingStaff={deletingStaff}
        onConfirmDelete={handleDeleteStaff}
      />
    </div>
  );
};

export default Staff;
