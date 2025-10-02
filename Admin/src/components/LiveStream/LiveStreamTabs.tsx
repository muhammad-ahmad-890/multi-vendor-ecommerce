import React from "react";

interface LiveStreamTabsProps {
  activeTab: "ongoing" | "upcoming" | "completed" | "reels";
  onTabChange: (tabId: "ongoing" | "upcoming" | "completed" | "reels") => void;
}

const LiveStreamTabs: React.FC<LiveStreamTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: {
    id: "ongoing" | "upcoming" | "completed" | "reels";
    label: string;
  }[] = [
    { id: "ongoing", label: "On-Going" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
    { id: "reels", label: "Reels" },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default LiveStreamTabs;
