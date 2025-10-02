import React from "react";

const DashboardHeader: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="mt-2 text-gray-600">
        Welcome back! Here's what's happening with your marketplace.
      </p>
    </div>
  );
};

export default DashboardHeader;
