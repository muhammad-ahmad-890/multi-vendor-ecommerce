import React from "react";
import { Shield } from "lucide-react";
import Card from "../UI/Card";
import { PlatformSettingsData } from "./types";

interface VendorSettingsProps {
  settings: PlatformSettingsData;
  onInputChange: (field: string, value: string | boolean) => void;
}

const VendorSettings: React.FC<VendorSettingsProps> = ({
  settings,
  onInputChange,
}) => {
  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Vendor Management</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Allow Vendor Registration
            </label>
            <p className="text-xs text-gray-500">
              Enable new vendors to register on the platform
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.allowVendorRegistration}
              onChange={(e) =>
                onInputChange("allowVendorRegistration", e.target.checked)
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Require Vendor Approval
            </label>
            <p className="text-xs text-gray-500">
              Manually approve vendors before they can sell
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.requireVendorApproval}
              onChange={(e) =>
                onInputChange("requireVendorApproval", e.target.checked)
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Auto-Approve Products
            </label>
            <p className="text-xs text-gray-500">
              Automatically approve new products without review
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.autoApproveProducts}
              onChange={(e) =>
                onInputChange("autoApproveProducts", e.target.checked)
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </Card>
  );
};

export default VendorSettings;
