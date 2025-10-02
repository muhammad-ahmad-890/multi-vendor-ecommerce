import React from "react";
import { Calendar } from "lucide-react";
import Badge from "../UI/Badge";
import { Coupon } from "./types";

interface CouponRowProps {
  coupon: Coupon;
  onEditCoupon: (couponId: number) => void;
  onDeleteCoupon: (couponId: number) => void;
  getDiscountTypeLabel: (type: string) => string;
  getDiscountTypeColor: (type: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

const CouponRow: React.FC<CouponRowProps> = ({
  coupon,
  onEditCoupon,
  onDeleteCoupon,
  getDiscountTypeLabel,
  getDiscountTypeColor,
  getStatusBadge,
}) => {
  return (
    <tr key={coupon.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-red-600 font-mono font-medium">
          {coupon.code}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {coupon.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDiscountTypeColor(
            coupon.discountType
          )}`}
        >
          {getDiscountTypeLabel(coupon.discountType)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-900">{coupon.usage}</span>
          {coupon.status === "full" && (
            <Badge variant="error" size="sm">
              Full
            </Badge>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-900">{coupon.expiryDate}</span>
          {(coupon.status === "expired" || coupon.status === "full") &&
            getStatusBadge(coupon.status)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
        <button
          onClick={() => onEditCoupon(coupon.id)}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          EDIT
        </button>
        <button
          onClick={() => onDeleteCoupon(coupon.id)}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};

export default CouponRow;
