export interface Vendor {
  id: string;
  name: string;
  storeName: string;
  email: string;
  status: "approved" | "pending" | "suspended" | "blocked";
  joinDate: string;
  products: number;
  activeProducts: number;
  phone: string;
  address: string;
  liveStreams: number;
  totalOrders: number;
  totalSales: number;
  isActive: boolean;
  storeVerified: boolean;
}
