import SanPham from "../models/sanpham.model.js";
import {v2 as cloudinary} from 'cloudinary'
import DanhMuc from "../models/danhmuc.model.js";
import NguoiDung from "../models/nguoidung.model.js";
import CuaHang from "../models/cuahang.model.js";
import mongoose from "mongoose";

export const addSanPham = async (req, res) => {
    try {
        const idND = req.nguoidung._id.toString();
        const { tenSP, moTaSP, idDM, nguonGoc, phanLoai, chungNhan, image } = req.body;
        if (!tenSP || !moTaSP || !idDM || !nguonGoc || !phanLoai || !chungNhan) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
        }

        let anhSPUrl = image; // URL ảnh sản phẩm
        let anhCNUrl = chungNhan.anhCN; // URL ảnh chứng nhận

        if (image) {
            try {
                const uploadResult = await cloudinary.uploader.upload(image);
                anhSPUrl = uploadResult.secure_url;
            } catch (uploadError) {
                console.log("Lỗi upload ảnh sản phẩm:", uploadError.message);
                return res.status(500).json({ error: "Lỗi khi upload ảnh sản phẩm lên Cloudinary" });
            }
        }

        if (chungNhan && chungNhan.anhCN) {
            try {
                const uploadResultCN = await cloudinary.uploader.upload(chungNhan.anhCN);
                anhCNUrl = uploadResultCN.secure_url;
            } catch (uploadError) {
                console.log("Lỗi upload ảnh chứng nhận:", uploadError.message);
                return res.status(500).json({ error: "Lỗi khi upload ảnh chứng nhận lên Cloudinary" });
            }
        }

        const cuaHang = await CuaHang.findOne({ idNguoiDung: idND });

        if (!cuaHang) {
            return console.log("Không tìm thấy cửa hàng!");
        }
        
        const sanPhamMoi = new SanPham({
            tenSP,
            moTaSP,
            idDM,
            idCH: cuaHang._id,
            nguonGoc,
            phanLoai: phanLoai,
            chungNhan: chungNhan,
            dsAnhSP: anhSPUrl,
        });

        const danhMuc = await DanhMuc.findById(idDM);
        if (!danhMuc) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        danhMuc.dsSanPham.push(sanPhamMoi._id); 
        await danhMuc.save();

        const nguoiDung = await NguoiDung.findById(idND);
        if (!nguoiDung) {
            return res.status(404).json({ message: "nguoiDung không tồn tại." });
        }

        cuaHang.dsSanPham.push(sanPhamMoi._id); 
        await cuaHang.save();

        await sanPhamMoi.save();
        res.status(201).json({ message: "Thêm sản phẩm thành công!", sanPham: sanPhamMoi });

    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

export const getTatCaSanPham = async (req, res) => {
    try {
        const products = await SanPham.find({ trangThai: 'Đang bán' }).populate("idCH");

        res.status(200).json(products);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

export const getTatCaSanPhamDM = async (req, res) => {
    try {
        const {sort, page, limit, minStar=0, maxStar=0, locations=''} = req.query;
        const result = await sapxepSanPham({sort, page, limit, minStar, maxStar,locations });
        return res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

export const getSanPhamById = async (req, res) => {
    try {
        const { id } = req.params;
        const idND = req.nguoidung._id; 
        const product = await SanPham.findById(id).populate("idDM").populate("idCH");
        //console.log(product);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }

        let isFavorite = false;
        if (idND) {
            isFavorite = await NguoiDung.exists({
                _id: idND,
                dsYeuThich: id,
            });
        }

        res.status(200).json({ product, isFavorite });
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};


export const goiYTimKiem = async (req, res) => {
    const { search, danhmuc } = req.query;
    
    if (!search) {
        return res.status(400).json({ message: 'Vui lòng nhập từ tìm kiếm' });
    }

    try {
        const goiY = await SanPham.find({
            tenSP: { $regex: search, $options: 'i' },
            ...(danhmuc && { idDM: danhmuc })  // Chỉ thêm điều kiện idDM nếu danhmuc có giá trị
        }).limit(5);

        res.json(goiY);
    } catch (err) {
        console.error('Lỗi trả về gợi ý:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
export const getSanPhamByIdDM = async (req, res) => { 
    try {
        const {sort, page, limit, danhmuc, minStar=0, maxStar=0, locations=''} = req.query;
        const result = await sapxepSanPham({sort, page, limit, danhmuc, minStar, maxStar,locations });
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi getSanPhamByIdDM controller", error.message);
    }
};

export const getSanPhamByIdCH = async (req, res) => { 
    try {
        const {sort, page, limit, cuahang} = req.query;
        const result = await sapxepSanPham({sort, page, limit, cuahang });
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi getSanPhamByIdCH controller", error.message);
    }
};

export const timKiem = async (req, res) => { 
    try {
        const { search, sort, page, limit, danhmuc='', minStar=0, maxStar=0, locations='' } = req.query;
        const result = await sapxepSanPham({ search, sort, page, limit, danhmuc, minStar, maxStar,locations });
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi tim kiem controller", error.message);
    }
};

export const sapxepSanPham = async ({ search = '', sort = "phobien", page = 1, limit = 1, danhmuc, minStar=0, maxStar=0, locations='', cuahang='' }) => {
    const pageSize = parseInt(limit);
    const skip = (page - 1) * pageSize;

    const matchStage = { trangThai: 'Đang bán' };

    // Chỉ thêm điều kiện tìm kiếm khi search có giá trị
    if (search.trim()) {
        matchStage.tenSP = { $regex: search, $options: 'i' };
    }
    
    // Chỉ lọc theo danh mục nếu có danh mục được truyền vào
    if (danhmuc) {
        matchStage.idDM = new mongoose.Types.ObjectId(danhmuc);
    }

    // Chỉ lọc theo cửa hàng nếu có cửa hàng được truyền vào
    if (cuahang) {
        matchStage.idCH = new mongoose.Types.ObjectId(cuahang);
    }

    const min = Number(minStar);
    const max = Number(maxStar);

    if (min && max !== '0') {
        matchStage.$expr = {
            $and: [
                { $gt: ["$tongSoDanhGia", 0] }, 
                { $gte: [{ $divide: ["$tongSoSao", "$tongSoDanhGia"] }, min] },
                { $lte: [{ $divide: ["$tongSoSao", "$tongSoDanhGia"] }, max] }
            ]
        };
    }    

    if (locations !== '') {
        const locationsArray = locations.split(",");
        matchStage.nguonGoc = { $in: locationsArray };
    }
    
    const tong = await SanPham.countDocuments(matchStage);
    const tongPage = Math.ceil(tong / pageSize);

    let sortStage = { luotXem: -1 };
    if (sort === "moinhat") {
        sortStage = { createdAt: -1 };
    } else if (sort === "nhieunguoidat") {
        sortStage = { daBan: -1 };
    } else if (sort === "giatang" || sort === "giagiam") {
        sortStage = { giaSauGiam: sort === "giatang" ? 1 : -1 };
    }

    const sp = await SanPham.aggregate([
        { $match: matchStage },
        {
            $addFields: {
                giaSauGiam: {
                    $subtract: [
                        { $arrayElemAt: ["$phanLoai.giaLoai", 0] },
                        {
                            $multiply: [
                                { $arrayElemAt: ["$phanLoai.giaLoai", 0] },
                                { $divide: [{ $arrayElemAt: ["$phanLoai.khuyenMai", 0] }, 100] }
                            ]
                        }
                    ]
                }
            }
        },
        { $sort: sortStage },
        { $skip: skip },
        { $limit: pageSize },
        {
            $lookup: {
                from: "Cuahang",  // Collection
                localField: "idCH",
                foreignField: "_id",
                as: "idCH"
            }
        },
        { $unwind: { path: "$idCH", preserveNullAndEmptyArrays: true } }
    ]);

    return { tong, sp, tongPage };
};


export const capNhatLuotXem = async (req, res) => {
    const { id } = req.params; 
    try {   
        const sp = await  SanPham.updateOne({ _id: id }, { $inc: { luotXem: 1 } });
        if (!sp) {
            return res.status(404).json({ error: "Sản phẩm không tồn tại" });
        }
        res.status(200).json({ message: "Cập nhật lượt xem thành công", luotXem: sp.luotXem });
    } catch (error) {
        console.error("Lỗi cập nhật lượt xem controller:", error.message);
        res.status(500).json({ error: "Lỗi 500" });
    }
};

