import React from "react";
import { Truck } from "lucide-react";
import Card from "../UI/Card";
import { PlatformSettingsData } from "./types";

interface SystemSettingsProps {
  settings: PlatformSettingsData;
  onInputChange: (field: string, value: string | boolean) => void;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({
  settings,
  onInputChange,
}) => {
  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Truck className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Maintenance Mode
            </label>
            <p className="text-xs text-gray-500">
              Put the platform in maintenance mode
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.maintenanceMode}
              onChange={(e) =>
                onInputChange("maintenanceMode", e.target.checked)
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave blank to keep current password
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </Card>
  );
};

export default SystemSettings;
