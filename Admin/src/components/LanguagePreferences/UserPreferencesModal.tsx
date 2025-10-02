import React from "react";
import { Users, Languages, CheckCircle, XCircle } from "lucide-react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { UserLanguagePreference } from "./types";

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserLanguagePreference | null;
  getLanguageIcon: (language: string) => React.ReactNode;
}

const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({
  isOpen,
  onClose,
  user,
  getLanguageIcon,
}) => {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Language Preferences"
      size="lg"
    >
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {user.userName}
            </h3>
            <div className="flex items-center space-x-3 mt-2">
              <Badge variant="info">Primary: {user.primaryLanguage}</Badge>
              <span className="text-sm text-gray-600">{user.userEmail}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Selected Languages
            </h4>
            <div className="space-y-2">
              {user.selectedLanguages.map((language, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {getLanguageIcon(language)}
                  <span className="text-sm text-gray-900">{language}</span>
                  {language === user.primaryLanguage && (
                    <Badge variant="success" size="sm">
                      Primary
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Content Preferences
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Live Streams:</span>
                {user.contentPreferences.liveStreams ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Reels:</span>
                {user.contentPreferences.reels ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Videos:</span>
                {user.contentPreferences.videos ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Audio:</span>
                {user.contentPreferences.audio ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
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
        </div>
      </div>
    </Modal>
  );
};

export default UserPreferencesModal;
