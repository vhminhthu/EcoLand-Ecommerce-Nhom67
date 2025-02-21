import PropTypes from 'prop-types';
import Header from '../../components/seller/layout/Header';
import SellerSidebar from '../../components/seller/layout/SellerSidebar';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const location = useLocation();

    const pageTitles = {
        '/seller/home': 'Trang chủ',
        '/seller/orders': 'Đơn hàng',
        '/seller/reviews': 'Đánh giá',
        '/seller/finance': 'Tài chính',
        '/seller/products': 'Sản phẩm',
        '/seller/store': 'Cửa hàng',
        '/seller/promotions': 'Khuyến mãi',
        '/seller/shipping': 'Vận chuyển',
        '/seller/support': 'Hỗ trợ',
        '/seller/settings': 'Cài đặt',
    };

    const title = pageTitles[location.pathname] || 'Trang chủ';

    return (
        <div className='main-seller-layout flex bg-slate-50 overflow-x-auto'>
            <SellerSidebar/>
            <div className='seller-content flex flex-col gap-6 !ml-0 !m-6 flex-1'>
                <Header title={title} />
                {children}
            </div>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;