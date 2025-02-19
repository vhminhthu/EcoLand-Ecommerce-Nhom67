import CustomerLayout from '../../layouts/customer/CustomerLayout'
import MainLayout from '../../layouts/customer/MainLayout'

function PaymentPage() {
    return (
        <MainLayout>
            <CustomerLayout>
                <h1>PaymentPage</h1>
            </CustomerLayout>
        </MainLayout>
    )
}

export default PaymentPage