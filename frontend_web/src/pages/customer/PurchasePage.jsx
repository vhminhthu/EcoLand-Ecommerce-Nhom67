import CustomerLayout from '../../layouts/customer/CustomerLayout'
import MainLayout from '../../layouts/customer/MainLayout'

function PurchasePage() {
    return (
        <MainLayout>
            <CustomerLayout>
                <div>PurchasePage</div>
            </CustomerLayout>
        </MainLayout>
    )
}

export default PurchasePage