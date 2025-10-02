import React from "react";

interface CouponTabsProps {
  activeTab: "my_coupons" | "marketplace_coupons";
  onTabChange: (tab: "my_coupons" | "marketplace_coupons") => void;
}

const CouponTabs: React.FC<CouponTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange("my_coupons")}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === "my_coupons"
              ? "border-red-500 text-red-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          My Coupons
        </button>
        <button
          onClick={() => onTabChange("marketplace_coupons")}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === "marketplace_coupons"
              ? "border-red-500 text-red-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Marketplace Coupons
        </button>
      </nav>
    </div>
  );
};

export default CouponTabs;
