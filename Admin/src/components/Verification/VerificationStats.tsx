import React from "react";
import { Clock, UserCheck, Check, X } from "lucide-react";
import Card from "../UI/Card";
import { UnverifiedVendor } from "./types";

interface VerificationStatsProps {
  verificationRequests: UnverifiedVendor[];
}

const VerificationStats: React.FC<VerificationStatsProps> = ({
  verificationRequests,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Form Pending</p>
            <p className="text-2xl font-bold text-gray-900">
              {
                verificationRequests.filter(
                  (r) => r.vendor.status === "PENDING"
                ).length
              }
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <UserCheck className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Form Approved</p>
            <p className="text-2xl font-bold text-gray-900">
              {
                verificationRequests.filter(
                  (r) => r.vendor.status === "FORM_APPROVED"
                ).length
              }
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-gray-900">
              {
                verificationRequests.filter(
                  (r) => r.vendor.status === "APPROVED" && r.store.isVerified
                ).length
              }
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <X className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-gray-900">
              {
                verificationRequests.filter(
                  (r) => r.vendor.status === "REJECTED"
                ).length
              }
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VerificationStats;
