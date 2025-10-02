import React from "react";

interface PaymentTabsProps {
  activeTab: "payments" | "reports" | "settings";
  onTabChange: (tab: "payments" | "reports" | "settings") => void;
}

const PaymentTabs: React.FC<PaymentTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange("payments")}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === "payments"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => onTabChange("reports")}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === "reports"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Reports
        </button>
        <button
          onClick={() => onTabChange("settings")}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === "settings"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Settings
        </button>
      </nav>
    </div>
  );
};

export default PaymentTabs;
