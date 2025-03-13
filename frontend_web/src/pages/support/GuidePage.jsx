import MainLayout from "../../layouts/customer/MainLayout";
import { FaUser, FaShoppingCart, FaBoxOpen, FaHeadset } from "react-icons/fa";

const GuidePage = () => {
   

    return (
        <MainLayout>
              <div className="bg-gray-100 min-h-screen flex flex-col items-center">
                <div className="relative w-full h-64 bg-cover bg-center flex items-center justify-center" 
                    style={{ backgroundImage: "url('https://i.pinimg.com/736x/1a/6d/3e/1a6d3eee2b2355d49290721d2dc21caf.jpg')" }}>
                    <div className="absolute inset-0 bg-black/5"></div>
                    <h1 className="relative text-white text-3xl font-bold">
                        Hướng dẫn sơ bộ về việc sử dụng Web
                    </h1>
                </div>

           
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl text-gray-700 mt-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cách sử dụng hệ thống</h2>
                    <div className="space-y-6">
                     
                        <div className="flex items-start space-x-4">
                            <FaUser className="text-blue-500 text-3xl mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">1. Đăng ký & Đăng nhập</h3>
                                <p>Truy cập trang web và tạo tài khoản nếu bạn chưa có. Nếu đã có tài khoản, hãy đăng nhập để sử dụng các chức năng của hệ thống.</p>
                            </div>
                        </div>

                   
                        <div className="flex items-start space-x-4">
                            <FaShoppingCart className="text-green-500 text-3xl mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">2. Tìm kiếm & Đặt hàng</h3>
                                <p>Chọn danh mục sản phẩm hoặc sử dụng thanh tìm kiếm để tìm sản phẩm bạn cần. Thêm sản phẩm vào giỏ hàng và tiến hành đặt hàng.</p>
                            </div>
                        </div>

                 
                        <div className="flex items-start space-x-4">
                            <FaBoxOpen className="text-yellow-500 text-3xl mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">3. Theo dõi đơn hàng</h3>
                                <p>Truy cập mục Đơn hàng của tôi để theo dõi trạng thái đơn hàng, từ lúc xác nhận đến khi giao hàng thành công.</p>
                            </div>
                        </div>

                     
                        <div className="flex items-start space-x-4">
                            <FaHeadset className="text-red-500 text-3xl mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">4. Hỗ trợ khách hàng</h3>
                                <p>Nếu có bất kỳ vấn đề nào, bạn có thể liên hệ bộ phận hỗ trợ qua mục Trợ giúp hoặc gửi yêu cầu hỗ trợ trực tiếp.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default GuidePage;
