import React from "react";
import Card from "../UI/Card";
import { Coupon } from "./types";
import CouponRow from "./CouponRow";

interface CouponTableProps {
  coupons: Coupon[];
  onEditCoupon: (couponId: number) => void;
  onDeleteCoupon: (couponId: number) => void;
  getDiscountTypeLabel: (type: string) => string;
  getDiscountTypeColor: (type: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

const CouponTable: React.FC<CouponTableProps> = ({
  coupons,
  onEditCoupon,
  onDeleteCoupon,
  getDiscountTypeLabel,
  getDiscountTypeColor,
  getStatusBadge,
}) => {
  return (
    <Card padding={false}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                COUPON CODE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AMOUNT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DISCOUNT TYPE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                USAGE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                EXPIRY DATE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <CouponRow
                key={coupon.id}
                coupon={coupon}
                onEditCoupon={onEditCoupon}
                onDeleteCoupon={onDeleteCoupon}
                getDiscountTypeLabel={getDiscountTypeLabel}
                getDiscountTypeColor={getDiscountTypeColor}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CouponTable;
