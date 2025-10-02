import React from "react";
import Card from "../UI/Card";

interface BannerStatsProps {
  totalBanners: number;
  activeCount: number;
  scheduledCount: number;
  inactiveCount: number;
}

const BannerStats: React.FC<BannerStatsProps> = ({
  totalBanners,
  activeCount,
  scheduledCount,
  inactiveCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalBanners}</div>
          <div className="text-sm text-gray-500">Total Banners</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {scheduledCount}
          </div>
          <div className="text-sm text-gray-500">Scheduled</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">
            {inactiveCount}
          </div>
          <div className="text-sm text-gray-500">Inactive</div>
        </div>
      </Card>
    </div>
  );
};

export default BannerStats;
