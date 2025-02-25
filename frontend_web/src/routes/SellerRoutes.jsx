import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/seller/HomePage";
import OrdersPage from "../pages/seller/OrdersPage";
import ReviewsPage from "../pages/seller/ReviewsPage";
import FinancePage from "../pages/seller/FinancePage";
import ProductsPage from "../pages/seller/ProductsPage";
import StorePage from "../pages/seller/StorePage";
import PromotionsPage from "../pages/seller/PromotionsPage";
import ShippingPage from "../pages/seller/ShippingPage";
import SupportPage from "../pages/seller/SupportPage";
import SettingsPage from "../pages/seller/SettingsPage";
import NotificationPage from "../pages/seller/NotificationPage";
import ChatPage from "../pages/seller/ChatPage";
import ProductsPageAdd from "../pages/seller/ProductsPageAdd";

function SellerRoutes() {
    return (
    <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/add" element={<ProductsPageAdd />} />
        <Route path="store" element={<StorePage />} />
        <Route path="promotions" element={<PromotionsPage />} />
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="chat" element={<ChatPage />} />
    </Routes>
    );
}

export default SellerRoutes;
