import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/seller/HomePage';
import OrdersPage from '../pages/seller/OrdersPage';
import ReviewsPage from '../pages/seller/ReviewsPage';
import FinancePage from '../pages/seller/FinancePage';
import ProductsPage from '../pages/seller/ProductsPage';
import StorePage from '../pages/seller/StorePage';
import PromotionsPage from '../pages/seller/PromotionsPage';
import ShippingPage from '../pages/seller/ShippingPage';
import SupportPage from '../pages/seller/SupportPage';
import SettingsPage from '../pages/seller/SettingsPage';
import NotificationPage from '../pages/seller/NotificationPage';
import ChatPage from '../pages/seller/ChatPage';

function SellerRoutes() {
    return (
        <Routes>
            <Route path="/seller/home" element={<HomePage />} />
            <Route path="/seller/orders" element={<OrdersPage />} />
            <Route path="/seller/reviews" element={<ReviewsPage/>} />
            <Route path="/seller/finance" element={<FinancePage/>} />
            <Route path="/seller/products" element={<ProductsPage/>} />

            <Route path="/seller/store" element={<StorePage/>} />
            <Route path="/seller/promotions" element={<PromotionsPage/>} />
            <Route path="/seller/shipping" element={<ShippingPage/>} />

            <Route path="/seller/support" element={<SupportPage/>} />
            <Route path="/seller/settings" element={<SettingsPage/>} />

            <Route path="/seller/notification" element={<NotificationPage/>} />
            <Route path="/seller/chat" element={<ChatPage/>} />
        </Routes>
    )
}

export default SellerRoutes