import { useState, useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineBell } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";
import PropTypes from "prop-types";
import ChatPage from "../../../pages/seller/ChatPage";

function Header({ title }) {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
        tenNguoiDung: "Người dùng",
        anhND: "https://via.placeholder.com/150",
    });

    
    useEffect(() => {
        const storedUser = localStorage.getItem("chat-user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser({
                tenNguoiDung: userData.tenNguoiDung || "Người dùng",
                anhND: userData.anhND || "https://via.placeholder.com/150",
            });
        }
    }, []);

    return (
        <>
            <div className="bg-white text-xl font-bold rounded-xl shadow-xl px-5 py-4 w-auto h-fit flex justify-between items-center">
                <h1 className="text-emerald-700">{title}</h1>
                <div className="flex justify-between items-center text-black gap-4">
                    <div className="flex items-center bg-slate-100 rounded-lg px-4 py-1 w-64 h-12">
                        <BiSearch />
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="w-full px-2 text-sm h-10 bg-transparent focus:outline-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div
                            className="bg-slate-100 rounded-lg flex items-center justify-center w-12 h-12 cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            <MdOutlineEmail className="text-xl" />
                        </div>

                        <div className="bg-slate-100 rounded-lg flex items-center justify-center w-12 h-12">
                            <HiOutlineBell className="text-xl" />
                        </div>

                        <div className="bg-slate-100 rounded-lg flex items-center justify-center w-12 h-12">
                            <img
                                src={user.anhND}
                                alt="profile"
                                className="rounded-full w-10 h-10 object-cover"
                            />
                        </div>

                        <p className="flex items-center h-12 font-medium text-base">
                            {user.tenNguoiDung}
                        </p>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="bg-white w-[100vw] max-w-5xl h-[90vh] flex flex-col rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Đóng
                        </button>

                        <div className="flex-1 overflow-hidden">
                            <ChatPage />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
