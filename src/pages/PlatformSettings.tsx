import React, { useState } from "react";
import {
  PlatformHeader,
  GeneralSettings,
  FinancialSettings,
  VendorSettings,
  SystemSettings,
  NotificationSettings,
  SaveButton,
  type PlatformSettingsData,
} from "../components/PlatformSettings";

const PlatformSettings: React.FC = () => {
  const [settings, setSettings] = useState<PlatformSettingsData>({
    siteName: "MarketPlace Admin",
    siteDescription: "Multi-vendor eCommerce marketplace platform",
    supportEmail: "support@marketplace.com",
    adminEmail: "admin@marketplace.com",
    commissionRate: "10",
    taxRate: "8.5",
    currency: "USD",
    defaultShippingCost: "9.99",
    freeShippingThreshold: "50.00",
    maintenanceMode: false,
    allowVendorRegistration: true,
    requireVendorApproval: true,
    autoApproveProducts: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // In a real app, this would make an API call
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PlatformHeader />

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeneralSettings
          settings={settings}
          onInputChange={handleInputChange}
        />
        <FinancialSettings
          settings={settings}
          onInputChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VendorSettings settings={settings} onInputChange={handleInputChange} />
        <SystemSettings settings={settings} onInputChange={handleInputChange} />
      </div>

      {/* Notification Settings */}
      <NotificationSettings />

      {/* Save Button */}
      <SaveButton onSave={handleSave} />
    </div>
  );
};

export default PlatformSettings;
