import React from "react";
import { Users, Mic, Volume2, Headphones, Eye } from "lucide-react";
import Card from "../UI/Card";
import Badge from "../UI/Badge";
import { UserLanguagePreference } from "./types";

interface UserPreferencesListProps {
  users: UserLanguagePreference[];
  onViewUser: (user: UserLanguagePreference) => void;
  formatDate: (dateString: string) => string;
}

const UserPreferencesList: React.FC<UserPreferencesListProps> = ({
  users,
  onViewUser,
  formatDate,
}) => {
  return (
    <Card padding={false}>
      <div className="divide-y divide-gray-200">
        {users.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {user.userName}
                      </h3>
                      <Badge variant="info" size="sm">
                        {user.primaryLanguage}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">
                          {user.selectedLanguages.length} languages
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {formatDate(user.lastUpdated)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onViewUser(user)}
                          className="text-gray-400 hover:text-gray-600"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{user.userEmail}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {user.selectedLanguages.map((lang, index) => (
                        <Badge key={index} variant="default" size="sm">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Mic className="h-3 w-3" />
                      <span>
                        Live:{" "}
                        {user.contentPreferences.liveStreams ? "Yes" : "No"}
                      </span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Volume2 className="h-3 w-3" />
                      <span>
                        Reels: {user.contentPreferences.reels ? "Yes" : "No"}
                      </span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Headphones className="h-3 w-3" />
                      <span>
                        Audio: {user.contentPreferences.audio ? "Yes" : "No"}
                      </span>
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

export default UserPreferencesList;
