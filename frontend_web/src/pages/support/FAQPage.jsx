import MainLayout from "../../layouts/customer/MainLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const FAQPage = () => {
    const [message, setMessage] = useState("");
    const [reportType, setReportType] = useState("Tố cáo người bán");
    const [userNotification, setUserNotification] = useState(null);
    const [userId, setUserId] = useState(null);
    const [adminResponses, setAdminResponses] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("chat-user"));
        if (user && user._id) {
            setUserId(user._id);
            fetchResponses(user._id);
        }
    }, []);

    const fetchResponses = async (id) => {
        try {
            const response = await axios.get(`/api/baocao/reply/${id}`);
            setAdminResponses(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy phản hồi:", error);
            setAdminResponses([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() === "" || !userId) return;

        try {
            const response = await axios.post(`/api/baocao/add/${userId}`, {
                loaiBaoCao: reportType,
                noiDung: message,
            });

            if (response.status === 201) {
                setUserNotification("Cảm ơn bạn đã gửi phản hồi! Chúng tôi sẽ xem xét sớm nhất.");
                setMessage("");
                fetchResponses(userId);
            }
        } catch (error) {
            setUserNotification(error.response?.data?.error || "Đã xảy ra lỗi. Vui lòng thử lại.");
        }

        setTimeout(() => setUserNotification(null), 3000);
    };

    return (
        <MainLayout>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center">
                <div className="relative w-full h-64 bg-cover bg-center flex items-center justify-center" 
                    style={{ backgroundImage: "url('https://i.pinimg.com/736x/1a/6d/3e/1a6d3eee2b2355d49290721d2dc21caf.jpg')" }}>
                    <div className="absolute inset-0 bg-black/5"></div>
                    <h1 className="relative text-white text-3xl font-bold">Hỏi đáp và góp ý</h1>
                </div>

                <div className="flex w-full max-w-7xl mt-8 gap-6">
                    <div className="bg-white shadow-lg rounded-xl p-6 w-1/3">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Gửi thắc mắc hoặc góp ý</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <select 
                                className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none text-base"
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                            >
                                <option value="Tố cáo người bán">Tố cáo người bán</option>
                                <option value="Góp ý">Góp ý</option>
                                <option value="Khiếu nại">Khiếu nại</option>
                                <option value="Thắc mắc">Thắc mắc</option>
                            </select>
                            <textarea 
                                className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none text-base"
                                rows="4"
                                placeholder="Nhập câu hỏi hoặc góp ý..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                className="w-full bg-green-900 text-white font-semibold py-3 rounded-lg text-base hover:bg-green-700 transition duration-300">
                                Gửi ngay
                            </button>
                        </form>

                        {userNotification && (
                            <p className="mt-4 text-center text-green-700 bg-green-100 p-2 rounded-lg">
                                {userNotification}
                            </p>
                        )}
                    </div>

                    <div className="w-2/3 h-[500px] overflow-y-auto rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Phản hồi từ Admin</h2>
                        {adminResponses.map((response) => (
                            <div key={response._id} className="p-4 border rounded-lg bg-gray-50 shadow-md mb-5">
                                <div className="flex justify-between">
                                    <h3 className="text-md font-bold text-green-800">
                                        {response.loaiBaoCao} 
                                        {response.tenSanPham && ` - ${response.tenSanPham}`}
                                    </h3>
                                    <span className="text-gray-500 text-sm">{response.updatedAt}</span>
                                </div>
                                <p className="text-gray-700 mt-1"><strong>Bạn:</strong> {response.noiDung}</p>
                                <p className="bg-gray-100 p-3 rounded-lg mt-2 text-gray-700">
                                    <strong>Admin:</strong> {response.phanHoi || "Chưa có phản hồi từ Admin."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default FAQPage;
