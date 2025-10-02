export interface Language {
  id: number;
  name: string;
  code: string;
  region: string;
  status: "active" | "inactive";
  totalUsers: number;
  totalContent: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserLanguagePreference {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  selectedLanguages: string[];
  primaryLanguage: string;
  contentPreferences: {
    liveStreams: boolean;
    reels: boolean;
    videos: boolean;
    audio: boolean;
  };
  lastUpdated: string;
}
