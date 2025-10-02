export interface Follower {
  id: number;
  name: string;
  email: string;
  avatar: string;
  location: string;
  joinDate: string;
  status: "active" | "inactive" | "suspended" | "blocked";
  followers: number;
  following: number;
  lastActive: string;
  vendorType: "seller" | "buyer" | "both";
  totalOrders: number;
  totalSpent: number;
  engagementRate: number;
  storesFollowed: number;
  isBlocked: boolean;
}
