import { LucideIcon } from "lucide-react";

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  iconBgColor: string;
}

export interface ChartData {
  name: string;
  sales: number;
  orders: number;
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: 'pending' | 'approved';
  products: number;
}

export interface CategoryData {
  name: string;
  value: number;
}
