export interface CreateCategoryRequest {
  name: string;
  description: string;
  commission: number;
  type: "percentage" | "flat";
  image: string;
  isActive: boolean;
}

export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
  commission: number;
  type: "percentage" | "flat";
  slug: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryResponse {
  success: boolean;
  message: string;
  data: CategoryResponse;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  commission: number;
  type: "percentage" | "flat";
  commissionType: "percentage" | "flat";
  slug: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Computed fields for display
  status: "active" | "inactive";
  productsCount: number;
  parentCategory?: string;
}
