import React from "react";
import {
  Image,
  Edit,
  Trash2,
  Eye,
  Monitor,
  Globe,
  Smartphone,
} from "lucide-react";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import { Banner } from "./types";

interface BannerListProps {
  banners: Banner[];
  onViewBanner: (banner: Banner) => void;
  onEditBanner: (banner: Banner) => void;
  onDeleteBanner: (bannerId: number) => void;
}

const BannerList: React.FC<BannerListProps> = ({
  banners,
  onViewBanner,
  onEditBanner,
  onDeleteBanner,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" size="sm">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="default" size="sm">
            Inactive
          </Badge>
        );
      case "scheduled":
        return (
          <Badge variant="warning" size="sm">
            Scheduled
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case "top":
        return <Monitor className="h-4 w-4 text-blue-500" />;
      case "middle":
        return <Monitor className="h-4 w-4 text-green-500" />;
      case "bottom":
        return <Monitor className="h-4 w-4 text-purple-500" />;
      case "sidebar":
        return <Monitor className="h-4 w-4 text-orange-500" />;
      default:
        return <Monitor className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "all":
        return <Globe className="h-4 w-4 text-blue-500" />;
      case "desktop":
        return <Monitor className="h-4 w-4 text-green-500" />;
      case "mobile":
        return <Smartphone className="h-4 w-4 text-purple-500" />;
      default:
        return <Globe className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card padding={false}>
      <div className="divide-y divide-gray-200">
        {banners.length === 0 ? (
          <div className="p-8 text-center">
            <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No banners found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          banners.map((banner) => (
            <div
              key={banner.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {banner.title}
                      </h3>
                      {getStatusBadge(banner.status)}
                      <div className="flex items-center space-x-1">
                        {getPositionIcon(banner.position)}
                        <span className="text-xs text-gray-500 capitalize">
                          {banner.position}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getDeviceIcon(banner.device)}
                        <span className="text-xs text-gray-500 capitalize">
                          {banner.device}
                        </span>
                      </div>
                      <Badge variant="info" size="sm">
                        Priority {banner.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {formatDate(banner.createdAt)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onViewBanner(banner)}
                          className="text-gray-400 hover:text-gray-600"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEditBanner(banner)}
                          className="text-blue-400 hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteBanner(banner.id)}
                          className="text-red-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {banner.description}
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                    {banner.clickUrl && (
                      <span>Click URL: {banner.clickUrl}</span>
                    )}
                    {banner.startDate && (
                      <span>Start: {formatDate(banner.startDate)}</span>
                    )}
                    {banner.endDate && (
                      <span>End: {formatDate(banner.endDate)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default BannerList;
