import React, { useState } from "react";
import {
  ProductHeader,
  ProductStats,
  BulkActions,
  ProductFilters,
  ProductsTable,
  ProductDetailsModal,
  BulkActionModal,
  type Product,
} from "../components/ProductManagement";

const ProductManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [bulkAction, setBulkAction] = useState("");

  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      vendor: "Tech Solutions Inc",
      category: "Electronics",
      price: "$1,199.99",
      discountPrice: "$1,099.99",
      stock: 45,
      status: "approved",
      createdDate: "2024-01-10",
      image:
        "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Latest iPhone with advanced features and high-quality camera system.",
      store: "Tech Solutions Inc",
      publisher: "John Smith",
      variations: "128GB, 256GB, 512GB",
      salePrice: "$1,099.99",
    },
    {
      id: 2,
      name: "Summer Dress Collection",
      vendor: "Fashion Hub",
      category: "Fashion",
      price: "$89.99",
      discountPrice: "$69.99",
      stock: 0,
      status: "pending",
      createdDate: "2024-01-12",
      image:
        "https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Beautiful summer dress collection for women with various colors and sizes.",
      store: "Fashion Hub",
      publisher: "Sarah Johnson",
      variations: "S, M, L, XL",
      salePrice: "$69.99",
    },
    {
      id: 3,
      name: "Garden Tool Set",
      vendor: "Home & Garden Store",
      category: "Home & Garden",
      price: "$156.50",
      discountPrice: "$129.99",
      stock: 23,
      status: "rejected",
      createdDate: "2024-01-08",
      image:
        "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Complete garden tool set with high-quality materials for professional gardening.",
      store: "Home & Garden Store",
      publisher: "Mike Wilson",
      variations: "Basic, Premium, Professional",
      salePrice: "$129.99",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      vendor: "Tech Solutions Inc",
      category: "Electronics",
      price: "$299.99",
      discountPrice: "$249.99",
      stock: 67,
      status: "approved",
      createdDate: "2024-01-05",
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Premium wireless headphones with noise cancellation and superior sound quality.",
      store: "Tech Solutions Inc",
      publisher: "John Smith",
      variations: "Black, White, Blue",
      salePrice: "$249.99",
    },
    {
      id: 5,
      name: "Nike Air Max",
      vendor: "Sports Store",
      category: "Sports",
      price: "$129.99",
      discountPrice: "$99.99",
      stock: 12,
      status: "approved",
      createdDate: "2024-01-15",
      image:
        "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Comfortable running shoes with excellent cushioning and support.",
      store: "Sports Store",
      publisher: "David Lee",
      variations: "US 7-12",
      salePrice: "$99.99",
    },
  ];

  const columns = [
    { key: "name", label: "Product Name", sortable: true },
    { key: "store", label: "Store", sortable: true },
    { key: "publisher", label: "Publisher", sortable: true },
    { key: "salePrice", label: "Sale Price", sortable: true },
    { key: "discountPrice", label: "Discount Price", sortable: true },
    { key: "variations", label: "Variations", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "createdDate", label: "Date & Time", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    // Stock filter
    let matchesStock = true;
    if (stockFilter === "inStock") matchesStock = product.stock > 0;
    else if (stockFilter === "outOfStock") matchesStock = product.stock === 0;
    else if (stockFilter === "lowStock")
      matchesStock = product.stock > 0 && product.stock <= 10;

    // Date filter
    let matchesDate = true;
    const productDate = new Date(product.createdDate);
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (dateFilter === "today")
      matchesDate = productDate.toDateString() === today.toDateString();
    else if (dateFilter === "lastWeek") matchesDate = productDate >= lastWeek;
    else if (dateFilter === "lastMonth") matchesDate = productDate >= lastMonth;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesStock &&
      matchesDate
    );
  });

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on products:`, selectedProducts);
    setShowBulkActionModal(false);
    setSelectedProducts([]);
    // In a real app, this would make an API call
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleProductSelect = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const handleBulkEdit = () => {
    setBulkAction("edit");
    setShowBulkActionModal(true);
  };

  const handleBulkTrash = () => {
    setBulkAction("trash");
    setShowBulkActionModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProductHeader />

      {/* Stats Cards */}
      <ProductStats />

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedProducts.length}
        onClearSelection={() => setSelectedProducts([])}
        onBulkEdit={handleBulkEdit}
        onBulkTrash={handleBulkTrash}
      />

      {/* Filters and Search */}
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />

      {/* Products Table */}
      <ProductsTable
        products={filteredProducts}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
        onSelectAll={handleSelectAll}
        onProductClick={handleProductClick}
        columns={columns}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={selectedProduct}
      />

      {/* Bulk Action Modal */}
      <BulkActionModal
        isOpen={showBulkActionModal}
        onClose={() => setShowBulkActionModal(false)}
        action={bulkAction}
        selectedCount={selectedProducts.length}
        onConfirm={() => handleBulkAction(bulkAction)}
      />
    </div>
  );
};

export default ProductManagement;
