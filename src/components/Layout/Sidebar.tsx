import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  Video,
  Package,
  ShoppingCart,
  Grid3X3,
  Bell,
  Trophy,
  Tag,
  MessageCircle,
  Users,
  Heart,
  Receipt,
  Store,
  Shield,
  CreditCard,
  VideoIcon,
  BarChart3,
  Settings,
  LogOut,
  UserCheck,
  Image,
  Languages,
  Truck,
} from "lucide-react";
import Modal from "../UI/Modal";
import { logoutUser } from "../../services/authService";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "User Management", href: "/user-management", icon: UserCheck },
  { name: "Live Stream", href: "/live-stream", icon: Video },
  { name: "Products", href: "/products", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Category", href: "/category", icon: Grid3X3 },
  { name: "Banner", href: "/banner", icon: Image },
  {
    name: "Language Preferences",
    href: "/language-preferences",
    icon: Languages,
  },
  { name: "Shipping", href: "/shipping", icon: Truck },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Gamification", href: "/gamification", icon: Trophy },
  { name: "Coupons", href: "/coupons", icon: Tag },
  { name: "Chat on Order", href: "/chat-order", icon: MessageCircle },
  { name: "Staff", href: "/staff", icon: Users },
  { name: "Followers", href: "/followers", icon: Heart },
  { name: "Tax", href: "/tax", icon: Receipt },
  { name: "Vendors", href: "/vendors", icon: Store },
  { name: "Verification", href: "/verification", icon: Shield },
  { name: "Vendor Payment", href: "/vendor-payment", icon: CreditCard },
  { name: "Reels", href: "/reels", icon: VideoIcon },
  { name: "Reports", href: "/reports", icon: BarChart3 },

  { name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      setLogoutModalOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout fails, redirect to login
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Fixed header section */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Store className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                MarketPlace
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Scrollable navigation section */}
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-6 px-3">
            <ul className="space-y-3">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 whitespace-nowrap ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-6 w-6 ${
                          isActive
                            ? "text-blue-700"
                            : "text-gray-400 group-hover:text-gray-900"
                        }`}
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Fixed footer section */}
        <div className="flex-shrink-0 p-4">
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-base font-medium rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setLogoutModalOpen(true)}
            disabled={isLoggingOut}
          >
            <LogOut className="h-6 w-6" />
            {isLoggingOut ? "Logging Out..." : "Logout"}
          </button>
        </div>
      </div>

      {/* Logout Modal rendered outside sidebar for full screen overlay */}
      <Modal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Confirm Logout"
      >
        <div className="mb-4 text-gray-700">
          Are you sure you want to logout?
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => setLogoutModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging Out..." : "Logout"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
