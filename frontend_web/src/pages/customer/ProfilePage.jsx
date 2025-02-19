import CustomerLayout from '../../layouts/customer/CustomerLayout'
import MainLayout from '../../layouts/customer/MainLayout'

function ProfilePage() {
    return (
        <MainLayout>
            <CustomerLayout>
                <div>ProfilePage</div>
            </CustomerLayout>
        </MainLayout>
    )
}

export default ProfilePage