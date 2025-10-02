import React from "react";
import { Download } from "lucide-react";
import Card from "../UI/Card";

const PaymentReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Payment Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Monthly Reports</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        March 2024 Payment Report
                      </p>
                      <p className="text-xs text-gray-500">
                        Generated on March 31, 2024
                      </p>
                    </div>
                    <Download className="h-4 w-4 text-gray-400" />
                  </div>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        February 2024 Payment Report
                      </p>
                      <p className="text-xs text-gray-500">
                        Generated on February 29, 2024
                      </p>
                    </div>
                    <Download className="h-4 w-4 text-gray-400" />
                  </div>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Custom Reports</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Q1 2024 Payment Summary
                      </p>
                      <p className="text-xs text-gray-500">
                        Generated on April 1, 2024
                      </p>
                    </div>
                    <Download className="h-4 w-4 text-gray-400" />
                  </div>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Failed Payments Report
                      </p>
                      <p className="text-xs text-gray-500">
                        Generated on March 20, 2024
                      </p>
                    </div>
                    <Download className="h-4 w-4 text-gray-400" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentReports;
