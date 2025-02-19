import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/customer/HomePage';
import CartPage from '../pages/customer/CartPage';
import PurchasePage from '../pages/customer/PurchasePage';
import ProfilePage from '../pages/customer/ProfilePage';
import WishlistPage from '../pages/customer/WishlistPage';
import NotificationPage from '../pages/customer/NotificationPage';
import CategoryPage from '../pages/customer/CategoryPage';
import ProductPage from '../pages/customer/ProductPage';
import ShopPage from '../pages/customer/ShopPage';
import PaymentPage from '../pages/customer/PaymentPage';
import AddressPage from '../pages/customer/AddressPage';
import PasswordPage from '../pages/customer/PasswordPage';
import SupportPage from '../pages/customer/SupportPage';

function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customer/notification" element={<NotificationPage />} />
            <Route path="/customer/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/customer/account/profile" element={<ProfilePage />} />
            <Route path="/customer/purchase" element={<PurchasePage />} />

            <Route path="/customer/account/payment" element={<PaymentPage/>} />
            <Route path="/customer/account/address" element={<AddressPage/>} />
            <Route path="/customer/account/password" element={<PasswordPage/>} />

            <Route path="/category/:nameCategory" element={<CategoryPage/>} />
            <Route path="/:nameProduct" element={<ProductPage/>} />
            <Route path="/shop/:nameShop" element={<ShopPage/>} />

            <Route path="/customer/support" element={<SupportPage/>} />
            
        </Routes>
    )
}

export default CustomerRoutes