export interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  status: "active" | "inactive" | "scheduled";
  position: "top" | "middle" | "bottom" | "sidebar";
  device: "all" | "desktop" | "mobile";
  startDate?: string;
  endDate?: string;
  clickUrl?: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}
