import React from "react";
import { Trash2 } from "lucide-react";
import Card from "../UI/Card";

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkAction: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onClearSelection,
  onBulkAction,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {selectedCount} order(s) selected
          </span>
          <button
            onClick={onClearSelection}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear Selection
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onBulkAction}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Move to Trash</span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default BulkActions;
