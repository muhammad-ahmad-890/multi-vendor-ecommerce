import React from "react";
import Card from "../UI/Card";
import { Language, UserLanguagePreference } from "./types";

interface LanguageStatsProps {
  languages: Language[];
  userPreferences: UserLanguagePreference[];
}

const LanguageStats: React.FC<LanguageStatsProps> = ({
  languages,
  userPreferences,
}) => {
  const activeLanguages = languages.filter((l) => l.status === "active").length;
  const totalUsers = userPreferences.length;
  const totalContent = languages.reduce(
    (sum, lang) => sum + lang.totalContent,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {languages.length}
          </div>
          <div className="text-sm text-gray-500">Total Languages</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {activeLanguages}
          </div>
          <div className="text-sm text-gray-500">Active Languages</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
          <div className="text-sm text-gray-500">Users with Preferences</div>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {totalContent}
          </div>
          <div className="text-sm text-gray-500">Total Content</div>
        </div>
      </Card>
    </div>
  );
};

export default LanguageStats;
