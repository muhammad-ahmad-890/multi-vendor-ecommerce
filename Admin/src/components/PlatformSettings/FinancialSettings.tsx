import React from "react";
import { DollarSign } from "lucide-react";
import Card from "../UI/Card";
import { PlatformSettingsData } from "./types";

interface FinancialSettingsProps {
  settings: PlatformSettingsData;
  onInputChange: (field: string, value: string | boolean) => void;
}

const FinancialSettings: React.FC<FinancialSettingsProps> = ({
  settings,
  onInputChange,
}) => {
  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">
          Financial Settings
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commission Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.commissionRate}
            onChange={(e) => onInputChange("commissionRate", e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Percentage commission charged to vendors per sale
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tax Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.taxRate}
            onChange={(e) => onInputChange("taxRate", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.currency}
            onChange={(e) => onInputChange("currency", e.target.value)}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Shipping Cost ($)
          </label>
          <input
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.defaultShippingCost}
            onChange={(e) =>
              onInputChange("defaultShippingCost", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Free Shipping Threshold ($)
          </label>
          <input
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.freeShippingThreshold}
            onChange={(e) =>
              onInputChange("freeShippingThreshold", e.target.value)
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default FinancialSettings;
