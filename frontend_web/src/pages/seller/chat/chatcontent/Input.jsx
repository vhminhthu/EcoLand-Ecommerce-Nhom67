import { useState } from "react";
import Axios from "axios";
import useConversation from "../../../../zustand/useConversation";

export default function Input() {
    const [message, setMessage] = useState("");
    const { cacTinNhan, setCacTinNhan, hoiThoaiDuocChon } = useConversation();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!message.trim()) {
            alert("Vui lòng nhập tin nhắn");
            return;
        }

        if (!hoiThoaiDuocChon || !hoiThoaiDuocChon._id) {
            console.error("Không có hội thoại được chọn!");
            return;
        }

        try {
            const response = await Axios.post(`/api/tinnhan/gui/${hoiThoaiDuocChon._id}`, {
                noiDungTN: message,
            });

            console.log("Tin nhắn đã gửi:", response.data);

            setCacTinNhan([...cacTinNhan, response.data]);

            setMessage("");
        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t flex">
            <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                type="submit"
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
                Gửi
            </button>
        </form>
    );
}
