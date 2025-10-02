import React from "react";
import { Users, Store, UserCheck, Shield } from "lucide-react";

interface Tab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface UserTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const UserTabs: React.FC<UserTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { id: "customers", name: "Customers", icon: Users },
    { id: "vendors", name: "Vendors", icon: Store },
    { id: "vendorStaff", name: "Vendor Staff", icon: UserCheck },
    { id: "administrators", name: "Administrators", icon: Shield },
    { id: "adminStaff", name: "Admin Staff", icon: UserCheck },
  ];

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default UserTabs;
