export interface UnverifiedVendor {
  vendor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    status: "PENDING" | "FORM_APPROVED" | "APPROVED" | "REJECTED";
  };
  store: {
    storeName: string;
    businessType?: "individual" | "company" | "partnership";
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    isVerified: boolean;
    reason?: string;
    createdAt: string;
    updatedAt?: string;
  };
  documents: VendorDocument[];
}

export interface VendorDocument {
  id: string;
  documentType: string;
  fileUrl: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  reason?: string;
}

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  show: boolean;
}
