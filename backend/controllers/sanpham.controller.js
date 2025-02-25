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