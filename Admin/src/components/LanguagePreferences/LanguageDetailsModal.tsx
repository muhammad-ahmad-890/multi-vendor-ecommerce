import React from "react";
import { Languages, Globe } from "lucide-react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { Language } from "./types";

interface LanguageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language | null;
  onEditLanguage: (language: Language) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  getRegionIcon: (region: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
}

const LanguageDetailsModal: React.FC<LanguageDetailsModalProps> = ({
  isOpen,
  onClose,
  language,
  onEditLanguage,
  getStatusBadge,
  getRegionIcon,
  formatDate,
}) => {
  if (!language) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Language Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Languages className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {language.name}
            </h3>
            <div className="flex items-center space-x-3 mt-2">
              {getStatusBadge(language.status)}
              <div className="flex items-center space-x-1">
                {getRegionIcon(language.region)}
                <span className="text-sm text-gray-600">{language.region}</span>
              </div>
              <Badge variant="info">Code: {language.code}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Language Information
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Created:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {formatDate(language.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Updated:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {formatDate(language.updatedAt)}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Users:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {language.totalUsers}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Content:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {language.totalContent}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Active Users:</span>
                <span className="text-sm text-gray-900">
                  {language.totalUsers}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Content Items:</span>
                <span className="text-sm text-gray-900">
                  {language.totalContent}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status:</span>
                <span className="text-sm text-gray-900 capitalize">
                  {language.status}
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
            onClick={() => onEditLanguage(language)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Edit Language
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LanguageDetailsModal;
