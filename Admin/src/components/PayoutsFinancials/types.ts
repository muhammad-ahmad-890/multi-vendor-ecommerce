export interface Payout {
  id: number;
  vendor: string;
  amount: string;
  commission: string;
  period: string;
  requestDate: string;
  status: string;
  vendorEmail: string;
  bankAccount: string;
}

export interface RevenueData {
  name: string;
  revenue: number;
  commission: number;
}

export interface PayoutData {
  name: string;
  value: number;
  color: string;
}
