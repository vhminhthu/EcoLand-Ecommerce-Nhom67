import PropTypes from 'prop-types';
import AccountSidebar from '../../components/customer/layout/AccountSidebar';

const CustomerLayout = ({ children }) => {
    return (
        <div className="customer-layout flex max-w-7xl min-w-7xl">
            <AccountSidebar />
            <div className="customer-content !ml-5 w-full">
                {children}
            </div>
        </div>
    );
};

CustomerLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomerLayout;