import React, { useState } from "react";
import {
  LiveStreamHeader,
  LiveStreamTabs,
  LiveStreamTable,
  ReelsTable,
  TaggedProductsModal,
  type LiveStream,
  type Reel,
  type Product,
} from "../components/LiveStream";

const LiveStream: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "ongoing" | "upcoming" | "completed" | "reels"
  >("completed");
  const [productsModalOpen, setProductsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [modalTitle, setModalTitle] = useState("");

  // Sample data for completed streams
  const completedStreams: LiveStream[] = [
    {
      id: 1,
      broadcasterName: "Mayur Dev",
      startedOn: "Jul 24, 2025 03:29:10 PM",
      duration: "2 Minutes",
      completedOn: "Jul 24, 2025 03:30:10 PM",
      broadcasterType: "N/A",
      recording: false,
      restream: false,
      taggedProducts: 3,
    },
    {
      id: 2,
      broadcasterName: "Mayur Dev",
      startedOn: "Jul 24, 2025 12:03:26 PM",
      duration: "20 Minutes, 41 Seconds",
      completedOn: "Jul 24, 2025 12:13:47 PM",
      broadcasterType: "N/A",
      recording: false,
      restream: false,
      taggedProducts: 1,
    },
    {
      id: 3,
      broadcasterName: "Rahul",
      startedOn: "Jul 22, 2025 07:52:24 PM",
      duration: "1 Minutes, 47 Seconds",
      completedOn: "Jul 22, 2025 07:53:18 PM",
      broadcasterType: "N/A",
      recording: false,
      restream: false,
      taggedProducts: 2,
    },
    {
      id: 4,
      broadcasterName: "Mitesh",
      startedOn: "Jul 20, 2025 11:11:45 PM",
      duration: "4 Minutes, 34 Seconds",
      completedOn: "Jul 20, 2025 11:14:02 PM",
      broadcasterType: "N/A",
      recording: false,
      restream: false,
      taggedProducts: 6,
    },
    {
      id: 5,
      broadcasterName: "Sree Androiddeveloper",
      startedOn: "Jul 18, 2025 06:46:00 PM",
      duration: "6 Minutes, 26 Seconds",
      completedOn: "Jul 18, 2025 06:50:13 PM",
      broadcasterType: "N/A",
      recording: false,
      restream: false,
      taggedProducts: 4,
    },
  ];

  // Sample data for reels
  const reels: Reel[] = [
    {
      id: 1,
      publisherName: "Ahmed Khan",
      storeName: "Khan Electronics",
      postDate: "Jul 24, 2025 03:29:10 PM",
      taggedProducts: 5,
    },
    {
      id: 2,
      publisherName: "Fatima Ali",
      storeName: "Fashion Hub",
      postDate: "Jul 23, 2025 12:03:26 PM",
      taggedProducts: 3,
    },
    {
      id: 3,
      publisherName: "Usman Hassan",
      storeName: "Tech Mart",
      postDate: "Jul 22, 2025 07:52:24 PM",
      taggedProducts: 7,
    },
    {
      id: 4,
      publisherName: "Sara Ahmed",
      storeName: "Beauty Store",
      postDate: "Jul 21, 2025 11:11:45 PM",
      taggedProducts: 2,
    },
    {
      id: 5,
      publisherName: "Ali Raza",
      storeName: "Sports Shop",
      postDate: "Jul 20, 2025 06:46:00 PM",
      taggedProducts: 4,
    },
  ];

  // Sample products data
  const getProductsForItem = (itemId: number): Product[] => {
    // Simulate different products for different items
    const allProducts: Product[] = [
      {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999,
        category: "Electronics",
        image: "https://via.placeholder.com/60x60?text=iPhone",
        status: "Active",
      },
      {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 899,
        category: "Electronics",
        image: "https://via.placeholder.com/60x60?text=Galaxy",
        status: "Active",
      },
      {
        id: 3,
        name: "Nike Air Max",
        price: 129,
        category: "Sports",
        image: "https://via.placeholder.com/60x60?text=Nike",
        status: "Active",
      },
      {
        id: 4,
        name: "Adidas Ultraboost",
        price: 149,
        category: "Sports",
        image: "https://via.placeholder.com/60x60?text=Adidas",
        status: "Active",
      },
      {
        id: 5,
        name: "MacBook Pro M3",
        price: 1999,
        category: "Electronics",
        image: "https://via.placeholder.com/60x60?text=MacBook",
        status: "Active",
      },
      {
        id: 6,
        name: "Dell XPS 13",
        price: 1299,
        category: "Electronics",
        image: "https://via.placeholder.com/60x60?text=Dell",
        status: "Active",
      },
      {
        id: 7,
        name: "Beauty Cream",
        price: 29,
        category: "Beauty",
        image: "https://via.placeholder.com/60x60?text=Cream",
        status: "Active",
      },
    ];

    // Return different products based on item ID
    return allProducts.slice(0, itemId + 2);
  };

  const handleViewSales = (streamId: number) => {
    console.log("View sales for stream:", streamId);
    // Add your view sales logic here
  };

  const handleViewRecording = (streamId: number) => {
    console.log("View recording for stream:", streamId);
    // Add your view recording logic here
  };

  const handleViewReelSales = (reelId: number) => {
    console.log("View sales for reel:", reelId);
    // Add your view reel sales logic here
  };

  const handleViewReel = (reelId: number) => {
    console.log("View reel:", reelId);
    // Add your view reel logic here
  };

  const handleDeleteReel = (reelId: number) => {
    console.log("Delete reel:", reelId);
    // Add your delete reel logic here
  };

  const handleTaggedProductsClick = (
    itemId: number,
    _type: "stream" | "reel",
    itemName: string
  ) => {
    const products = getProductsForItem(itemId);
    setSelectedProducts(products);
    setModalTitle(`Tagged Products - ${itemName}`);
    setProductsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <LiveStreamHeader />

      {/* Tabs */}
      <LiveStreamTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      {activeTab === "reels" ? (
        <ReelsTable
          reels={reels}
          onViewSales={handleViewReelSales}
          onViewReel={handleViewReel}
          onDeleteReel={handleDeleteReel}
          onTaggedProductsClick={handleTaggedProductsClick}
        />
      ) : (
        <LiveStreamTable
          streams={completedStreams}
          onViewSales={handleViewSales}
          onViewRecording={handleViewRecording}
          onTaggedProductsClick={handleTaggedProductsClick}
        />
      )}

      {/* Products Modal */}
      <TaggedProductsModal
        isOpen={productsModalOpen}
        onClose={() => setProductsModalOpen(false)}
        title={modalTitle}
        products={selectedProducts}
      />
    </div>
  );
};

export default LiveStream;
