import Donhang from "../models/donhang.model.js";
import Giohang from "../models/giohang.model.js"; 
import Cuahang from "../models/cuahang.model.js"; 
import Sanpham from "../models/sanpham.model.js"; 

import moment from "moment";
import Nguoidung from "../models/nguoidung.model.js";

export const taoMaDonHang = async () => {
    const ngayHienTai = moment().format("YYYYMMDD");
    
    // Đếm số đơn hàng đã có trong ngày
    const count = await Donhang.countDocuments({
        ngayDat: { 
            $gte: moment().startOf("day").toDate(), 
            $lt: moment().endOf("day").toDate()
        }
    });

    const soThuTu = String(count + 1).padStart(4, "0"); // Tăng số và định dạng (001, 002,...)
    
    const maDonHang = `DH${ngayHienTai}${soThuTu}`;
    return maDonHang;
};

export const themDonHang = async (req, res) => {
    try {
        const {
            thongTinGiaoHang,
            dsSanPham,
            tongTienHang,
            luuY,
            phiVanChuyen,
            phuongThucThanhToan,
            tongTienThanhToan,
            cuaHangId,
        } = req.body;
        const idND = req.nguoidung._id;
        console.log(dsSanPham);


        if (!thongTinGiaoHang || !dsSanPham || !tongTienHang || !phuongThucThanhToan || !tongTienThanhToan || !cuaHangId) {
            return res.status(400).json({ message: "Thiếu thông tin cần thiết!" });
        }

        if (!Array.isArray(dsSanPham) || dsSanPham.length === 0) {
            return res.status(400).json({ message: "Danh sách sản phẩm không hợp lệ!" });
        }

        const maDonHang = await taoMaDonHang();

        const newOrder = new Donhang({
            maDonHang,
            thongTinGiaoHang,
            dsSanPham,
            tongTienHang,
            luuY,
            phiVanChuyen,
            phuongThucThanhToan,
            tongTienThanhToan,
            cuaHangId,
            khachHangId: idND,
            ngayDat: new Date(),
        });

        const savedOrder = await newOrder.save();

        const giohang = await Giohang.findOne({ idND });

        if (!giohang) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại!" });
        }

        // Lọc lại từng cửa hàng
        giohang.sanPhams = giohang.sanPhams.map((cuaHang) => {
            if (cuaHang.idCH.toString() === cuaHangId.toString()) {
                cuaHang.sanPhamChiTiet = cuaHang.sanPhamChiTiet.filter(
                    (sp) => !dsSanPham.some(
                        (item) => item.idSP.toString() === sp.idSP.toString() &&
                                item.phanLoai.idPL === sp.idLoai
                    )
                );
            }
            return cuaHang;
        }).filter(cuaHang => cuaHang.sanPhamChiTiet.length > 0);

        await giohang.save();

        for (const item of dsSanPham) {
            const sanPham = await Sanpham.findById(item.idSP);
            if (!sanPham) {
                return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
            }
            sanPham.dsDonHang.push(savedOrder._id); 
            await sanPham.save();
        }

        return res.status(201).json({
            message: "Đơn hàng đã được tạo thành công!",
            donhang: savedOrder
        });
    } catch (error) {
        console.error("Lỗi khi thêm đơn hàng:", error);
        return res.status(500).json({ message: "Lỗi máy chủ!", error: error.message });
    }
};

export const layDonHangTheoNguoiDung = async (req, res) => {
    try {
        const idND = req.nguoidung._id;

        const filterStage = {
            khachHangId: idND,
            $or: [
                { idGiaoDich: { $exists: false } },
                { "idGiaoDich.thongTinGiaoDich.trangThaiThanhToan": "Thành công" }
            ]
        };

        const donHangs = await Donhang.find(filterStage)
        .sort({ ngayDat: -1 })
        .populate({
            path: "cuaHangId",
            select: "tenCH _id"
        })
        .populate({
            path: "dsSanPham.idSP",
            select: "_id tenSP dsAnhSP"
        });


        if (donHangs.length === 0) {
            return res.status(404).json({ message: "Người dùng chưa có đơn hàng nào!" });
        }

        return res.status(200).json({
            message: "Lấy danh sách đơn hàng thành công!",
            donHangs
        });
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        return res.status(500).json({ message: "Lỗi máy chủ!", error: error.message });
    }
};

export const layDonHangTheoCuaHang = async (req, res) => {
    try {
        const idND = req.nguoidung._id;
        const { filter, page = 1, limit = 10 } = req.query;

        const cuaHang = await Cuahang.findOne({ idNguoiDung: idND }).select("_id");
        if (!cuaHang) {
            return res.status(404).json({ message: "Người dùng không sở hữu cửa hàng nào!" });
        }

        const cuaHangId = cuaHang._id;

        let filterStage = { cuaHangId };
        if (filter) {
            const trangThaiMap = {
                choxacnhan: "Chờ xác nhận",
                cholayhang: "Chờ lấy hàng",
                chogiaohang: "Chờ giao hàng",
                hoanthanh: "Hoàn thành",
                dahuy: "Đã hủy"
            };
            if (trangThaiMap[filter]) {
                filterStage.trangThai = trangThaiMap[filter];
            }
        }

        filterStage = {
            $and: [
                filterStage,
                {
                    $or: [
                        { idGiaoDich: { $exists: false } },
                        { "idGiaoDich.thongTinGiaoDich.trangThaiThanhToan": "Thành công" }
                    ]
                }
            ]
        };

        const tong = await Donhang.countDocuments(filterStage);
        const tongPage = Math.ceil(tong / limit);

        const soLuongChoXacNhan = await Donhang.countDocuments({ cuaHangId, trangThai: "Chờ xác nhận" });

        const donHangs = await Donhang.find(filterStage)
            .sort({ ngayDat: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .select("_id maDonHang ngayDat thongTinGiaoHang.hoVaTen thongTinGiaoHang.sdt tongTienThanhToan trangThai");

        return res.status(200).json({
            message: "Lấy danh sách đơn hàng thành công!",
            tongDonHang: tong,
            tongPage,
            soLuongChoXacNhan,
            donHangs
        });
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        return res.status(500).json({ message: "Lỗi máy chủ!", error: error.message });
    }
};

export const layDonHangTheoId = async (req, res) => {
    try {
        const { id } = req.params;

        const donHang = await Donhang.findById(id).populate("dsSanPham.idSP", "tenSP")

        if (!donHang) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
        }

        return res.status(200).json(donHang);
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        return res.status(500).json({ message: "Lỗi máy chủ!", error: error.message });
    }
};

export const capNhatTrangThaiDonHang = async (req, res) => {
    try {
        const { id } = req.params;
        const { trangThai } = req.body;

        const donHang = await Donhang.findById(id);
        if (!donHang) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
        }

        const cuaHang = await Cuahang.findById(donHang.cuaHangId);
        if (!cuaHang) {
            return res.status(404).json({ message: "Không tìm thấy người dùng!" });
        }

        const nguoiDung = await Nguoidung.findById(cuaHang.idNguoiDung);
        if (!nguoiDung) {
            return res.status(404).json({ message: "Không tìm thấy người dùng!" });
        }

        if (trangThai === "Hoàn thành" && donHang.trangThai !== "Hoàn thành") {
            for (const item of donHang.dsSanPham) {
                const sanPham = await Sanpham.findById(item.idSP);
                if (!sanPham) continue;

                sanPham.phanLoai.forEach((loai) => {
                    if (loai.idPL === item.phanLoai.idPL) {
                        loai.khoHang -= item.soLuong;
                        loai.daBan = (loai.daBan || 0) + item.soLuong;
                    }
                });

                await sanPham.save();
            }

            nguoiDung.soDuTien += donHang.tongTienHang;
            nguoiDung.nguonTien.push({
                loaiTien: "Cộng",
                soTien: donHang.tongTienHang,
                ngay: Date.now(),
                noidung: `Thanh toán của đơn hàng ${donHang.maDonHang}`,
            });
            await nguoiDung.save();

        }

        donHang.trangThai = trangThai;
        await donHang.save();

        res.status(200).json({ message: "Cập nhật trạng thái thành công!", donHang });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};


export const getDoanhThu = async (req, res) => { 
    try {
        const { type } = req.query;
        const idND = req.nguoidung._id;
        if (!idND) return res.status(401).json({ error: "Không xác thực được người dùng!" });

        const cuaHang = await Cuahang.findOne({ idNguoiDung: idND });
        if (!cuaHang) return res.status(404).json({ error: "Không tìm thấy cửa hàng!" });

        const now = new Date();
        const yearNum = now.getFullYear();
        const monthNum = now.getMonth() + 1;
        const dayNum = now.getDate();

        const firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - now.getDay() + 1);
        firstDayOfWeek.setHours(0, 0, 0, 0);

        let matchStage = {}; // Điều kiện lọc thời gian
        let groupStage = {}; // Điều kiện nhóm dữ liệu
        let formatStage = {}; // Format đầu ra

        matchStage = {
            $and: [
                { "cuaHangId": cuaHang._id },
                { "trangThai": "Hoàn thành" },
                { $expr: {} }
            ]
        };

        if (type === "Ngày") {
            matchStage.$and[1] = {
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$ngayDat" }, yearNum] },
                        { $eq: [{ $month: "$ngayDat" }, monthNum] },
                        { $eq: [{ $dayOfMonth: "$ngayDat" }, dayNum] }
                    ]
                }
            };
            groupStage = { _id: { $hour: "$ngayDat" } };
            formatStage = {
                $set: { _id: { $concat: [{ $toString: "$_id" }, ":00"] } }
            };
        } 
        else if (type === "Tuần") {
            matchStage.$and[1] = { ngayDat: { $gte: firstDayOfWeek, $lt: now } };
            groupStage = { _id: { $dayOfWeek: "$ngayDat" } };
            formatStage = {
                $set: {
                    _id: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$_id", 1] }, then: "Thứ 6" },
                                { case: { $eq: ["$_id", 2] }, then: "Thứ 2" },
                                { case: { $eq: ["$_id", 3] }, then: "Thứ 3" },
                                { case: { $eq: ["$_id", 4] }, then: "Thứ 4" },
                                { case: { $eq: ["$_id", 5] }, then: "Thứ 5" },
                                { case: { $eq: ["$_id", 6] }, then: "Thứ 6" },
                                { case: { $eq: ["$_id", 7] }, then: "Thứ 7" }
                            ],
                            default: "Unknown"
                        }
                    }
                }
            };
        }
        else {
            return res.status(400).json({ message: "Loại thống kê không hợp lệ" });
        }

        const revenue = await Donhang.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: groupStage._id,
                    totalRevenue: { $sum: "$tongTienThanhToan" }
                }
            },
            formatStage,
            { $sort: { _id: 1 } }
        ]);

        // Tính tổng doanh thu
        const tong = await Donhang.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    tong: { $sum: "$tongTienThanhToan" }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: revenue,
            tong: tong[0]?.tong || 0
        });

    } catch (error) {
        console.error("Lỗi khi lấy doanh thu:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const getTinhTrangDonHang = async (req, res) => {
    try {
        const idND = req.nguoidung._id;
        if (!idND) return res.status(401).json({ error: "Không xác thực được người dùng!" });

        const cuaHang = await Cuahang.findOne({ idNguoiDung: idND });
        if (!cuaHang) return res.status(404).json({ error: "Không tìm thấy cửa hàng!" });

        const orderStats = await Donhang.aggregate([
            {
                $match: { cuaHangId: cuaHang._id }
            },
            {
                $group: {
                    _id: "$trangThai",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({ success: true, data: orderStats });
    } catch (error) {
        console.error("Lỗi khi lấy tình trạng đơn hàng:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};


export const getDonHangCXN = async (req, res) => {
    try {
        const idND = req.nguoidung._id;
        if (!idND) return res.status(401).json({ error: "Không xác thực được người dùng!" });

        const cuaHang = await Cuahang.findOne({ idNguoiDung: idND });
        if (!cuaHang) return res.status(404).json({ error: "Không tìm thấy cửa hàng!" });

        const danhSachDonHang = await Donhang
            .find({ cuaHangId: cuaHang._id, trangThai: "Chờ xác nhận" })
            .select("maDonHang trangThai ngayDat tongTienThanhToan khachHangId")
            .populate("khachHangId", "tenNguoiDung"); 

        res.status(200).json({ success: true, data: danhSachDonHang });
    } catch (error) {
        console.error("Lỗi khi lấy tình trạng đơn hàng:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const getSanPhamBanChay = async (req, res) => {
    try {
        const idND = req.nguoidung._id;
        if (!idND) return res.status(401).json({ error: "Không xác thực được người dùng!" });

        const cuaHang = await Cuahang.findOne({ idNguoiDung: idND });
        if (!cuaHang) return res.status(404).json({ error: "Không tìm thấy cửa hàng!" });

        const sanPhamBanChay = await Donhang.aggregate([
            {
                $match: { cuaHangId: cuaHang._id, trangThai: "Hoàn thành" }
            },
            {
                $unwind: "$dsSanPham"
            },
            {
                $match: { "dsSanPham.soLuong": { $gt: 0 } } 
            },
            {
                $group: {
                    _id: "$dsSanPham.idSP", 
                    totalSold: { $sum: "$dsSanPham.soLuong" } 
                }
            },
            {
                $lookup: {
                    from: "Sanpham", 
                    localField: "_id",
                    foreignField: "_id", 
                    as: "sanPhamInfo"
                }
            },
            {
                $unwind: "$sanPhamInfo"
            },
            {
                $sort: { totalSold: -1 }
            },
            {
                $limit: 10
            }
        ]);        

        res.status(200).json({ success: true, data: sanPhamBanChay });
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm bán chạy:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const getOrderStatusPercentage = async (req, res) => {
    try {
      
        const totalOrders = await Donhang.countDocuments();

        if (totalOrders === 0) {
            return res.status(200).json({
                success: true,
                chuaXacNhan: 0,
                choGiaoHang: 0,
                hoanThanh: 0,
            });
        }

    
        const chuaXacNhanCount = await Donhang.countDocuments({ trangThai: 'Chờ xác nhận' });
        const choGiaoHangCount = await Donhang.countDocuments({ trangThai: 'Chờ giao hàng' });
        const hoanThanhCount = await Donhang.countDocuments({ trangThai: 'Hoàn thành' });

    
        const chuaXacNhanPercent = ((chuaXacNhanCount / totalOrders) * 100).toFixed(2);
        const choGiaoHangPercent = ((choGiaoHangCount / totalOrders) * 100).toFixed(2);
        const hoanThanhPercent = ((hoanThanhCount / totalOrders) * 100).toFixed(2);

       
        res.status(200).json({
            success: true,
            chuaXacNhan: chuaXacNhanPercent,
            choGiaoHang: choGiaoHangPercent,
            hoanThanh: hoanThanhPercent,
        });
    } catch (error) {
        console.error("Lỗi khi tính toán phần trăm trạng thái đơn hàng:", error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server!',
            error: error.message,
        });
    }
};