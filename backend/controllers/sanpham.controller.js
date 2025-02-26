import SanPham from "../models/sanpham.model.js";
import {v2 as cloudinary} from 'cloudinary'

export const addSanPham = async (req, res) => {
    try {
        const { tenSP, moTaSP, idDM, nguonGoc, phanLoai, chungNhan, image } = req.body;
        console.log(req.body);
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
        
        const newProduct = new SanPham({
            tenSP,
            moTaSP,
            idDM,
            nguonGoc,
            phanLoai: phanLoai,
            chungNhan: chungNhan,
            dsAnhSP: anhSPUrl,
        });

        await newProduct.save();
        res.status(201).json({ message: "Thêm sản phẩm thành công!", sanPham: newProduct });

    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

export const getTatCaSanPham = async (req, res) => {
    try {
        const products = await SanPham.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

export const getSanPhamById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await SanPham.findById(id).populate("idDM");
        console.log(product);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};


export const goiYTimKiem = async (req, res) => {
    const { search, danhmuc } = req.query;  // Sửa lỗi truy vấn query
    
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

export const timKiem = async (req, res) => { 
    const { search, sort = "phobien", page = 1, limit = 4 } = req.query;

    const pageSize = parseInt(limit);
    const skip = (page - 1) * pageSize;
    try {
        const tong = await Dichvu.countDocuments({
            tenDichVu: { $regex: search, $options: 'i' }, 
            trangThaiDV: 'Công khai'});
        const tongPage = Math.ceil(tong / pageSize);

        let sortQuery;
        switch (sort) {
            case 'phobien':
                sortQuery = { luotXem: -1 }; // Sắp xếp theo lượt xem (giảm dần)
                break;
            case 'moinhat':
                sortQuery = { createdAt: -1 }; // Sắp xếp theo ngày tạo (mới nhất)
                break;
            case 'nhieunguoidat':
                sortQuery = { soLuongDonHang: -1 }; // Sắp xếp theo số lượng đơn hàng (giảm dần)
                break;
            case 'giatang':
                sortQuery = { 'phanLoai.coban.giaLoai': 1 }; // Sắp xếp theo giá (tăng dần)
                break;
            case 'giagiam':
                sortQuery = { 'phanLoai.coban.giaLoai': -1 }; // Sắp xếp theo giá (tăng dần)
                break;
            default:
                sortQuery = { luotXem: -1 }; // Mặc định sắp xếp theo lượt xem (giảm dần)
                break;
        }

        const dichvu = await Dichvu.find({
            tenDichVu: { $regex: search, $options: 'i' }, 
            trangThaiDV: 'Công khai'})
        .populate("idNguoiDungDV")
        .populate("idDanhMucDV")
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize);

        if (dichvu.length === 0) {
            return res.status(404).json({ message: 'Không có dịch vụ công khai trong danh mục này' });
        }

        return res.status(200).json({
            tong,
            dichvu,
            tongPage,
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi tim kiem controller", error.message);
    }
};