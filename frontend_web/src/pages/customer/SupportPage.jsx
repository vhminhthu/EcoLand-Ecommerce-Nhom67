import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../../layouts/customer/MainLayout";
import { FaSearch, FaUser } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { useEffect, useState } from "react";

const SupportPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isGuidePage = location.pathname === "/customer/support/guide";

    const [user, setUser] = useState({ tenNguoiDung: "Người dùng", anhND: "/default-avatar.png" });
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("chat-user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser({
                tenNguoiDung: userData.tenNguoiDung || "Người dùng",
                anhND: userData.anhND || "/default-avatar.png",
            });
        }
    }, []);

    const handleArticleClick = (index) => {
        setSelectedArticle(articles[index]);
        setOpenDialog(true);
    };

    return (
        <MainLayout>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center">
                <div className="relative w-full h-64 bg-cover bg-center flex items-center justify-center" 
                    style={{ backgroundImage: "url('https://i.pinimg.com/736x/1a/6d/3e/1a6d3eee2b2355d49290721d2dc21caf.jpg')" }}>
                    <div className="absolute inset-0 bg-black/5"></div>
                    <h1 className="relative text-white text-3xl font-bold">
                        Chào {user.tenNguoiDung}, chúng tôi có thể giúp gì cho bạn?
                    </h1>
                </div>

                <div className="mt-8 flex gap-6">
                    {supportOptions.map((option, index) => (
                        <div 
                            key={index} 
                            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-40 cursor-pointer hover:bg-gray-200"
                            onClick={() => navigate(option.path)}
                        >
                            <div className="text-gray-600 text-3xl">{option.icon}</div>
                            <span className="mt-2 font-semibold text-gray-700">{option.label}</span>
                        </div>
                    ))}
                </div>

                {!isGuidePage && (
                    <div className="mt-12 w-3/4">
                        <h2 className="text-xl font-semibold text-gray-700">Chủ đề phổ biến</h2>
                        <div className="mt-4 flex gap-4 flex-wrap">
                            {articles.map((article, index) => (
                                <button 
                                    key={index} 
                                    className="bg-white shadow-md px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-200"
                                    onClick={() => handleArticleClick(index)}
                                >
                                    {article.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {openDialog && (
                    <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <h3 className="text-lg font-semibold text-gray-800">{selectedArticle?.title}</h3>
                            <p className="mt-2 text-gray-600 whitespace-pre-line">{selectedArticle?.content}</p>
                            <button 
                                className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setOpenDialog(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

const supportOptions = [
    { icon: <FaUser />, label: "Giới thiệu", path: "/customer/support/about" },
    { icon: <FaSearch />, label: "Hướng dẫn", path: "/customer/support/guide" },
    { icon: <MdQuestionAnswer />, label: "FAQ", path: "/customer/support/faq" },
];

const articles = [
    { 
        title: "Làm sao để có thể trở thành người bán?", 
        content: "Bạn cần đăng ký tài khoản trên hệ thống của chúng tôi. Sau đó, hoàn tất quy trình xác minh danh tính bằng cách cung cấp giấy tờ hợp lệ.\n\nSau khi được duyệt, bạn có thể tạo gian hàng, đăng sản phẩm và bắt đầu bán. Hãy chắc chắn rằng bạn tuân thủ các chính sách của nền tảng." 
    },
    { 
        title: "Sao tôi không thể chọn phương thức rút tiền khác?", 
        content: "Một số phương thức rút tiền có thể bị giới hạn do yêu cầu bảo mật hoặc chính sách của hệ thống.\n\nNếu bạn gặp vấn đề, hãy kiểm tra lại xem tài khoản của bạn đã được xác minh đầy đủ hay chưa. Nếu vẫn không thể thay đổi, vui lòng liên hệ bộ phận hỗ trợ để được trợ giúp." 
    },
    { 
        title: "Khoảng bao lâu sau báo cáo thì sẽ được hồi đáp?", 
        content: "Thông thường, chúng tôi sẽ phản hồi trong vòng 24-48 giờ làm việc kể từ khi nhận được báo cáo của bạn.\n\nTuy nhiên, trong một số trường hợp đặc biệt, thời gian xử lý có thể kéo dài hơn do cần điều tra thêm. Chúng tôi cam kết cố gắng giải quyết nhanh nhất có thể." 
    },
];

export default SupportPage;