import { LoginRequest, LoginResponse } from "../types/auth";
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  Category,
} from "../types/category";
import { GetUnverifiedVendorsResponse } from "../types/vendor";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://multi-vendor-backend-production.up.railway.app";

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Get auth token from localStorage
    const authToken = this.getAuthToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const config: RequestInit = {
      headers: {
        ...headers,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          this.removeAuthToken();
          throw new Error("Unauthorized: Please login again");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async createCategory(
    categoryData: CreateCategoryRequest
  ): Promise<CreateCategoryResponse> {
    return this.request<CreateCategoryResponse>("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(
    categoryId: string,
    categoryData: CreateCategoryRequest
  ): Promise<CreateCategoryResponse> {
    return this.request<CreateCategoryResponse>(
      `/api/admin/categories/${categoryId}`,
      {
        method: "PUT",
        body: JSON.stringify(categoryData),
      }
    );
  }

  async deleteCategory(categoryId: string): Promise<{
    success: boolean;
    message: string;
    data?: any;
  }> {
    return this.request(`/api/admin/categories/${categoryId}`, {
      method: "DELETE",
    });
  }

  async uploadImage(file: File): Promise<{
    success: boolean;
    message: string;
    data?: {
      url: string;
    };
  }> {
    const url = `${this.baseURL}/api/user/upload`;

    const authToken = this.getAuthToken();
    if (!authToken) {
      throw new Error("No authorization token found");
    }

    const formData = new FormData();
    formData.append("file", file);

    const headers: Record<string, string> = {
      Authorization: `Bearer ${authToken}`,
    };

    const config: RequestInit = {
      method: "POST",
      headers,
      body: formData,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          this.removeAuthToken();
          throw new Error("Unauthorized: Please login again");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  }

  async getCategories(
    params: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
    } = {}
  ): Promise<{
    success: boolean;
    message: string;
    data: {
      data: Category[];
      meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    };
  }> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append("page", params.page.toString());
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.search) searchParams.append("search", params.search);
    if (params.status) searchParams.append("status", params.status);

    const queryString = searchParams.toString();
    const endpoint = `/api/admin/categories${
      queryString ? `?${queryString}` : ""
    }`;

    return this.request(endpoint, {
      method: "GET",
    });
  }

  getAuthToken(): string | null {
    const token = localStorage.getItem("authToken");
    if (token && token.trim() === "") {
      this.removeAuthToken();
      return null;
    }
    return token;
  }

  setAuthToken(token: string): void {
    if (token && token.trim()) {
      localStorage.setItem("authToken", token);
    } else {
      console.warn("Attempted to set empty or invalid token");
    }
  }

  removeAuthToken(): void {
    localStorage.removeItem("authToken");
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return Boolean(token && token.trim().length > 0);
  }

  validateToken(token: string): boolean {
    return Boolean(token && token.trim() !== "" && token.length > 10);
  }

  async debugTokenStatus(): Promise<void> {
    const token = this.getAuthToken();
    console.log("=== Token Debug Info ===");
    console.log("Token exists:", !!token);
    console.log("Token value:", token);
    console.log("Token length:", token ? token.length : 0);
    console.log("Is authenticated:", this.isAuthenticated());
    console.log("LocalStorage keys:", Object.keys(localStorage));
    console.log("========================");
  }

  async getUnverifiedVendors(
    params: { page?: number; limit?: number } = {}
  ): Promise<GetUnverifiedVendorsResponse> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append("page", params.page.toString());
    if (params.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/api/admin/verification/unverified-vendors${
      queryString ? `?${queryString}` : ""
    }`;

    return this.request<GetUnverifiedVendorsResponse>(endpoint, {
      method: "GET",
    });
  }

  async approveForm(
    vendorId: string
  ): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/admin/verification/${vendorId}/approve-form`,
      {
        method: "POST",
      }
    );
  }

  async approveFinal(
    vendorId: string
  ): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/admin/verification/${vendorId}/approve-final`,
      {
        method: "POST",
      }
    );
  }

  // ✅ New Reject Vendor Function
  async rejectVendor(
    vendorId: string
  ): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/admin/verification/${vendorId}/reject`,
      {
        method: "POST",
      }
    );
  }

  async updateDocumentStatus(
    userId: string,
    documentId: string,
    status: "APPROVED" | "REJECTED",
    reason?: string
  ): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/admin/users/${userId}/documents/${documentId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status, reason }),
      }
    );
  }

  // Vendor Management APIs
  async getVendorsManagement(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<{ success: boolean; data: any }> {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.status) queryParams.append('status', params.status);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const response = await this.request<{ success: boolean; data: any }>(
        `/api/admin/vendors-management?${queryParams.toString()}`
      );
      return response;
    } catch (error) {
      console.error('Error fetching vendors management data:', error);
      throw error;
    }
  }

  async toggleVendorActiveStatus(vendorId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.request<{ success: boolean; message: string }>(
        `/api/admin/vendors-management/${vendorId}/toggle-active`,
        {
          method: "PATCH",
        }
      );
      return response;
    } catch (error) {
      console.error('Error toggling vendor active status:', error);
      throw error;
    }
  }

  // ===== User Management (Admin) =====
  async listUsersByType(params: {
    type: "customers" | "vendors" | "vendor-staff" | "admins" | "admin-staff";
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<{ success: boolean; message: string; data: any }> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", String(params.page));
    if (params.limit) queryParams.append("limit", String(params.limit));
    if (params.search) queryParams.append("search", params.search);
    if (params.status) queryParams.append("status", params.status);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    let path = "/api/admin/users/customers";
    if (params.type === "vendors") path = "/api/admin/users/vendors";
    if (params.type === "vendor-staff") path = "/api/admin/users/vendor-staff";
    if (params.type === "admins") path = "/api/admin/users/admins";
    if (params.type === "admin-staff") path = "/api/admin/users/admin-staff";

    const url = `${path}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    return this.request<{ success: boolean; message: string; data: any }>(url, { method: "GET" });
  }

  async getUserDetail(userId: string): Promise<{ success: boolean; message: string; data: any }> {
    return this.request<{ success: boolean; message: string; data: any }>(
      `/api/admin/users/${userId}`,
      { method: "GET" }
    );
  }

  async deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/admin/users/${userId}`,
      { method: "DELETE" }
    );
  }

  async demoteVendorToCustomer(userId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/admin/users/${userId}/demote-vendor`,
      { method: "PATCH" }
    );
  }
}

export const apiService = new ApiService();
export default apiService;

