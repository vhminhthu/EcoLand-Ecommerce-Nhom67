import { BiEdit, BiUser, BiCopyAlt, BiBell, BiHeart } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";

function AccountSidebar() {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại

    return (
        <div className="account-sidebar min-w-fit max-w-fit border-2 border-emerald-700 rounded-lg !p-4">
            <div className="flex items-center gap-2 !mb-12">
                <div className="flex justify-center bg-amber-100 rounded-full w-12 h-12 !mx-auto">
                    <img src="https://via.placeholder.com/150" alt="profile" className="rounded-full w-100 h-100 mx-auto" />
                </div>
                <div>
                    <p className="font-bold">Tên người dùng</p>
                    <span className="text-gray-400 text-sm flex items-center gap-1.5 cursor-pointer">
                        <BiEdit />Sửa hồ sơ
                    </span>
                </div>
            </div>
            <div>
                <ul>
                    <li 
                        className="cursor-pointer border-b-1 !p-2 flex items-center gap-2 font-bold hover:bg-gray-50 hover:text-emerald-600"
                        onClick={() => navigate('/customer/account/profile')}
                    >
                        <BiUser />Tài khoản của tôi
                    </li>
                    <ul>
                        {[
                            { label: "Hồ sơ", path: "/customer/account/profile" },
                            { label: "Ngân hàng", path: "/customer/account/payment" },
                            { label: "Địa chỉ", path: "/customer/account/address" },
                            { label: "Đổi mật khẩu", path: "/customer/account/password" },
                        ].map((item) => (
                            <li
                                key={item.path}
                                className={`cursor-pointer !px-8 !py-2 
                                ${location.pathname === item.path ? "text-emerald-600 bg-slate-100 font-bold" : "hover:bg-gray-50 hover:text-emerald-600"}`}
                                onClick={() => navigate(item.path)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>

                    {[
                        { label: "Đơn mua", path: "/customer/purchase", icon: <BiCopyAlt /> },
                        { label: "Thông báo", path: "/customer/notification", icon: <BiBell /> },
                        { label: "Yêu thích", path: "/customer/wishlist", icon: <BiHeart /> },
                    ].map((item) => (
                        <li
                            key={item.path}
                            className={`cursor-pointer border-b-1 !p-2 flex items-center gap-2 font-bold 
                            ${location.pathname === item.path ? "text-emerald-600 bg-slate-100" : "hover:bg-gray-50 hover:text-emerald-600"}`}
                            onClick={() => navigate(item.path)}
                        >
                            {item.icon} {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AccountSidebar;
