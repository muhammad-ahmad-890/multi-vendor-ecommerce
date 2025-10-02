import React from "react";
import {
  Languages,
  Globe,
  Users,
  Volume2,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import { Language } from "./types";

interface LanguageListProps {
  languages: Language[];
  onViewLanguage: (language: Language) => void;
  onEditLanguage: (language: Language) => void;
  onDeleteLanguage: (languageId: number) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  getRegionIcon: (region: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
}

const LanguageList: React.FC<LanguageListProps> = ({
  languages,
  onViewLanguage,
  onEditLanguage,
  onDeleteLanguage,
  getStatusBadge,
  getRegionIcon,
  formatDate,
}) => {
  return (
    <Card padding={false}>
      <div className="divide-y divide-gray-200">
        {languages.length === 0 ? (
          <div className="p-8 text-center">
            <Languages className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No languages found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          languages.map((language) => (
            <div
              key={language.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Languages className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {language.name}
                      </h3>
                      {getStatusBadge(language.status)}
                      <div className="flex items-center space-x-1">
                        {getRegionIcon(language.region)}
                        <span className="text-xs text-gray-500">
                          {language.region}
                        </span>
                      </div>
                      <Badge variant="info" size="sm">
                        {language.code}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {formatDate(language.createdAt)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onViewLanguage(language)}
                          className="text-gray-400 hover:text-gray-600"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEditLanguage(language)}
                          className="text-blue-400 hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteLanguage(language.id)}
                          className="text-red-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{language.totalUsers} users</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Volume2 className="h-4 w-4" />
                      <span>{language.totalContent} content</span>
                    </span>
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

export default LanguageList;
