import { BiHome, BiCopyAlt, BiHelpCircle } from "react-icons/bi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { HiOutlineWallet } from "react-icons/hi2";
import { AiOutlineProduct, AiOutlineSetting } from "react-icons/ai";
import { BsShopWindow } from "react-icons/bs";
import { MdOutlineDiscount, MdOutlineLocalShipping, MdOutlineLogout } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SellerSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { to: "/seller/home", label: "Trang chủ", icon: <BiHome /> },
        { to: "/seller/orders", label: "Đơn hàng", icon: <BiCopyAlt /> },
        { to: "/seller/reviews", label: "Đánh giá", icon: <IoChatboxEllipsesOutline /> },
        { to: "/seller/finance", label: "Tài chính", icon: <HiOutlineWallet /> },
        { to: "/seller/products", label: "Sản phẩm", icon: <AiOutlineProduct /> },
    ];

    const menuExtras = [
        { to: "/seller/store", label: "Cửa hàng", icon: <BsShopWindow /> },
        { to: "/seller/promotions", label: "Khuyến mãi", icon: <MdOutlineDiscount /> },
        { to: "/seller/shipping", label: "Vận chuyển", icon: <MdOutlineLocalShipping /> },
    ];

    const menuSettings = [
        { to: "/seller/support", label: "Hỗ trợ", icon: <BiHelpCircle /> },
        { to: "/seller/settings", label: "Cài đặt", icon: <AiOutlineSetting /> },
        { to: "/", label: "Đăng xuất", icon: <MdOutlineLogout /> },
    ];

    return (
        <div className='seller-sidebar bg-white h-fit shadow-xl !m-6 rounded-xl min-w-fit'>
            <div className='logo-seller h-40'></div>

            <ul>
                {menuItems.map((item) => (
                    <li
                        key={item.to}
                        className={`flex items-center gap-2 text-medium !px-7 !py-4 cursor-pointer 
                        ${location.pathname === item.to ? "text-emerald-600 font-bold bg-slate-100" : "hover:bg-slate-50 hover:text-emerald-600 hover:font-bold"}`}
                        onClick={() => navigate(item.to)}
                    >
                        {item.icon} {item.label}
                    </li>
                ))}
            </ul>

            <ul className="!mt-8">
                {menuExtras.map((item) => (
                    <li
                        key={item.to}
                        className={`flex items-center gap-2 text-medium !px-7 !py-4 cursor-pointer 
                        ${location.pathname === item.to ? "text-emerald-600 font-bold bg-slate-100" : "hover:bg-slate-50 hover:text-emerald-600 hover:font-bold"}`}
                        onClick={() => navigate(item.to)}
                    >
                        {item.icon} {item.label}
                    </li>
                ))}
            </ul>

            <ul className="!mt-8">
                {menuSettings.map((item) => (
                    <li
                        key={item.to}
                        className={`flex items-center gap-2 text-medium !px-7 !py-4 cursor-pointer 
                        ${location.pathname === item.to ? "text-emerald-600 font-bold bg-slate-100" : "hover:bg-slate-50 hover:text-emerald-600 hover:font-bold"}`}
                        onClick={() => navigate(item.to)}
                    >
                        {item.icon} {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SellerSidebar;
