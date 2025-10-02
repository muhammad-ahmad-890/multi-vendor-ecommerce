import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { apiService } from "../services/apiService";
import type { CreateCategoryRequest } from "../types/category";
import {
  CategoryStats,
  CategoryFilters,
  CategoryTable,
  CategoryDetailsModal,
  CreateEditCategoryModal,
  DeleteCategoryModal,
  Pagination,
  type Category,
} from "../components/Category";

const Category: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [formData, setFormData] = useState<CreateCategoryRequest>({
    name: "",
    description: "",
    commission: 0,
    type: "percentage",
    image: "",
    isActive: true,
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    description?: string;
    commission?: string;
    image?: string;
  }>({});
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getCategories({ page: 1, limit: 100 });
      if (response.success) {
        const mapped = response.data.data.map((cat) => ({
          ...cat,
          status: cat.isActive
            ? ("active" as "active")
            : ("inactive" as "inactive"),
          productsCount: 0,
        })) as Category[];
        setAllCategories(mapped);
        applyFilter(mapped, statusFilter, searchTerm);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilter = (data: Category[], filter: string, search: string) => {
    let filtered = [...data];

    // Status filter
    if (filter !== "all") {
      filtered = filtered.filter((cat) => cat.status === filter);
    }

    // Search filter
    if (search.trim() !== "") {
      const lower = search.trim().toLowerCase();
      filtered = filtered.filter((cat) =>
        cat.name.toLowerCase().includes(lower)
      );
    }

    // Update pagination total
    setPagination((prev) => ({
      ...prev,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.limit),
      page: Math.min(prev.page, Math.ceil(filtered.length / prev.limit) || 1), // Ensure current page is valid
    }));

    // Slice the data for current page
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    setCategories(filtered.slice(start, end));
  };

  const handleStatusFilterChange = (newStatus: string) => {
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
    setStatusFilter(newStatus);
    applyFilter(allCategories, newStatus, searchTerm);
  };

  const handleSearchChange = (value: string) => {
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
    setSearchTerm(value);
    applyFilter(allCategories, statusFilter, value);
  };

  // On mount
  React.useEffect(() => {
    fetchCategories();
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [pagination.page, pagination.limit]);

  // Load categories on component mount
  React.useEffect(() => {
    fetchCategories();
  }, []);

  // Handle edit category click
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    // Populate form with existing category data
    setFormData({
      name: category.name,
      description: category.description,
      commission: category.commission,
      type: category.type,
      image: category.image,
      isActive: category.isActive,
    });
    setShowAddModal(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setDeleteCategory(category);
    setShowDeleteModal(true);
  };

  const handleFormChange = (
    field: keyof CreateCategoryRequest,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: typeof formErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Category name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (formData.commission < 0) {
      errors.commission = "Commission must be greater than or equal to 0";
    }

    if (formData.type === "percentage" && formData.commission > 100) {
      errors.commission = "Commission percentage must be between 0 and 100";
    }

    if (!formData.image) {
      errors.image = "Category image is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission for both create and update
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      let response;

      // Use formData directly since it already has the correct 'type' field
      const apiData = formData;

      if (editingCategory) {
        // Update existing category
        response = await apiService.updateCategory(editingCategory.id, apiData);
      } else {
        // Create new category
        response = await apiService.createCategory(apiData);
      }

      if (response.success) {
        // Reset form and close modal
        setFormData({
          name: "",
          description: "",
          commission: 0,
          type: "percentage",
          image: "",
          isActive: true,
        });
        setShowAddModal(false);
        setEditingCategory(null);

        // Show success message
        const action = editingCategory ? "updated" : "created";
        toast.success(`Category ${action} successfully!`);

        // Refresh the categories list
        fetchCategories();
      }
    } catch (error) {
      console.error("Failed to save category:", error);

      // Check if it's an authorization error
      if (error instanceof Error && error.message.includes("Unauthorized")) {
        toast.error("Session expired. Please login again.");
        // Debug token status
        apiService.debugTokenStatus();
      } else {
        const action = editingCategory ? "update" : "create";
        toast.error(`Failed to ${action} category. Please try again.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      commission: 0,
      type: "percentage",
      image: "",
      isActive: true,
    });
    setFormErrors({});
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Category Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage product categories and organize your marketplace.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            resetForm();
            setShowAddModal(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Stats Cards */}
      <CategoryStats
        totalCategories={pagination.total}
        activeCategories={
          categories.filter((c) => c.status === "active").length
        }
        inactiveCategories={
          categories.filter((c) => c.status === "inactive").length
        }
        totalProducts={categories.reduce(
          (sum, c) => sum + (c.productsCount || 0),
          0
        )}
      />

      {/* Filters and Search */}
      <CategoryFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
      />

      {/* Categories Table */}
      <CategoryTable
        categories={categories}
        isLoading={isLoading}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onViewCategory={(category) => {
          setSelectedCategory(category);
          setShowCategoryModal(true);
        }}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        limit={pagination.limit}
        onPageChange={(page) => {
          setPagination((prev) => ({ ...prev, page }));
          applyFilter(allCategories, statusFilter, searchTerm);
        }}
        onLimitChange={(limit) => {
          setPagination({
            ...pagination,
            limit,
            page: 1,
          });
        }}
      />

      {/* Category Details Modal */}
      <CategoryDetailsModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        category={selectedCategory}
      />

      {/* Add/Edit Category Modal */}
      <CreateEditCategoryModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        editingCategory={editingCategory}
        formData={formData}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        isDragOver={isDragOver}
        isUploading={isUploading}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        onResetForm={resetForm}
        onSetIsDragOver={setIsDragOver}
        onSetIsUploading={setIsUploading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteCategoryModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteCategory(null);
        }}
        deleteCategory={deleteCategory}
        isDeleting={isDeleting}
        onSetIsDeleting={setIsDeleting}
        onFetchCategories={fetchCategories}
      />
    </div>
  );
};

export default Category;
