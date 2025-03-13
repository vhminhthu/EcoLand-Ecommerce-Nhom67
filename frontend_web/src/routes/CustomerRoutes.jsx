
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
import Signup from '../pages/auth/Signup/Signup';


import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import { Routes ,Route} from "react-router-dom";
import CategoryPageSearch from '../pages/customer/CategoryPageSearch';
import CheckoutPage from '../pages/customer/CheckoutPage';
import PaymentResult from '../pages/customer/PaymentResult';
import GuidePage from '../pages/support/GuidePage';
import AboutPage from '../pages/support/AboutPage';
import FAQPage from '../pages/support/FAQPage';

function CustomerRoutes() {

    
    const { data: authUser, isLoading } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
          try {
            const response = await axios.get('/api/auth/getme');
            localStorage.setItem("chat-user", JSON.stringify(response.data));
            if (response.data.error) {
              throw new Error(response.data.error);
            }
            return response.data;
          } catch (error) {
            if (error.response && error.response.status === 401) {
              return null;
            }
            throw error;
          }
        },
        retry: false,
      });
    
      if (isLoading) {
        return <div>Loading...</div>;
      }

    return (
        <Routes>
            <Route path="/" element={!authUser ? <Signup /> :<HomePage/> } />
            <Route path="/customer/notification" element={<NotificationPage />} />
            <Route path="/customer/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/customer/account/profile" element={<ProfilePage />} />
            <Route path="/customer/purchase" element={<PurchasePage />} />

            <Route path="/customer/account/payment" element={<PaymentPage/>} />
            <Route path="/customer/account/address" element={<AddressPage/>} />
            <Route path="/customer/account/password" element={<PasswordPage/>} />

            <Route path="/category/:nameCategory" element={<CategoryPage/>} />
            <Route path="/search/sp" element={<CategoryPageSearch/>} />
            <Route path="/:nameProduct" element={<ProductPage/>} />
            <Route path="/shop/:nameShop" element={<ShopPage/>} />

            <Route path="/customer/support" element={<SupportPage/>} /> 
            <Route path="/customer/support/guide" element={<GuidePage />} />
            <Route path="/customer/support/about" element={<AboutPage />} />
            <Route path="/customer/support/faq" element={<FAQPage />} />
            <Route path="/payment-result" element={<PaymentResult />} />
        </Routes>
    )
}

export default CustomerRoutes