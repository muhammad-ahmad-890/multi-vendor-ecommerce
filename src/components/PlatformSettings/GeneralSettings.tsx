import React from "react";
import { Settings, Upload } from "lucide-react";
import Card from "../UI/Card";
import { PlatformSettingsData } from "./types";

interface GeneralSettingsProps {
  settings: PlatformSettingsData;
  onInputChange: (field: string, value: string | boolean) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  settings,
  onInputChange,
}) => {
  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.siteName}
            onChange={(e) => onInputChange("siteName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Description
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.siteDescription}
            onChange={(e) => onInputChange("siteDescription", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Support Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.supportEmail}
            onChange={(e) => onInputChange("supportEmail", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.adminEmail}
            onChange={(e) => onInputChange("adminEmail", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Logo
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              Upload Logo
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GeneralSettings;
