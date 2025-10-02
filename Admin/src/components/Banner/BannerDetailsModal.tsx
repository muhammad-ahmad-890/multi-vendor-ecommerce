import React from "react";
import { Monitor, Globe, Smartphone } from "lucide-react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { Banner } from "./types";

interface BannerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner: Banner | null;
  onEditBanner: (banner: Banner) => void;
}

const BannerDetailsModal: React.FC<BannerDetailsModalProps> = ({
  isOpen,
  onClose,
  banner,
  onEditBanner,
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

  if (!banner) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Banner Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-48 h-32 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {banner.title}
            </h3>
            <div className="flex items-center space-x-3 mt-2">
              {getStatusBadge(banner.status)}
              <div className="flex items-center space-x-1">
                {getPositionIcon(banner.position)}
                <span className="text-sm text-gray-600 capitalize">
                  {banner.position}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {getDeviceIcon(banner.device)}
                <span className="text-sm text-gray-600 capitalize">
                  {banner.device}
                </span>
              </div>
              <Badge variant="info">Priority {banner.priority}</Badge>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">{banner.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Banner Information
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Created:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {formatDate(banner.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Updated:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {formatDate(banner.updatedAt)}
                </span>
              </div>
              {banner.clickUrl && (
                <div>
                  <span className="text-sm text-gray-500">Click URL:</span>
                  <span className="ml-2 text-sm text-blue-600">
                    {banner.clickUrl}
                  </span>
                </div>
              )}
              {banner.startDate && (
                <div>
                  <span className="text-sm text-gray-500">Start Date:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {formatDate(banner.startDate)}
                  </span>
                </div>
              )}
              {banner.endDate && (
                <div>
                  <span className="text-sm text-gray-500">End Date:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {formatDate(banner.endDate)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Settings</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Position:</span>
                <span className="ml-2 text-sm text-gray-900 capitalize">
                  {banner.position}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Device:</span>
                <span className="ml-2 text-sm text-gray-900 capitalize">
                  {banner.device}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Priority:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {banner.priority}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => onEditBanner(banner)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Edit Banner
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BannerDetailsModal;
