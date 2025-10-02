export interface VendorPayment {
  id: number;
  vendorName: string;
  vendorId: string;
  email: string;
  paymentMethod: "bank_transfer" | "paypal" | "stripe" | "check";
  amount: number;
  commission: number;
  netAmount: number;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  paymentDate: string;
  dueDate: string;
  description: string;
  orderCount: number;
  totalSales: number;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    routingNumber: string;
  };
}

export interface PaymentSummary {
  totalPending: number;
  totalProcessing: number;
  totalCompleted: number;
  totalFailed: number;
  totalAmount: number;
  totalCommission: number;
  totalNetAmount: number;
}
