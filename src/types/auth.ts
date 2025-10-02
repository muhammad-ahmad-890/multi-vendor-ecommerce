export interface AdminUser {
  id: string;
  deviceId: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  mobile: string | null;
  avatar: string | null;
  profilePhoto: string | null;
  coverPhoto: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  role: string;
  status: string;
  city: string | null;
  state: string | null;
  address: string | null;
  storeName: string | null;
  storeAddress: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: AdminUser;
    authToken: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
