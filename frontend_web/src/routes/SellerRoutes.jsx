import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/seller/HomePage";
import OrdersPage from "../pages/seller/OrdersPage";
import FinancePage from "../pages/seller/FinancePage";
import ProductsPage from "../pages/seller/ProductsPage";
import StorePage from "../pages/seller/StorePage";
import ChatPage from "../pages/seller/ChatPage";
import ProductsPageAdd from "../pages/seller/ProductsPageAdd";
import BecomeSeller from "../pages/seller/BecomeSeller";
import { useAuth } from "../context/AuthContext";

function SellerRoutes() {
    const { user, loading } = useAuth();

    if (loading) return <p>Đang tải thông tin...</p>;

    return (
    <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/add" element={<ProductsPageAdd />} />
        <Route path="store" element={<StorePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="become-a-seller" element={user?.vaiTro == 'seller' ? <HomePage /> :<BecomeSeller/>} />
    </Routes>
    );
}

export default SellerRoutes;
