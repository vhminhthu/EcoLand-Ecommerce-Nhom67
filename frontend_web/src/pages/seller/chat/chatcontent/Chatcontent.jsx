import { useEffect } from "react";
import { FaLeaf } from "react-icons/fa";
import PropTypes from "prop-types";
import Cactin from "./Cactin";
import Input from "./Input";
import useConversation from "../../../../zustand/useConversation";
import { useAuthContext } from "../../../../context/AuthContext2";

export default function ChatContent() {
    const { hoiThoaiDuocChon, setHoiThoaiDuocChon } = useConversation();

    useEffect(() => {
        return () => setHoiThoaiDuocChon(null); 
    }, [setHoiThoaiDuocChon]);

    return (
        <div className="flex-1 flex flex-col bg-gray-100 rounded-r-2xl">
            {!hoiThoaiDuocChon ? <ChuaChon /> : <DaChon hoiThoaiDuocChon={hoiThoaiDuocChon} />}
        </div>
    );
}

const DaChon = ({ hoiThoaiDuocChon }) => {
    return (
        <>
            <header className="p-4 bg-white border-b flex items-center">
                <img src={hoiThoaiDuocChon.avatar} alt={hoiThoaiDuocChon.tenNguoiDung} className="w-10 h-10 rounded-full" />
                <h2 className="ml-3 font-semibold text-lg">{hoiThoaiDuocChon.tenNguoiDung}</h2>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
                <Cactin />
            </div>
            <div className="p-4 bg-white border-t">
                <Input />
            </div>
        </>
    );
};


DaChon.propTypes = {
    hoiThoaiDuocChon: PropTypes.shape({
        tenNguoiDung: PropTypes.string.isRequired,
        avatar: PropTypes.string,
    }).isRequired,
};

const ChuaChon = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-center">
                <FaLeaf className="mx-auto mb-3" size={25} color="#8CE03E" />
                <h2 className="text-xl font-semibold text-gray-600">Chào mừng bạn đến với EcoLand</h2>
                <p className="text-gray-500">
                    Chào <strong className="text-[#49372F]">{authUser?.tenNguoiDung}</strong>, hãy chọn một đoạn chat để bắt đầu.
                </p>
            </div>
        </div>
    );
};
