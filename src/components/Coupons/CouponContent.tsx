import React from "react";
import { Coupon } from "./types";
import CouponTable from "./CouponTable";

interface CouponContentProps {
  activeTab: "my_coupons" | "marketplace_coupons";
  myCoupons: Coupon[];
  marketplaceCoupons: Coupon[];
  onEditCoupon: (couponId: number) => void;
  onDeleteCoupon: (couponId: number) => void;
  getDiscountTypeLabel: (type: string) => string;
  getDiscountTypeColor: (type: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

const CouponContent: React.FC<CouponContentProps> = ({
  activeTab,
  myCoupons,
  marketplaceCoupons,
  onEditCoupon,
  onDeleteCoupon,
  getDiscountTypeLabel,
  getDiscountTypeColor,
  getStatusBadge,
}) => {
  const currentCoupons =
    activeTab === "my_coupons" ? myCoupons : marketplaceCoupons;
  const title =
    activeTab === "my_coupons" ? "My Coupons" : "Marketplace Coupons";
  const description =
    activeTab === "my_coupons"
      ? "Manage your store's promotional coupons and discount codes."
      : "Platform-wide promotional coupons and discount codes.";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
      <CouponTable
        coupons={currentCoupons}
        onEditCoupon={onEditCoupon}
        onDeleteCoupon={onDeleteCoupon}
        getDiscountTypeLabel={getDiscountTypeLabel}
        getDiscountTypeColor={getDiscountTypeColor}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
};

export default CouponContent;
