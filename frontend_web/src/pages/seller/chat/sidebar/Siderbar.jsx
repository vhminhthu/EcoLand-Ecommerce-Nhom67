import PropTypes from "prop-types";
import Cachoithoai from "./Cachoithoai.jsx";

function Sidebar({ chats, search, setSearch, onSelectChat }) {
    return (
        <div className="w-80 border-r bg-white rounded-l-2xl">
            <h2 className="text-lg font-bold p-4 text-green-600">Chat</h2>

            {/* Ô tìm kiếm */}
            <div className="p-2 flex items-center border-b">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 pl-8 border rounded-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="ml-2 px-3 py-2 bg-gray-200 rounded-md">All</button>
            </div>

           
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
