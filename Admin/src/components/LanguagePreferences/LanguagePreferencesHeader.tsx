import React from "react";
import { Plus } from "lucide-react";

interface LanguagePreferencesHeaderProps {
  onCreateLanguage: () => void;
}

const LanguagePreferencesHeader: React.FC<LanguagePreferencesHeaderProps> = ({
  onCreateLanguage,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Language Preferences
        </h1>
        <p className="mt-2 text-gray-600">
          Manage regional languages and user language preferences.
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={onCreateLanguage}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </button>
      </div>
    </div>
  );
};

export default LanguagePreferencesHeader;
