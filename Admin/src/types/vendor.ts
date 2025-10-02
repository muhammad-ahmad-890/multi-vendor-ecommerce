export interface VendorDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  isActive: boolean;
}

export interface VendorStore {
  id: string;
  city: string;
  country: string | null;
  coverImage: string | null;
  createdAt: string;
  description: string | null;
  isRejected: boolean;
  isVerified: boolean;
  pinCode: string;
  profileImage: string | null;
  reason: string | null;
  returnPolicy: string | null;
  shippingDay: string | null;
  state: string;
  storeName: string;
  street: string | null;
  updatedAt: string;
  userName: string;
  vendorId: string;
  businessType?: "individual" | "company" | "partnership"; // Added businessType
}

export interface VendorDocument {
  id: string;
  storeId: string;
  documentType: string;
  status: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  reason?: string | null; // Added reason field
}

export interface UnverifiedVendor {
  vendor: VendorDetails;
  store: VendorStore;
  documents: VendorDocument[];
}

export interface GetUnverifiedVendorsResponse {
  success: boolean;
  message: string;
  data: {
    data: UnverifiedVendor[];
    pagination: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
}
