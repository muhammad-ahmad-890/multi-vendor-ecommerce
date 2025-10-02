import React, { useState } from "react";
import Badge from "../components/UI/Badge";
import {
  CouponHeader,
  CouponTabs,
  CouponContent,
  type Coupon,
} from "../components/Coupons";

const Coupons: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "my_coupons" | "marketplace_coupons"
  >("my_coupons");

  const myCoupons: Coupon[] = [
    {
      id: 1,
      code: "combo100",
      amount: "₹50.00",
      discountType: "fixed_product",
      usage: "0/50",
      expiryDate: "20/03/2025",
      status: "expired",
    },
    {
      id: 2,
      code: "SAVE20",
      amount: "20%",
      discountType: "percentage",
      usage: "15/100",
      expiryDate: "15/02/2025",
      status: "expired",
    },
    {
      id: 3,
      code: "WELCOME50",
      amount: "₹100.00",
      discountType: "fixed",
      usage: "25/200",
      expiryDate: "30/01/2025",
      status: "expired",
    },
    {
      id: 4,
      code: "FLASH25",
      amount: "25%",
      discountType: "percentage",
      usage: "50/50",
      expiryDate: "31/12/2024",
      status: "full",
    },
  ];

  const marketplaceCoupons: Coupon[] = [
    {
      id: 5,
      code: "PLATFORM10",
      amount: "10%",
      discountType: "percentage",
      usage: "45/200",
      expiryDate: "28/02/2025",
      status: "active",
    },
    {
      id: 6,
      code: "NEWUSER25",
      amount: "₹25.00",
      discountType: "fixed",
      usage: "120/500",
      expiryDate: "15/03/2025",
      status: "active",
    },
  ];

  const getDiscountTypeLabel = (type: string) => {
    switch (type) {
      case "fixed_product":
        return "Fixed product discount";
      case "percentage":
        return "Percentage discount";
      case "fixed":
        return "Fixed discount";
      default:
        return type;
    }
  };

  const getDiscountTypeColor = (type: string) => {
    switch (type) {
      case "fixed_product":
        return "bg-yellow-100 text-yellow-800";
      case "percentage":
        return "bg-blue-100 text-blue-800";
      case "fixed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "expired":
        return (
          <Badge variant="error" size="sm">
            Expired
          </Badge>
        );
      case "full":
        return (
          <Badge variant="error" size="sm">
            Full
          </Badge>
        );
      case "active":
        return (
          <Badge variant="success" size="sm">
            Active
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleEditCoupon = (couponId: number) => {
    console.log("Edit coupon:", couponId);
    // Add edit functionality here
  };

  const handleDeleteCoupon = (couponId: number) => {
    console.log("Delete coupon:", couponId);
    // Add delete functionality here
  };

  const handleAddCoupon = () => {
    console.log("Add new coupon");
    // Add create functionality here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CouponHeader onAddCoupon={handleAddCoupon} />

      {/* Tabs */}
      <CouponTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <CouponContent
        activeTab={activeTab}
        myCoupons={myCoupons}
        marketplaceCoupons={marketplaceCoupons}
        onEditCoupon={handleEditCoupon}
        onDeleteCoupon={handleDeleteCoupon}
        getDiscountTypeLabel={getDiscountTypeLabel}
        getDiscountTypeColor={getDiscountTypeColor}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
};

export default Coupons;
