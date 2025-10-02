import React, { useState } from "react";
import {
  Trophy,
  Star,
  Gift,
  Target,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Settings,
  Award,
  Medal,
  Crown,
  Package,
} from "lucide-react";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import Modal from "../components/UI/Modal";

interface Achievement {
  id: number;
  name: string;
  description: string;
  type: "sales" | "orders" | "reviews" | "referrals" | "engagement";
  points: number;
  icon: string;
  difficulty: "easy" | "medium" | "hard";
  unlockedBy: number;
  totalUsers: number;
  status: "active" | "inactive";
}

interface Reward {
  id: number;
  name: string;
  description: string;
  type: "discount" | "free_shipping" | "cashback" | "points" | "badge";
  value: number;
  pointsRequired: number;
  maxUses: number;
  usedCount: number;
  validUntil: string;
  status: "active" | "inactive";
}

interface LeaderboardEntry {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  level: number;
  achievements: number;
  category: "vendors" | "customers" | "overall";
  change: "up" | "down" | "same";
}

const Gamification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "achievements" | "rewards" | "leaderboard" | "settings"
  >("overview");
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const achievements: Achievement[] = [
    {
      id: 1,
      name: "First Sale",
      description: "Complete your first sale on the platform",
      type: "sales",
      points: 100,
      icon: "🎯",
      difficulty: "easy",
      unlockedBy: 1250,
      totalUsers: 1500,
      status: "active",
    },
    {
      id: 2,
      name: "Sales Champion",
      description: "Achieve $10,000 in total sales",
      type: "sales",
      points: 500,
      icon: "🏆",
      difficulty: "medium",
      unlockedBy: 45,
      totalUsers: 200,
      status: "active",
    },
    {
      id: 3,
      name: "Review Master",
      description: "Receive 50 positive reviews",
      type: "reviews",
      points: 300,
      icon: "⭐",
      difficulty: "medium",
      unlockedBy: 89,
      totalUsers: 300,
      status: "active",
    },
    {
      id: 4,
      name: "Referral King",
      description: "Refer 10 new vendors to the platform",
      type: "referrals",
      points: 750,
      icon: "👑",
      difficulty: "hard",
      unlockedBy: 12,
      totalUsers: 50,
      status: "active",
    },
    {
      id: 5,
      name: "Engagement Pro",
      description: "Maintain 90% response rate for 30 days",
      type: "engagement",
      points: 200,
      icon: "💬",
      difficulty: "medium",
      unlockedBy: 67,
      totalUsers: 150,
      status: "active",
    },
  ];

  const rewards: Reward[] = [
    {
      id: 1,
      name: "10% Discount Coupon",
      description: "Get 10% off on your next purchase",
      type: "discount",
      value: 10,
      pointsRequired: 500,
      maxUses: 1000,
      usedCount: 234,
      validUntil: "2024-12-31",
      status: "active",
    },
    {
      id: 2,
      name: "Free Shipping Badge",
      description: "Unlock free shipping on all orders",
      type: "badge",
      value: 0,
      pointsRequired: 300,
      maxUses: 500,
      usedCount: 156,
      validUntil: "2024-06-30",
      status: "active",
    },
    {
      id: 3,
      name: "Cashback Reward",
      description: "Earn 5% cashback on your sales",
      type: "cashback",
      value: 5,
      pointsRequired: 1000,
      maxUses: 200,
      usedCount: 45,
      validUntil: "2024-08-15",
      status: "active",
    },
    {
      id: 4,
      name: "Premium Support",
      description: "Access to priority customer support",
      type: "badge",
      value: 0,
      pointsRequired: 750,
      maxUses: 100,
      usedCount: 23,
      validUntil: "2024-12-31",
      status: "inactive",
    },
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      id: 1,
      rank: 1,
      name: "TechStore Pro",
      avatar:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop",
      points: 15420,
      level: 15,
      achievements: 12,
      category: "vendors",
      change: "same",
    },
    {
      id: 2,
      rank: 2,
      name: "FashionHub",
      avatar:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=50&h=50&fit=crop",
      points: 12850,
      level: 12,
      achievements: 10,
      category: "vendors",
      change: "up",
    },
    {
      id: 3,
      rank: 3,
      name: "Alice Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop",
      points: 11230,
      level: 10,
      achievements: 8,
      category: "customers",
      change: "down",
    },
    {
      id: 4,
      rank: 4,
      name: "HomeDecor Plus",
      avatar:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=50&h=50&fit=crop",
      points: 9870,
      level: 9,
      achievements: 7,
      category: "vendors",
      change: "up",
    },
    {
      id: 5,
      rank: 5,
      name: "Bob Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
      points: 8650,
      level: 8,
      achievements: 6,
      category: "customers",
      change: "same",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "rewards", label: "Rewards", icon: Gift },
    { id: "leaderboard", label: "Leaderboard", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sales":
        return <Target className="h-5 w-5 text-blue-500" />;
      case "orders":
        return <Package className="h-5 w-5 text-green-500" />;
      case "reviews":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "referrals":
        return <Users className="h-5 w-5 text-purple-500" />;
      case "engagement":
        return <TrendingUp className="h-5 w-5 text-orange-500" />;
      default:
        return <Trophy className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Gift className="h-5 w-5 text-green-500" />;
      case "free_shipping":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "cashback":
        return <TrendingUp className="h-5 w-5 text-purple-500" />;
      case "points":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "badge":
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return <Gift className="h-5 w-5 text-gray-500" />;
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return (
          <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
        );
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">2,847</div>
            <div className="text-sm text-gray-500">Active Users</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-500">Achievements Unlocked</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">89</div>
            <div className="text-sm text-gray-500">Rewards Claimed</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">1,234</div>
            <div className="text-sm text-gray-500">Total Points Awarded</div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Achievements
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {achievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {achievement.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
                <Badge variant="success" size="sm">
                  +{achievement.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Performers
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {leaderboard.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  {entry.rank === 1 && (
                    <Crown className="h-5 w-5 text-yellow-500" />
                  )}
                  {entry.rank === 2 && (
                    <Medal className="h-5 w-5 text-gray-400" />
                  )}
                  {entry.rank === 3 && (
                    <Award className="h-5 w-5 text-orange-500" />
                  )}
                  <span className="font-bold text-gray-900">#{entry.rank}</span>
                </div>
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{entry.name}</h4>
                  <p className="text-sm text-gray-600">Level {entry.level}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {entry.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">pts</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Achievement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className="hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      achievement.status === "active" ? "success" : "error"
                    }
                    size="sm"
                  >
                    {achievement.status}
                  </Badge>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      achievement.difficulty
                    )}`}
                  >
                    {achievement.difficulty}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {achievement.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {achievement.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(achievement.type)}
                  <span className="text-sm text-gray-600 capitalize">
                    {achievement.type}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">
                    +{achievement.points}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>
                    {achievement.unlockedBy}/{achievement.totalUsers}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        (achievement.unlockedBy / achievement.totalUsers) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedAchievement(achievement);
                    setShowAchievementModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Details
                </button>
                <div className="flex items-center space-x-2">
                  <button className="text-green-600 hover:text-green-700">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Rewards</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Reward
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                {getRewardIcon(reward.type)}
                <Badge
                  variant={reward.status === "active" ? "success" : "error"}
                  size="sm"
                >
                  {reward.status}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {reward.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{reward.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Points Required:</span>
                  <span className="font-medium">{reward.pointsRequired}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Value:</span>
                  <span className="font-medium">
                    {reward.type === "discount" || reward.type === "cashback"
                      ? `${reward.value}%`
                      : reward.value}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usage:</span>
                  <span className="font-medium">
                    {reward.usedCount}/{reward.maxUses}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="font-medium">
                    {new Date(reward.validUntil).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedReward(reward);
                    setShowRewardModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Details
                </button>
                <div className="flex items-center space-x-2">
                  <button className="text-green-600 hover:text-green-700">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Leaderboard</h2>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Achievements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {entry.rank === 1 && (
                        <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                      )}
                      {entry.rank === 2 && (
                        <Medal className="h-5 w-5 text-gray-400 mr-2" />
                      )}
                      {entry.rank === 3 && (
                        <Award className="h-5 w-5 text-orange-500 mr-2" />
                      )}
                      <span className="font-bold text-gray-900">
                        #{entry.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="font-medium text-gray-900">
                        {entry.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.points.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.achievements}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info" size="sm">
                      {entry.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getChangeIcon(entry.change)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Gamification Settings
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Points System
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points per Sale
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={10}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points per Review
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points per Referral
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={25}
              />
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Level System
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points per Level
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={1000}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Level
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={50}
              />
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-3 text-sm text-gray-700">
                Achievement unlocked notifications
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-3 text-sm text-gray-700">
                Level up notifications
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-3 text-sm text-gray-700">
                Reward available notifications
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                Leaderboard position changes
              </span>
            </label>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Display Settings
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-3 text-sm text-gray-700">
                Show points on profile
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-3 text-sm text-gray-700">
                Show achievements on profile
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-3 text-sm text-gray-700">
                Show leaderboard publicly
              </span>
            </label>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Save Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gamification</h1>
        <p className="mt-2 text-gray-600">
          Manage rewards, achievements, and engagement features to boost user
          activity.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "overview"
                      | "achievements"
                      | "rewards"
                      | "leaderboard"
                      | "settings"
                  )
                }
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && renderOverview()}
      {activeTab === "achievements" && renderAchievements()}
      {activeTab === "rewards" && renderRewards()}
      {activeTab === "leaderboard" && renderLeaderboard()}
      {activeTab === "settings" && renderSettings()}

      {/* Achievement Details Modal */}
      <Modal
        isOpen={showAchievementModal}
        onClose={() => setShowAchievementModal(false)}
        title="Achievement Details"
        size="lg"
      >
        {selectedAchievement && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{selectedAchievement.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedAchievement.name}
                </h3>
                <p className="text-gray-600">
                  {selectedAchievement.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Type:</span>
                <div className="flex items-center space-x-2 mt-1">
                  {getTypeIcon(selectedAchievement.type)}
                  <span className="text-sm text-gray-900 capitalize">
                    {selectedAchievement.type}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Difficulty:</span>
                <div className="mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      selectedAchievement.difficulty
                    )}`}
                  >
                    {selectedAchievement.difficulty}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Points:</span>
                <div className="text-lg font-bold text-blue-600 mt-1">
                  +{selectedAchievement.points}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <div className="mt-1">
                  <Badge
                    variant={
                      selectedAchievement.status === "active"
                        ? "success"
                        : "error"
                    }
                  >
                    {selectedAchievement.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Progress:</span>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{selectedAchievement.unlockedBy} users unlocked</span>
                  <span>{selectedAchievement.totalUsers} total users</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${
                        (selectedAchievement.unlockedBy /
                          selectedAchievement.totalUsers) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAchievementModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Edit Achievement
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reward Details Modal */}
      <Modal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        title="Reward Details"
        size="lg"
      >
        {selectedReward && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {getRewardIcon(selectedReward.type)}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedReward.name}
                </h3>
                <p className="text-gray-600">{selectedReward.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Type:</span>
                <div className="text-sm text-gray-900 capitalize mt-1">
                  {selectedReward.type.replace("_", " ")}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Value:</span>
                <div className="text-sm text-gray-900 mt-1">
                  {selectedReward.type === "discount" ||
                  selectedReward.type === "cashback"
                    ? `${selectedReward.value}%`
                    : selectedReward.value}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Points Required:</span>
                <div className="text-sm text-gray-900 mt-1">
                  {selectedReward.pointsRequired}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <div className="mt-1">
                  <Badge
                    variant={
                      selectedReward.status === "active" ? "success" : "error"
                    }
                  >
                    {selectedReward.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Usage Statistics:</span>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{selectedReward.usedCount} claimed</span>
                  <span>{selectedReward.maxUses} maximum</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{
                      width: `${
                        (selectedReward.usedCount / selectedReward.maxUses) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Valid Until:</span>
              <div className="text-sm text-gray-900 mt-1">
                {new Date(selectedReward.validUntil).toLocaleDateString()}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRewardModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Edit Reward
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Gamification;
