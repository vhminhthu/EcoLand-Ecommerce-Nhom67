import { useState } from "react";
import Sidebar from "./chat/sidebar/Siderbar.jsx";
import ChatContent from "./chat/chatcontent/Chatcontent.jsx";

const chats = [
    { id: 1, name: "Alan’s Farm", lastMessage: "Xin chào!", time: "Yesterday", unread: 3, avatar: "https://i.pinimg.com/736x/08/19/34/081934392884b2bb98308c4666550e09.jpg" },
    { id: 2, name: "GreenShop", lastMessage: "Hàng mới về nha!", time: "Today", unread: 2, avatar: "https://i.pinimg.com/736x/08/19/34/081934392884b2bb98308c4666550e09.jpg" },
    { id: 3, name: "Organic Mart", lastMessage: "Ship nội thành 30 phút!", time: "Today", unread: 0, avatar: "https://i.pinimg.com/736x/08/19/34/081934392884b2bb98308c4666550e09.jpg" },
];

function ChatPage() {
    const [search, setSearch] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="flex !h-[90vh] w-full !max-w-5xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <Sidebar chats={chats} search={search} setSearch={setSearch} onSelectChat={setSelectedChat} />
            <ChatContent selectedChat={selectedChat} />
        </div>
    );
}

export default ChatPage;
