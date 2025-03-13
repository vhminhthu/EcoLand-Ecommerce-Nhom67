import MainLayout from "../../layouts/customer/MainLayout";


const AboutPage = () => {
 

    return (
        <MainLayout>
               <div className="bg-gray-100 min-h-screen flex flex-col items-center">
                <div className="relative w-full h-64 bg-cover bg-center flex items-center justify-center" 
                    style={{ backgroundImage: "url('https://i.pinimg.com/736x/1a/6d/3e/1a6d3eee2b2355d49290721d2dc21caf.jpg')" }}>
                    <div className="absolute inset-0 bg-black/5"></div>
                    <h1 className="relative text-white text-3xl font-bold">
                        Giới thiệu về chúng tôi
                    </h1>
                </div>

                <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-5xl text-gray-700 mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nền tảng mua và bán nông sản chất lượng</h2>
                    
                    <p className="mb-6 leading-relaxed">
                        Chúng tôi cung cấp nền tảng bán hàng trực tuyến giúp kết nối nhà cung cấp và người mua một cách minh bạch, an toàn và hiệu quả. 
                        Với hệ thống quản lý chuỗi cung ứng tiên tiến, bạn có thể yên tâm về nguồn gốc và chất lượng sản phẩm.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 mt-8">1. Minh bạch chuỗi cung ứng</h3>
                    <p className="mb-4 leading-relaxed">
                        Chúng tôi cam kết đảm bảo sự minh bạch trong từng khâu của chuỗi cung ứng. Mỗi sản phẩm đều có thể được kiểm chứng qua hệ thống mã QR, 
                        giúp người dùng tra cứu:
                    </p>
                    <ul className="list-disc pl-8 mb-6">
                        <li>Ngày sản xuất và hạn sử dụng.</li>
                        <li>Thông tin về lô hàng, nơi sản xuất hoặc thu hoạch.</li>
                        <li>Quy trình vận chuyển và các tiêu chuẩn an toàn.</li>
                    </ul>
                    <p className="mb-6 leading-relaxed">
                        Chỉ cần quét mã QR trên bao bì sản phẩm, bạn có thể biết được toàn bộ lịch sử của sản phẩm mình mua, đảm bảo sự an tâm tuyệt đối.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 mt-8">2. Bảo mật và an toàn</h3>
                    <p className="mb-6 leading-relaxed">
                        Hệ thống của chúng tôi áp dụng các tiêu chuẩn bảo mật cao nhất để đảm bảo an toàn cho thông tin cá nhân và giao dịch của khách hàng. 
                        Tất cả dữ liệu thanh toán đều được mã hóa và tuân theo các quy chuẩn bảo mật tài chính quốc tế.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 mt-8">3. Hệ thống vận chuyển nhanh chóng</h3>
                    <p className="mb-6 leading-relaxed">
                        Chúng tôi hợp tác với nhiều đơn vị vận chuyển uy tín để đảm bảo hàng hóa được giao đúng hạn. Người mua có thể theo dõi trạng thái đơn hàng 
                        theo thời gian thực và nhận thông báo khi hàng đến nơi.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 mt-8">4. Chính sách hợp tác</h3>
                    <p className="mb-6 leading-relaxed">
                        Chúng tôi luôn tìm kiếm và chào đón các đối tác cung ứng mới để mở rộng mạng lưới sản phẩm chất lượng. Nếu bạn là nhà sản xuất, nhà cung cấp 
                        hoặc muốn trở thành đối tác, vui lòng liên hệ để cùng nhau phát triển.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 mt-8">5. Hỗ trợ khách hàng</h3>
                    <p className="mb-6 leading-relaxed">
                        Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn. Nếu gặp bất kỳ vấn đề gì, bạn có thể gửi yêu cầu hỗ trợ hoặc liên hệ qua hotline để được tư vấn nhanh chóng.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default AboutPage;
