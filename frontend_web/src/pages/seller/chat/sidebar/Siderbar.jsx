import PropTypes from "prop-types";
import Cachoithoai from "./Cachoithoai.jsx";

function Sidebar({ chats, search, setSearch, onSelectChat }) {
    return (
        <div className="w-80 border-r bg-white rounded-l-2xl">
            <h2 className="text-lg font-bold p-4 text-green-600">Chat</h2>
            <Cachoithoai chats={chats} onSelectChat={onSelectChat} />
        </div>
    );
}

Sidebar.propTypes = {
    chats: PropTypes.array.isRequired,
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
    onSelectChat: PropTypes.func.isRequired,
};

export default Sidebar;
