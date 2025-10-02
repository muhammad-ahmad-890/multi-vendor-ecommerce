import React, { useRef, useCallback } from "react";
import { Upload, X, Percent } from "lucide-react";
import { toast } from "sonner";
import Modal from "../UI/Modal";
import { apiService } from "../../services/apiService";
import { CreateCategoryRequest } from "../../types/category";

interface CreateEditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory: any | null;
  formData: CreateCategoryRequest;
  formErrors: {
    name?: string;
    description?: string;
    commission?: string;
    image?: string;
  };
  isSubmitting: boolean;
  isDragOver: boolean;
  isUploading: boolean;
  onFormChange: (
    field: keyof CreateCategoryRequest,
    value: string | number | boolean
  ) => void;
  onSubmit: () => void;
  onResetForm: () => void;
  onSetIsDragOver: (value: boolean) => void;
  onSetIsUploading: (value: boolean) => void;
}

const CreateEditCategoryModal: React.FC<CreateEditCategoryModalProps> = ({
  isOpen,
  onClose,
  editingCategory,
  formData,
  formErrors,
  isSubmitting,
  isDragOver,
  isUploading,
  onFormChange,
  onSubmit,
  onResetForm,
  onSetIsDragOver,
  onSetIsUploading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image upload handlers
  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      onSetIsUploading(true);
      try {
        // Upload file to API
        const response = await apiService.uploadImage(file);

        if (response.success && response.data?.url) {
          // Set the returned URL as the image
          onFormChange("image", response.data.url);
          toast.success("Image uploaded successfully!");
        } else {
          toast.error(response.message || "Failed to upload image");
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        if (error instanceof Error && error.message.includes("Unauthorized")) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
      } finally {
        onSetIsUploading(false);
      }
    },
    [onFormChange, onSetIsUploading]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      onSetIsDragOver(true);
    },
    [onSetIsDragOver]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      onSetIsDragOver(false);
    },
    [onSetIsDragOver]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      onSetIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect, onSetIsDragOver]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const removeImage = useCallback(() => {
    onFormChange("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onFormChange]);

  const handleClose = () => {
    onClose();
    onResetForm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingCategory ? "Edit Category" : "Add New Category"}
      size="lg"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                formErrors.name ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter category name"
              value={formData.name}
              onChange={(e) => onFormChange("name", e.target.value)}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.isActive ? "active" : "inactive"}
              onChange={(e) =>
                onFormChange("isActive", e.target.value === "active")
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formErrors.description ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter category description"
            value={formData.description}
            onChange={(e) => onFormChange("description", e.target.value)}
          />
          {formErrors.description && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commission Type *
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.type}
              onChange={(e) =>
                onFormChange("type", e.target.value as "percentage" | "flat")
              }
            >
              <option value="percentage">Percentage</option>
              <option value="flat">Flat Amount</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commission{" "}
              {formData.type === "percentage" ? "Percentage" : "Amount"} *
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0"
                max={formData.type === "percentage" ? "100" : undefined}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.commission ? "border-red-300" : "border-gray-300"
                }`}
                placeholder={`Enter commission ${
                  formData.type === "percentage" ? "percentage" : "amount"
                }`}
                value={formData.commission}
                onChange={(e) =>
                  onFormChange("commission", parseFloat(e.target.value) || 0)
                }
              />
              {formData.type === "percentage" ? (
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              ) : (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
              )}
            </div>
            {formErrors.commission && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.commission}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image *
          </label>
          <div className="space-y-4">
            {/* Image Upload Area */}
            {!formData.image ? (
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  isDragOver
                    ? "border-blue-400 bg-blue-50"
                    : formErrors.image
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />

                <div className="space-y-3">
                  {isUploading ? (
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}

                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {isUploading
                        ? "Uploading image..."
                        : isDragOver
                        ? "Drop your image here"
                        : "Upload an image"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {isUploading
                        ? "Please wait while we upload your image"
                        : "Drag and drop an image here, or click to browse"}
                    </p>
                  </div>

                  <div className="text-xs text-gray-400">
                    <p>Supports: JPG, PNG, GIF, WebP</p>
                    <p>Max size: 5MB</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Image Preview */
              <div className="relative">
                <div className="relative w-full max-w-xs mx-auto">
                  <img
                    src={formData.image}
                    alt="Category preview"
                    className="w-full h-48 object-cover rounded-lg border shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {formErrors.image && (
              <p className="text-sm text-red-600 text-center">
                {formErrors.image}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? editingCategory
                ? "Updating..."
                : "Creating..."
              : editingCategory
              ? "Update Category"
              : "Create Category"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateEditCategoryModal;
