import MainLayout from "../../layouts/customer/MainLayout";
import { useState } from "react";

const FAQPage = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === "") return;
        alert("Cảm ơn bạn đã gửi phản hồi! Chúng tôi sẽ xem xét sớm nhất.");
        setMessage("");
    };

    return (
        <MainLayout>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-6">
           
                <div className="relative w-full h-64 bg-cover bg-center flex items-center justify-center" 
                    style={{ backgroundImage: "url('https://i.pinimg.com/736x/1a/6d/3e/1a6d3eee2b2355d49290721d2dc21caf.jpg')" }}>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <h1 className="relative text-white text-3xl font-bold text-center px-4">
                        Hỏi đáp và góp ý
                    </h1>
                </div>

              
                <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-5xl mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Gửi thắc mắc hoặc góp ý</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <textarea 
                            className="w-full p-5 border rounded-xl text-gray-700 focus:outline-none  text-lg"
                            rows="9"
                            placeholder="Vui lòng nhập câu hỏi hoặc góp ý của bạn..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-green-900 text-white font-semibold py-4 rounded-xl text-lg hover:bg-green-700 transition duration-300">
                            Gửi ngay
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default FAQPage;