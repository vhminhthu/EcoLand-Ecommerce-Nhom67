import SanPham from "../models/sanpham.model.js";
import {v2 as cloudinary} from 'cloudinary'
import DanhMuc from "../models/danhmuc.model.js";
import NguoiDung from "../models/nguoidung.model.js";
import CuaHang from "../models/cuahang.model.js";
import mongoose from "mongoose";
import moment from 'moment';  // Nhớ import moment

import Admin from "../models/admin.model.js";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import abi from "../abi.js";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
const signer = new ethers.Wallet(adminPrivateKey, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = abi; 
const contract = new ethers.Contract(contractAddress, contractABI, signer);

export const themSanPhamVaoBlockChain = async (req, res) => {
    try {
        const adminId = req.admin._id;
        const { trangThai, nguyenNhanTC, matKhau } = req.body;
        const { productId } = req.params;

        const product = await SanPham.findById(productId).populate("idDM");
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(403).json({ message: "Không tìm thấy admin!" });
        }

        // Giải mã private key của admin
        let privateKey;
        try {
            privateKey = CryptoJS.AES.decrypt(admin.encryptedPrivateKey, matKhau).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            return res.status(403).json({ message: "Mật khẩu không hợp lệ!" });
        }

        if (!privateKey || privateKey.trim() === "") {
            return res.status(403).json({ message: "Private Key không hợp lệ hoặc trống!" });
        }

        console.log("Signer được khởi tạo:", signer.address);
        console.log("Contract được khởi tạo tại:", contractAddress);

        if (trangThai === "Chờ duyệt") {
            try {
                console.log("Đang gửi giao dịch tạo sản phẩm lên Blockchain...");
                
                const productInput = {
                    productId: productId.toString() || "Unknown_Product",
                    productName: product.tenSP || "Unknown_Product_Name",
                    storeId: product.idCH ? product.idCH.toString() : "Unknown_Farm",
                };

                console.log("Trước khi truyền vào contract:");
                console.log("productId:", productInput.productId);
                
                const tx = await contract.createProduct(
                    productInput,
                    { gasLimit: 500000, gasPrice: ethers.parseUnits("5", "gwei") }
                );
                console.log("Giao dịch đã gửi:", tx.hash);
                await tx.wait();
                console.log("Giao dịch hoàn tất trên blockchain!");                
            } catch (err) {
                console.error("Lỗi khi gửi giao dịch:", err);
                return res.status(500).json({ message: "Lỗi khi gửi giao dịch lên blockchain", error: err.message });
            }
        }

        if (trangThai === "Từ chối" && nguyenNhanTC) {
            product.nguyenNhanTC = nguyenNhanTC;
        }

        product.trangThai = trangThai;
        await product.save();

        return res.json({ message: "Cập nhật trạng thái thành công!", product });
    } catch (error) {
        console.error("Lỗi cập nhật sản phẩm:", error);
        return res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

export const themQuyenDuyetSP = async (req, res) => {
    const { addressNguoiDuyet, idNguoiDuyet, matKhau } = req.body;
    const adminId = req.admin._id;
    const { productId } = req.params;

    try {
        const product = await SanPham.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(403).json({ message: "Không tìm thấy admin!" });
        }

        let privateKey;
        try {
            privateKey = CryptoJS.AES.decrypt(admin.encryptedPrivateKey, matKhau).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            return res.status(403).json({ message: "Mật khẩu không hợp lệ!" });
        }

        if (!privateKey || privateKey.trim() === "") {
            return res.status(403).json({ message: "Private Key không hợp lệ hoặc trống!" });
        }

        console.log("Signer được khởi tạo:", signer.address);
        console.log("Contract được khởi tạo tại:", contractAddress);

        const Tx = await contract.setInspectorForProduct(productId, addressNguoiDuyet, {
            gasLimit: 3000000,
        });
        await Tx.wait();
        console.log(`Sản phẩm ${productId} đã được duyệt`);

        product.idNguoiDuyet = idNguoiDuyet;
        product.addressNguoiDuyet = addressNguoiDuyet;
        
        await product.save();
        return res.status(200).json({ message: "Cập nhật người duyệt sản phẩm thành công!" });
    } catch (error) {
        console.error("Lỗi trong quá trình xử lý người duyệt:", error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi xử lý cập nhật", error: error.message });
    }
};

export const capNhatTrangThaiSanPham = async (req, res) => {
    const { loaiKiemDinh, matKhau } = req.body;
    const adminId = req.admin._id;
    const { productId } = req.params;

    try {
        const product = await SanPham.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
        }

        // Kiểm tra admin hoặc inspector có quyền duyệt sản phẩm
        // if (product.idNguoiDuyet !== adminId) {
        //     return res.status(403).json({ message: "Bạn không có quyền duyệt sản phẩm!" });
        // }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(403).json({ message: "Không tìm thấy admin!" });
        }

        let privateKey;
        try {
            privateKey = CryptoJS.AES.decrypt(admin.encryptedPrivateKey, matKhau).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            return res.status(403).json({ message: "Mật khẩu không hợp lệ!" });
        }

        if (!privateKey || privateKey.trim() === "") {
            return res.status(403).json({ message: "Private Key không hợp lệ hoặc trống!" });
        }

        console.log("Signer được khởi tạo:", signer.address);
        console.log("Contract được khởi tạo tại:", contractAddress);

        if (loaiKiemDinh === "Kiểm định hạt") {
            const ngaySX = moment(product.ngaySX).format('YYYY-MM-DD');
            const approveTx = await contract.approveProduct(productId, admin.address, product.loaiTrong, ngaySX);
            await approveTx.wait();
            console.log(`Sản phẩm ${productId} đã được duyệt`);
            product.trangThai = "Đã duyệt";
        } else if (loaiKiemDinh === "Kiểm định sản phẩm") {
            const ngayTH = moment(product.ngayTH).format('YYYY-MM-DD');

            const qualityCheckTx = await contract.checkProductQuality(productId, ngayTH, product.VatTuHTCT, admin.address);
            await qualityCheckTx.wait();
            console.log(`Chất lượng sản phẩm ${productId} đã được kiểm tra`);
            product.trangThai = "Đã kiểm tra chất lượng";
        } else if (loaiKiemDinh === "Kiểm định đóng gói") {
            const ngayDG = moment(product.ngayDG).format('YYYY-MM-DD');
            const hanSX = moment(product.hanSX).format('YYYY-MM-DD');
            
            const availableTx = await contract.makeProductAvailable(productId, ngayDG, hanSX, admin.address);
            await availableTx.wait();
            console.log(`Sản phẩm ${productId} đã được đưa lên bán`);
            product.trangThai = "Đã kiểm tra đóng gói";
        }
        await product.save();

        return res.status(200).json({ message: "Sản phẩm đã được duyệt, kiểm tra chất lượng và đưa lên bán thành công!" });
    } catch (error) {
        console.error("Lỗi trong quá trình xử lý sản phẩm:", error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi xử lý sản phẩm", error: error.message });
    }
};



export const addSanPham = async (req, res) => {
    try {
        const idND = req.nguoidung._id.toString();
        const { 
            tenSP, moTaSP, idDM, nguonGoc, phanLoai, image, 
            ngaySX, ngayTH, VatTuHTCT, batchId,
        } = req.body;

        if (!tenSP || !moTaSP || !idDM || !nguonGoc || !phanLoai || !ngaySX || !ngayTH || !VatTuHTCT || !batchId) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
        }

        let anhSPUrl = image;

        if (image) {
            try {
                const uploadResult = await cloudinary.uploader.upload(image);
                anhSPUrl = uploadResult.secure_url;
            } catch (uploadError) {
                console.log("Lỗi upload ảnh sản phẩm:", uploadError.message);
                return res.status(500).json({ error: "Lỗi khi upload ảnh sản phẩm lên Cloudinary" });
            }
        }

        const cuaHang = await CuaHang.findOne({ idNguoiDung: idND });
        if (!cuaHang) {
            return res.status(404).json({ error: "Không tìm thấy cửa hàng!" });
        }

        const sanPhamMoi = new SanPham({
            tenSP,
            moTaSP,
            idDM,
            idCH: cuaHang._id,
            nguonGoc,
            phanLoai,
            dsAnhSP: anhSPUrl,
            ngaySX,
            ngayTH,
            VatTuHTCT,
            batchId,
        });

        const danhMuc = await DanhMuc.findById(idDM);
        if (!danhMuc) {
            return res.status(404).json({ error: "Không tìm thấy danh mục" });
        }
        danhMuc.dsSanPham.push(sanPhamMoi._id); 
        await danhMuc.save();

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
        const product = await SanPham.findById(id)
        .populate("idDM")
        .populate({
            path: "idCH",
            select: "_id tenCH anhCH dsSanPham createdAt idNguoiDung",
            populate: [
                {
                    path: "idNguoiDung",
                    select: "dsNguoiTheoDoi"
                },
                {
                    path: "dsSanPham",
                    select: "dsDanhGia",
                    populate: {
                        path: "dsDanhGia",
                        select: "_id"
                    }
                }
            ]
        })
        .populate({
            path: "dsDanhGia",
            select: "soSao noiDung createdAt tenLoai khachHangId",
            populate: {
                path: "khachHangId",
                select: "tenNguoiDung anhND"
            },
        });
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

export const laySanPhamvoiIdCuaHang = async (req, res) => {
    try {
        const idND = req.nguoidung?._id?.toString();
        if (!idND) return res.status(401).json({ error: "Không xác thực được người dùng!" });
        const cuaHang = await CuaHang.findOne({ idNguoiDung: idND });
        console.log("Cửa hàng tìm thấy:", cuaHang);
        if (!cuaHang) return res.status(404).json({ error: "Không tìm thấy cửa hàng!" });
        const danhSachSanPham = await SanPham.find({ idCH: cuaHang._id });
        console.log("Sản phẩm tìm thấy:", danhSachSanPham);
        res.status(200).json({ products: danhSachSanPham });
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ error: "Lỗi server, vui lòng thử lại sau!" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params; 
    const { tenSP, phanLoai, batchId, trangThai, dsAnhSP } = req.body;
    try {
        let product = await SanPham.findById(id); 
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }
        if (tenSP !== undefined) product.tenSP = tenSP;
        if (phanLoai !== undefined) product.phanLoai = phanLoai;
        if (batchId !== undefined) product.batchId = batchId;
        if (trangThai !== undefined) product.trangThai = trangThai;
        if (dsAnhSP) {
            try {
                const uploadResult = await cloudinary.uploader.upload(dsAnhSP);
                product.dsAnhSP = uploadResult.secure_url; 
            } catch (uploadError) {
                console.log("Lỗi upload ảnh:", uploadError.message);
                return res.status(500).json({ error: "Lỗi khi upload ảnh lên Cloudinary" });
            }
        }
        await product.save();
        const allProducts = await SanPham.find();
        return res.status(200).json({ products: allProducts });
    } catch (error) {
        console.log("Lỗi khi cập nhật sản phẩm", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const getPendingProduct = async (req, res) => {
    try {
        const sanPhams = await SanPham.find({ trangThai: "Chờ xác nhận" })
            .populate({ path: "idCH", select: "tenCH idNguoiDung" })
            .populate({ path: "idDM", select: "tenDM" })
            .lean();
            const formatDate = (date) => {
                if (!date) return null;
                return new Date(date).toLocaleDateString("vi-VN"); 
            };
        const results = await Promise.all(
            sanPhams.map(async (sp) => {
                const seller = sp.idCH?.idNguoiDung
                    ? await NguoiDung.findById(sp.idCH.idNguoiDung).select("tenNguoiDung").lean()
                    : null;

                return {
                    _id: sp._id.toString(), 
                    tenNguoiDung: seller?.tenNguoiDung || "Không xác định",
                    tenCuaHang: sp.idCH?.tenCH || "Không xác định",
                    tenSP: sp.tenSP,
                    nguonGoc: sp.nguonGoc,
                    trangThai: sp.trangThai,
                    ngaySX: formatDate(sp.ngaySX),
                    dsAnhSP: sp.dsAnhSP,
                    ngayTH: formatDate(sp.ngayTH),
                    VatTuHTCT: sp.VatTuHTCT,
                    batchId: sp.batchId,
                    tenDM: sp.idDM?.tenDM || "Không xác định",
                    phanLoai: sp.phanLoai?.map(pl => ({
                        idPL: pl.idPL,
                        tenLoai: pl.tenLoai,
                        giaLoai: pl.giaLoai,
                        donVi: pl.donVi,
                        khuyenMai: pl.khuyenMai,
                        khoHang: pl.khoHang
                    })) || []
                };
            })
        );

        res.status(200).json(results);
    } catch (error) {
        console.error("Lỗi lấy sản phẩm chờ duyệt:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

export const updateProductStatus = async (req, res) => {
    try {
        const { productId } = req.params; 
        const { trangThai, nguyenNhanTC } = req.body;

        // Tìm sản phẩm trong cơ sở dữ liệu
        const product = await SanPham.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
        }
        product.trangThai = trangThai;
        if (trangThai === "Từ chối" && nguyenNhanTC) {
            product.nguyenNhanTC = nguyenNhanTC;
        }

        await product.save();

            res.json({ message: "Cập nhật trạng thái thành công!", product });
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            res.status(500).json({ message: "Lỗi server, vui lòng thử lại!" });
        }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await SanPham.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
        }
        if (product.trangThai !== "Từ chối") {
            return res.status(400).json({ message: "Chỉ có thể xoá sản phẩm bị từ chối!" });
        }

        await SanPham.findByIdAndDelete(id);
        res.status(200).json({ message: "Xoá sản phẩm thành công!" });

    } catch (error) {
        console.error("Lỗi xoá sản phẩm:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

export const getProductInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await SanPham.findById(id)
            .populate('idDM idCH')
            .select('tenSP moTaSP batchId idDM ngaySX ngayTH VatTuHTCT serial nguonGoc phanLoai');
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tìm thấy!" });
        }
        const productInfo = {
            tenSP: product.tenSP,
            moTaSP: product.moTaSP,
            batchId: product.batchId,
            idDM: product.idDM, 
            ngaySX: product.ngaySX,
            ngayTH: product.ngayTH,
            VatTuHTCT: product.VatTuHTCT,
            nguonGoc: product.nguonGoc,
            serial: product.serial,
            idCH: {
                tenCH: product.idCH?.tenCH, 
                anhCH: product.idCH?.anhCH,
            },
            phanLoai: product.phanLoai.map(loai => ({
                idPL: loai.idPL,
                tenLoai: loai.tenLoai,
                giaLoai: loai.giaLoai,
                donVi: loai.donVi,
                khuyenMai: loai.khuyenMai, 
                khoHang: loai.khoHang,
                daBan: loai.daBan,
            }))
        };
        res.json({ product: productInfo });
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server, vui lòng thử lại!" });
    }
};



