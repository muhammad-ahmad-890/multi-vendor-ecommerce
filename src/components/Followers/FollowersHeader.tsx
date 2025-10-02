import React from "react";

interface FollowersHeaderProps {
  totalFollowers: number;
}

const FollowersHeader: React.FC<FollowersHeaderProps> = ({
  totalFollowers,
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Platform Followers</h1>
      <div className="flex items-center space-x-3">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{totalFollowers}</span> total platform
          users
        </div>
      </div>
    </div>
  );
};

export default FollowersHeader;
