import React from "react";
import { Plus } from "lucide-react";

interface CouponHeaderProps {
  onAddCoupon: () => void;
}

const CouponHeader: React.FC<CouponHeaderProps> = ({ onAddCoupon }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Coupons</h1>
        <p className="mt-2 text-gray-600">
          Manage discount coupons and promotional codes.
        </p>
      </div>
      <button
        onClick={onAddCoupon}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Coupon
      </button>
    </div>
  );
};

export default CouponHeader;
