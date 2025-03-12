import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import Hoithoai from "./Hoithoai.jsx";

const Cachoithoai = ({ onSelectChat }) => {
    const [hoithoaiList, setHoithoaiList] = useState([]);

   
    const layTatCa = useCallback(async () => {
        try {
            const response = await Axios.get("/api/nguoidung/tatca");
            setHoithoaiList(response.data || []); 
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            setHoithoaiList([]); 
        }
    }, []);

    useEffect(() => {
        layTatCa();
    }, [layTatCa]); 

    return (
        <div className="overflow-y-auto h-[calc(100vh-150px)]">
            {hoithoaiList.length > 0 ? (
                hoithoaiList.map((ht) => (
                    <Hoithoai 
                        key={ht._id} 
                        chat={ht}  
                        onSelectChat={onSelectChat} 
                    />
                ))
            ) : (
                <p className="text-center text-gray-500 mt-4">Đang tải...</p>
            )}
        </div>
    );
};

Cachoithoai.propTypes = {
    onSelectChat: PropTypes.func.isRequired,
};

export default Cachoithoai;
