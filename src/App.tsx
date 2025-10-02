import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import LiveStream from "./pages/LiveStream";
import Category from "./pages/Category";
import Notifications from "./pages/Notifications";
import Gamification from "./pages/Gamification";
import Coupons from "./pages/Coupons";
import ChatOnOrder from "./pages/ChatOnOrder";
import Staff from "./pages/Staff";
import Followers from "./pages/Followers";
import Tax from "./pages/Tax";
import Verification from "./pages/Verification";
import VendorPayment from "./pages/VendorPayment";
import Reels from "./pages/Reels";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VendorManagement from "./pages/VendorManagement";
import CustomerManagement from "./pages/CustomerManagement";
import ProductManagement from "./pages/ProductManagement";
import OrderManagement from "./pages/OrderManagement";
import PayoutsFinancials from "./pages/PayoutsFinancials";
import PlatformSettings from "./pages/PlatformSettings";
import UserManagement from "./pages/UserManagement";
import Banner from "./pages/Banner";
import LanguagePreferences from "./pages/LanguagePreferences";
import Shipping from "./pages/Shipping";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PublicOnlyRoute from "./components/Auth/PublicOnlyRoute";
import AppProviders from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/live-stream" element={<LiveStream />} />
              <Route path="/category" element={<Category />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/gamification" element={<Gamification />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/chat-order" element={<ChatOnOrder />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/followers" element={<Followers />} />
              <Route path="/tax" element={<Tax />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/vendor-payment" element={<VendorPayment />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/vendors" element={<VendorManagement />} />
              <Route path="/customers" element={<CustomerManagement />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/payouts" element={<PayoutsFinancials />} />
              <Route path="/settings" element={<PlatformSettings />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/banner" element={<Banner />} />
              <Route
                path="/language-preferences"
                element={<LanguagePreferences />}
              />
              <Route path="/shipping" element={<Shipping />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}

export default App;
