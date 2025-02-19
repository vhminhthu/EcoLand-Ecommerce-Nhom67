import PropTypes from 'prop-types';
import AccountSidebar from '../../components/customer/layout/AccountSidebar';

const CustomerLayout = ({ children }) => {
    return (
        <div className="customer-layout flex">
            <AccountSidebar />
            <div className="customer-content !ml-5 w-6/7">
                {children}
            </div>
        </div>
    );
};

CustomerLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomerLayout;