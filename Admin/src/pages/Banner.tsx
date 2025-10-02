import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  BannerStats,
  BannerFilters,
  BannerList,
  BannerDetailsModal,
  CreateBannerModal,
  EditBannerModal,
  type Banner,
} from "../components/Banner";

const Banner: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const banners: Banner[] = [
    {
      id: 1,
      title: "Summer Sale Banner",
      description: "Get up to 50% off on summer collection",
      imageUrl:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
      status: "active",
      position: "top",
      device: "all",
      clickUrl: "/sale/summer",
      priority: 1,
      createdAt: "2024-01-15 10:00:00",
      updatedAt: "2024-01-15 10:00:00",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest arrivals",
      imageUrl:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop",
      status: "active",
      position: "middle",
      device: "desktop",
      clickUrl: "/new-arrivals",
      priority: 2,
      createdAt: "2024-01-14 15:30:00",
      updatedAt: "2024-01-14 15:30:00",
    },
    {
      id: 3,
      title: "Mobile App Promotion",
      description: "Download our mobile app for better experience",
      imageUrl:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
      status: "scheduled",
      position: "bottom",
      device: "mobile",
      startDate: "2024-01-20 09:00:00",
      endDate: "2024-02-20 23:59:59",
      clickUrl: "/mobile-app",
      priority: 3,
      createdAt: "2024-01-13 12:00:00",
      updatedAt: "2024-01-13 12:00:00",
    },
    {
      id: 4,
      title: "Sidebar Promotion",
      description: "Special offers in sidebar",
      imageUrl:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
      status: "inactive",
      position: "sidebar",
      device: "all",
      clickUrl: "/sidebar-offers",
      priority: 4,
      createdAt: "2024-01-12 08:00:00",
      updatedAt: "2024-01-12 08:00:00",
    },
    {
      id: 5,
      title: "Festival Special",
      description: "Celebrate festivals with amazing deals",
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
      status: "active",
      position: "top",
      device: "all",
      clickUrl: "/festival-deals",
      priority: 1,
      createdAt: "2024-01-11 14:20:00",
      updatedAt: "2024-01-11 14:20:00",
    },
  ];

  const filteredBanners = banners.filter((banner) => {
    const matchesSearch =
      banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || banner.status === statusFilter;
    const matchesPosition =
      positionFilter === "all" || banner.position === positionFilter;
    const matchesDevice =
      deviceFilter === "all" || banner.device === deviceFilter;
    return matchesSearch && matchesStatus && matchesPosition && matchesDevice;
  });

  const activeCount = banners.filter((b) => b.status === "active").length;
  const inactiveCount = banners.filter((b) => b.status === "inactive").length;
  const scheduledCount = banners.filter((b) => b.status === "scheduled").length;
  const totalBanners = banners.length;

  const handleCreateBanner = () => {
    setShowCreateModal(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setShowEditModal(true);
  };

  const handleDeleteBanner = (bannerId: number) => {
    console.log(`Deleting banner ${bannerId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Banner Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage promotional banners and advertisements.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCreateBanner}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Banner
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <BannerStats
        totalBanners={totalBanners}
        activeCount={activeCount}
        scheduledCount={scheduledCount}
        inactiveCount={inactiveCount}
      />

      {/* Filters and Search */}
      <BannerFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        positionFilter={positionFilter}
        setPositionFilter={setPositionFilter}
        deviceFilter={deviceFilter}
        setDeviceFilter={setDeviceFilter}
      />

      {/* Banners List */}
      <BannerList
        banners={filteredBanners}
        onViewBanner={(banner) => {
          setSelectedBanner(banner);
          setShowBannerModal(true);
        }}
        onEditBanner={handleEditBanner}
        onDeleteBanner={handleDeleteBanner}
      />

      {/* Banner Details Modal */}
      <BannerDetailsModal
        isOpen={showBannerModal}
        onClose={() => setShowBannerModal(false)}
        banner={selectedBanner}
        onEditBanner={handleEditBanner}
      />

      {/* Create Banner Modal */}
      <CreateBannerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Edit Banner Modal */}
      <EditBannerModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        banner={editingBanner}
      />
    </div>
  );
};

export default Banner;
