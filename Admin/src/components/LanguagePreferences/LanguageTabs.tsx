import React from "react";
import { Languages, Users } from "lucide-react";
import Card from "../UI/Card";

interface LanguageTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const LanguageTabs: React.FC<LanguageTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "languages", name: "Languages", icon: Languages },
    { id: "users", name: "User Preferences", icon: Users },
  ];

  return (
    <Card>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
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
    </Card>
  );
};

export default LanguageTabs;
