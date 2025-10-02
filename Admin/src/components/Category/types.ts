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
