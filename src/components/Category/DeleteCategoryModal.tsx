import React from "react";
import { toast } from "sonner";
import Modal from "../UI/Modal";
import { apiService } from "../../services/apiService";
import { Category } from "./types";

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteCategory: Category | null;
  isDeleting: boolean;
  onSetIsDeleting: (value: boolean) => void;
  onFetchCategories: () => void;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  isOpen,
  onClose,
  deleteCategory,
  isDeleting,
  onSetIsDeleting,
  onFetchCategories,
}) => {
  const handleDelete = async () => {
    if (!deleteCategory) return;

    onSetIsDeleting(true);
    try {
      const response = await apiService.deleteCategory(deleteCategory.id);
      if (response.success) {
        toast.success("Category deleted successfully!");
        onClose();
        onFetchCategories();
      } else {
        toast.error(response.message || "Failed to delete category.");
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      if (
        error instanceof Error &&
        error.message.includes("Unauthorized")
      ) {
        toast.error("Session expired. Please login again.");
        apiService.debugTokenStatus();
      } else {
        toast.error("Failed to delete category. Please try again.");
      }
    } finally {
      onSetIsDeleting(false);
    }
  };

  if (!deleteCategory) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      size="sm"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              Delete Category
            </h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {deleteCategory.name}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Deleting..." : "Delete Category"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCategoryModal;
