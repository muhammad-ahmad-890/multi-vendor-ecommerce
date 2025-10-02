import React from "react";

interface CatalogueSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CatalogueSidebar: React.FC<CatalogueSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const sampleProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "₹1,199.99",
      image:
        "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "₹299.99",
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 3,
      name: "Summer Dress",
      price: "₹89.99",
      image:
        "https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 4,
      name: "Garden Tool Set",
      price: "₹156.50",
      image:
        "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
  ];

  return (
    <div className="absolute right-0 top-20 w-80 bg-white border-l border-gray-200 h-full z-20">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Product Catalogue
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-blue-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-20 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-medium text-gray-900">
                {product.name}
              </h4>
              <p className="text-sm text-gray-500">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogueSidebar;
