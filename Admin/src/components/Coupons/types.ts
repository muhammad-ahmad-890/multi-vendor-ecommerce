export interface Coupon {
  id: number;
  code: string;
  amount: string;
  discountType: "fixed_product" | "percentage" | "fixed";
  usage: string;
  expiryDate: string;
  status: "active" | "expired" | "full";
}
