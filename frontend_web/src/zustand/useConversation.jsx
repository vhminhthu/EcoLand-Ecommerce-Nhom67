import { create } from "zustand";

const useConversation = create((set) => ({
	hoiThoaiDuocChon: null,
	setHoiThoaiDuocChon: (hoiThoaiDuocChon) => set({ hoiThoaiDuocChon }),
	cacTinNhan: [],
	setCacTinNhan: (cacTinNhan) => set({ cacTinNhan }),
}));

export default useConversation;