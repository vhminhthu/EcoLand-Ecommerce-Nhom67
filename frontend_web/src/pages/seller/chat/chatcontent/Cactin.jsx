import { useEffect } from "react";
import Axios from "axios";
import useConversation from "../../../../zustand/useConversation";
import Tin from "./Tin";
import useListenMessages from "../../../../hook/useListenMessages";
export default function Cactin() {
    const { cacTinNhan, setCacTinNhan, hoiThoaiDuocChon } = useConversation();
    useListenMessages()

    useEffect(() => {
        const layTatCaTin = async () => {
            if (!hoiThoaiDuocChon || !hoiThoaiDuocChon._id) return;

            try {
                const response = await Axios.get(`/api/tinnhan/${hoiThoaiDuocChon._id}`);
                setCacTinNhan(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        layTatCaTin();
    }, [hoiThoaiDuocChon, setCacTinNhan]);

    return (
        <div className="flex-1 p-4 overflow-y-auto">
            {cacTinNhan.map((msg, index) => (
                <Tin key={index} tin={msg} /> 
            ))}
        </div>
    );
}
