import React, { useState } from "react";
import { Languages, Globe } from "lucide-react";
import Badge from "../components/UI/Badge";
import {
  LanguagePreferencesHeader,
  LanguageStats,
  LanguageTabs,
  LanguageFilters,
  LanguageList,
  UserPreferencesList,
  LanguageDetailsModal,
  UserPreferencesModal,
  CreateLanguageModal,
  type Language,
  type UserLanguagePreference,
} from "../components/LanguagePreferences";

const LanguagePreferences: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("languages");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  const [selectedUser, setSelectedUser] =
    useState<UserLanguagePreference | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const languages: Language[] = [
    {
      id: 1,
      name: "Hindi",
      code: "hi",
      region: "India",
      status: "active",
      totalUsers: 1250,
      totalContent: 450,
      createdAt: "2024-01-15 10:00:00",
      updatedAt: "2024-01-15 10:00:00",
    },
    {
      id: 2,
      name: "Punjabi",
      code: "pa",
      region: "India",
      status: "active",
      totalUsers: 890,
      totalContent: 320,
      createdAt: "2024-01-14 15:30:00",
      updatedAt: "2024-01-14 15:30:00",
    },
    {
      id: 3,
      name: "Gujarati",
      code: "gu",
      region: "India",
      status: "active",
      totalUsers: 650,
      totalContent: 180,
      createdAt: "2024-01-13 12:00:00",
      updatedAt: "2024-01-13 12:00:00",
    },
    {
      id: 4,
      name: "Marathi",
      code: "mr",
      region: "India",
      status: "active",
      totalUsers: 720,
      totalContent: 210,
      createdAt: "2024-01-12 08:00:00",
      updatedAt: "2024-01-12 08:00:00",
    },
    {
      id: 5,
      name: "Bengali",
      code: "bn",
      region: "India",
      status: "inactive",
      totalUsers: 0,
      totalContent: 0,
      createdAt: "2024-01-11 14:20:00",
      updatedAt: "2024-01-11 14:20:00",
    },
    {
      id: 6,
      name: "Tamil",
      code: "ta",
      region: "India",
      status: "active",
      totalUsers: 450,
      totalContent: 120,
      createdAt: "2024-01-10 09:15:00",
      updatedAt: "2024-01-10 09:15:00",
    },
    {
      id: 7,
      name: "Telugu",
      code: "te",
      region: "India",
      status: "active",
      totalUsers: 380,
      totalContent: 95,
      createdAt: "2024-01-09 16:45:00",
      updatedAt: "2024-01-09 16:45:00",
    },
    {
      id: 8,
      name: "Kannada",
      code: "kn",
      region: "India",
      status: "active",
      totalUsers: 290,
      totalContent: 75,
      createdAt: "2024-01-08 11:30:00",
      updatedAt: "2024-01-08 11:30:00",
    },
  ];

  const userPreferences: UserLanguagePreference[] = [
    {
      id: 1,
      userId: 101,
      userName: "Rahul Kumar",
      userEmail: "rahul@example.com",
      selectedLanguages: ["Hindi", "Punjabi", "English"],
      primaryLanguage: "Hindi",
      contentPreferences: {
        liveStreams: true,
        reels: true,
        videos: true,
        audio: false,
      },
      lastUpdated: "2024-01-15 14:30:00",
    },
    {
      id: 2,
      userId: 102,
      userName: "Priya Patel",
      userEmail: "priya@example.com",
      selectedLanguages: ["Gujarati", "Hindi", "English"],
      primaryLanguage: "Gujarati",
      contentPreferences: {
        liveStreams: true,
        reels: false,
        videos: true,
        audio: true,
      },
      lastUpdated: "2024-01-15 12:15:00",
    },
    {
      id: 3,
      userId: 103,
      userName: "Amit Singh",
      userEmail: "amit@example.com",
      selectedLanguages: ["Punjabi", "Hindi"],
      primaryLanguage: "Punjabi",
      contentPreferences: {
        liveStreams: false,
        reels: true,
        videos: true,
        audio: true,
      },
      lastUpdated: "2024-01-15 10:45:00",
    },
    {
      id: 4,
      userId: 104,
      userName: "Sneha Reddy",
      userEmail: "sneha@example.com",
      selectedLanguages: ["Telugu", "Hindi", "English"],
      primaryLanguage: "Telugu",
      contentPreferences: {
        liveStreams: true,
        reels: true,
        videos: false,
        audio: true,
      },
      lastUpdated: "2024-01-15 09:20:00",
    },
    {
      id: 5,
      userId: 105,
      userName: "Vikram Joshi",
      userEmail: "vikram@example.com",
      selectedLanguages: ["Marathi", "Hindi"],
      primaryLanguage: "Marathi",
      contentPreferences: {
        liveStreams: true,
        reels: true,
        videos: true,
        audio: false,
      },
      lastUpdated: "2024-01-15 08:10:00",
    },
  ];

  const filteredLanguages = languages.filter((language) => {
    const matchesSearch =
      language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      language.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || language.status === statusFilter;
    const matchesRegion =
      regionFilter === "all" || language.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const filteredUsers = userPreferences.filter((user) => {
    const matchesSearch =
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.selectedLanguages.some((lang) =>
        lang.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" size="sm">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="default" size="sm">
            Inactive
          </Badge>
        );
      default:
        return null;
    }
  };

  const getRegionIcon = () => {
    return <Globe className="h-4 w-4 text-blue-500" />;
  };

  const getLanguageIcon = () => {
    return <Languages className="h-4 w-4 text-green-500" />;
  };

  const handleCreateLanguage = () => {
    setShowCreateModal(true);
  };

  const handleEditLanguage = (language: Language) => {
    console.log("Editing language:", language);
    // Add edit logic here
  };

  const handleDeleteLanguage = (languageId: number) => {
    console.log(`Deleting language ${languageId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <LanguagePreferencesHeader onCreateLanguage={handleCreateLanguage} />

      {/* Stats Cards */}
      <LanguageStats languages={languages} userPreferences={userPreferences} />

      {/* Tabs */}
      <LanguageTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content based on active tab */}
      {activeTab === "languages" ? (
        <>
          {/* Filters and Search */}
          <LanguageFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            regionFilter={regionFilter}
            onRegionFilterChange={setRegionFilter}
          />

          {/* Languages List */}
          <LanguageList
            languages={filteredLanguages}
            onViewLanguage={(language) => {
              setSelectedLanguage(language);
              setShowLanguageModal(true);
            }}
            onEditLanguage={handleEditLanguage}
            onDeleteLanguage={handleDeleteLanguage}
            getStatusBadge={getStatusBadge}
            getRegionIcon={getRegionIcon}
            formatDate={formatDate}
          />
        </>
      ) : (
        <>
          {/* User Preferences Search */}
          <LanguageFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            regionFilter={regionFilter}
            onRegionFilterChange={setRegionFilter}
            isForUsers={true}
          />

          {/* User Preferences List */}
          <UserPreferencesList
            users={filteredUsers}
            onViewUser={(user) => {
              setSelectedUser(user);
              setShowUserModal(true);
            }}
            formatDate={formatDate}
          />
        </>
      )}

      {/* Language Details Modal */}
      <LanguageDetailsModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        language={selectedLanguage}
        onEditLanguage={handleEditLanguage}
        getStatusBadge={getStatusBadge}
        getRegionIcon={getRegionIcon}
        formatDate={formatDate}
      />

      {/* User Preferences Modal */}
      <UserPreferencesModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={selectedUser}
        getLanguageIcon={getLanguageIcon}
      />

      {/* Create Language Modal */}
      <CreateLanguageModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default LanguagePreferences;
