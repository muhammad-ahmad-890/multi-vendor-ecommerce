import React from "react";
import { User, Phone, MapPin, Calendar, Coins, Building } from "lucide-react";
import Modal from "../UI/Modal";
import Badge from "../UI/Badge";
import { User as UserType } from "./types";

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: UserType | null;
  activeTab: string;
  renderUserType: (userType: string) => React.ReactNode;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({
  isOpen,
  onClose,
  selectedUser,
  activeTab,
  renderUserType,
}) => {
  if (!selectedUser) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">User Name</p>
              <p className="font-medium">{selectedUser.userName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">
                {activeTab === "customers"
                  ? "Customer Name"
                  : activeTab === "vendors"
                  ? "Vendor Name"
                  : "Name"}
              </p>
              <p className="font-medium">{selectedUser.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Contact Details</p>
              <p className="font-medium">{selectedUser.contactDetails}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{selectedUser.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div>
              <p className="text-sm text-gray-500">User Type</p>
              <div className="mt-1">
                {renderUserType(selectedUser.userType)}
              </div>
            </div>
          </div>
          {activeTab === "customers" && selectedUser.coins !== undefined && (
            <div className="flex items-center space-x-3">
              <Coins className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Coins</p>
                <p className="font-medium">{selectedUser.coins}</p>
              </div>
            </div>
          )}
          {(activeTab === "vendors" || activeTab === "vendorStaff") &&
            selectedUser.storeName && (
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Store Name</p>
                  <p className="font-medium">{selectedUser.storeName}</p>
                </div>
              </div>
            )}
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Registration Date</p>
              <p className="font-medium">{selectedUser.registrationDate}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserModal;
