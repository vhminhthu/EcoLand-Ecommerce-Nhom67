import PropTypes from 'prop-types';
import Header from '../../components/customer/layout/Header';
import Footer from '../../components/customer/layout/footer';

const MainLayout = ({ children }) => {
    const thongBaoList = [
        { id: 1, message: 'Bạn có đơn hàng mới!' },
        { id: 2, message: 'Cập nhật dịch vụ thành công.' },
    ]; 
    return (
        <div className='main-layout'>
            <Header thongBaoList={thongBaoList}/>
            <div className="content !mx-16 !my-8 ">{children}</div>
            <Footer />
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;