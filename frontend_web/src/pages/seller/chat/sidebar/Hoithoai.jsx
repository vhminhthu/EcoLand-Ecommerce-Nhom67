import PropTypes from "prop-types";
import useConversation from "../../../../zustand/useConversation";

function Hoithoai({ chat }) {


    const { hoiThoaiDuocChon, setHoiThoaiDuocChon } = useConversation();

    const initials = chat?.tenNguoiDung ? chat.tenNguoiDung.charAt(0).toUpperCase() : "?";
    const tenNguoiDung = chat?.tenNguoiDung ?? "Người dùng";
    const isSelected = hoiThoaiDuocChon?._id === chat._id;
    

    return (
        <div
            className={`flex items-center p-3 border-b cursor-pointer mx-2 my-1 ${
                isSelected ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setHoiThoaiDuocChon(chat)}
        >
            {chat?.avatar ? (
                <img src={chat.avatar} alt={tenNguoiDung} className="w-12 h-12 rounded-full object-cover" />
            ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-300 text-white text-lg font-bold">
                    {initials}
                </div>
            )}
            <div className="ml-3 flex-grow">
                <h4 className="font-semibold">{tenNguoiDung}</h4>
                <p className="text-sm text-gray-500 truncate">{chat?.lastMessage ?? "Không có tin nhắn"}</p>
            </div>
            <div className="text-right text-xs text-gray-400">
                <p className="mb-3">{chat?.time ?? ""}</p>
                {chat?.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-xl">{chat.unread}</span>
                )}
            </div>
        </div>
    );
}

Hoithoai.propTypes = {
    chat: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        tenNguoiDung: PropTypes.string,
        avatar: PropTypes.string,
        lastMessage: PropTypes.string,
        time: PropTypes.string,
        unread: PropTypes.number,
    }).isRequired,
};

export default Hoithoai;
