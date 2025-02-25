import MainLayout from "../../layouts/seller/MainLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { BiStoreAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function ProductsPageAdd() {
    const [formData, setFormData] = useState({
        tenSP: '',
        moTaSP: '',
        idDM: null,
        nguonGoc: '',
        image: null,
        phanLoai: [
            { id: Date.now(), tenLoai: "", giaLoai: "", donVi: "", khuyenMai: "", khoHang: "" }
        ],
        chungNhan: [
            { id: Date.now(), tenCN: "", ngayNhanCN: "", noiCapCN: "", anhCN: null }
        ],
    });
    const [tenDanhMuc, setTenDanhMuc] = useState('Chọn loại');

    const handleSubmit = async () => {
        try {
            
            const response = await axios.post("/api/sanpham/them", formData);
    
            if (response.status === 200 || response.status === 201) {
                alert("Thêm sản phẩm thành công!");
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
            if (error.response) {
                console.error("Chi tiết lỗi từ API:", error.response.data);
                alert(`Có lỗi xảy ra: ${error.response.data.message || "Vui lòng thử lại!"}`);
            } else {
                alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối!");
            }
        }
    };
    
       // Chọn danh mục
    const [chonLoai, setChonLoai] = useState(false);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/danhmuc/lay");
                setCategories(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategorySelect = (category) => {
        setFormData(prev => ({ ...prev, idDM: category._id }));
        setTenDanhMuc(category.tenDM);
        setChonLoai(false);
    };

    // Chứng nhận
    const xulyThaydoiChungnhan = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            chungNhan: prev.chungNhan.map(cert => cert.id === id ? { ...cert, [field]: value } : cert)
        }));
    };

    const xulyThaydoiFileChungnhan = (id, event) => {
        const file = event.target.files[0];  
        if (file) {
            const reader = new FileReader(); 
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    chungNhan: prev.chungNhan.map(cert =>
                        cert.id === id ? { ...cert, anhCN: reader.result } : cert 
                    )
                }));
            };
            reader.readAsDataURL(file);  
            }
    };

    const themChungNhan = () => {
        setFormData(prev => ({
            ...prev,
            chungNhan: [
                ...prev.chungNhan,
                { id: Date.now(), tenCN: "", ngayNhanCN: "", noiCapCN: "", anhCN: null }
            ]
        }));
    };

    const xoaChungNhan = (id) => {
        setFormData(prev => ({
            ...prev,
            chungNhan: prev.chungNhan.filter(cert => cert.id !== id)
        }));
    };

    // Phân loại
    const xulyThaydoiPhanLoai = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            phanLoai: prev.phanLoai.map(cert => cert.id === id ? { ...cert, [field]: value } : cert)
        }));
    };

    const themPhanLoai = () => {
        setFormData(prev => ({
            ...prev,
            phanLoai: [
                ...prev.phanLoai,
                { id: Date.now(), tenLoai: "", giaLoai: "", donVi: "", khuyenMai: "", khoHang: "" }
            ]
        }));
    };

    const xoaPhanLoai = (id) => {
        setFormData(prev => ({
            ...prev,
            phanLoai: prev.phanLoai.filter(cert => cert.id !== id)
        }));
    };

    // Thêm ảnh
    const xulyChonFile = (event) => {
        const file = event.target.files[0];  
        if (file) {
            const reader = new FileReader(); 
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    image: reader.result,  
                }));
            };
            reader.readAsDataURL(file);  
            }
    };

    const xoaFile = () => {
        setFormData(prev => ({ ...prev, image: null }));
    };

    return (
        <MainLayout>
            <div className="bg-white p-5 rounded-xl mb-5 shadow-xl h-full">
                <div className="flex justify-between items-center">
                    <h1 className="flex gap-2 items-center text-2xl">
                        <BiStoreAlt />
                        Thêm Sản Phẩm Mới
                    </h1>
                    <button className="text-xl py-3 px-5 rounded-full bg-emerald-600 text-white font-bold flex items-center gap-2" onClick={handleSubmit}>
                        <FaCheck />
                        Thêm sản phẩm
                    </button>
                </div>
                <div className="flex gap-4 w-full">
                    <div className="w-2/3 bg-slate-50 p-5">
                        <p className="font-medium text-xl mb-3">Thông tin chung</p>
                        <p>Tên sản phẩm</p>
                        <input
                            type="text"
                            name="tenSP"
                            placeholder="Tên sản phẩm"
                            required
                            className="mt-2 mb-5 bg-gray-100 w-full p-2 rounded-lg outline-none"
                            value={formData.tenSP}
                            onChange={(e) => setFormData(prev => ({ ...prev, tenSP: e.target.value }))}
                        />
                        <p>Mô tả sản phẩm</p>
                        <textarea
                            name="moTaSP"
                            placeholder="Mô tả sản phẩm"
                            className="mt-2 mb-3 bg-gray-100 w-full p-2 min-h-50 rounded-lg resize-none outline-none"
                            value={formData.moTaSP}
                            onChange={(e) => setFormData(prev => ({ ...prev, moTaSP: e.target.value }))}
                        ></textarea>
                        <div className="flex gap-5 items-center">
                            <p>Loại</p>
                            <div className="relative w-full">
                                <button
                                    className="cursor-pointer relative bg-gray-100 hover:bg-gray-200 w-full h-12 rounded-lg flex gap-2 items-center justify-between px-5"
                                    onClick={() => setChonLoai(!chonLoai)}
                                >
                                    {tenDanhMuc}  {/* Hiển thị tên danh mục đã chọn */}
                                    <IoIosArrowDropdownCircle />
                                </button>

                                {chonLoai && (
                                    <div className="absolute left-0 w-full bg-white shadow-lg rounded-lg p-2 z-50">
                                        <ul>
                                            {categories.length > 0 ? (
                                                categories.map((category, index) => (
                                                    <li
                                                        key={index}
                                                        className="text-black border-b border-gray-200 hover:bg-gray-100 p-2 cursor-pointer"
                                                        onClick={() => handleCategorySelect(category)}
                                                    >
                                                        {category.tenDM}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-gray-500 p-2">Không có danh mục nào</li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p>Phân loại</p>
                        {/* Danh sách phân loại */}
                        {formData.phanLoai.map((cert) => (
                            <div key={cert.id} className="mt-3 border p-4 rounded-lg mb-4 shadow-sm bg-gray-50">
                                <p className="text-lg font-semibold mb-2">Phân loại {formData.phanLoai.indexOf(cert) + 1}</p>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder="Tên Phân Loại"
                                        value={cert.tenLoai}
                                        onChange={(e) => xulyThaydoiPhanLoai(cert.id, "tenLoai", e.target.value)}
                                        className=" bg-gray-100 w-full p-2 rounded-lg outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Giá Loại (đ)"
                                        value={cert.giaLoai}
                                        onChange={(e) => xulyThaydoiPhanLoai(cert.id, "giaLoai", e.target.value)}
                                        className=" bg-gray-100 w-full p-2 rounded-lg outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Đơn Vị"
                                        value={cert.donVi}
                                        onChange={(e) => xulyThaydoiPhanLoai(cert.id, "donVi", e.target.value)}
                                        className=" bg-gray-100 w-full p-2 rounded-lg outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="% Khuyến Mãi"
                                        value={cert.khuyenMai}
                                        onChange={(e) => xulyThaydoiPhanLoai(cert.id, "khuyenMai", e.target.value)}
                                        className=" bg-gray-100 w-full p-2 rounded-lg outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Kho Hàng"
                                        value={cert.khoHang}
                                        onChange={(e) => xulyThaydoiPhanLoai(cert.id, "khoHang", e.target.value)}
                                        className=" bg-gray-100 w-full p-2 rounded-lg outline-none"
                                    />
                                    <button
                                        onClick={() => xoaPhanLoai(cert.id)}
                                        className="text-red-600 hover:underline text-sm"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                            ))}
                        <button
                            onClick={themPhanLoai}
                            className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                        >
                            + Thêm Phân Loại
                        </button>
                    </div>
                    <div className="w-1/3">
                        <div className="bg-slate-50 p-5">
                            <p className="font-medium text-xl mb-3">Tải hình ảnh lên</p>

                            <input type="file" accept="image/*" onChange={xulyChonFile} className="mt-2" />
                                {formData.image && (
                                    <div className="mt-3">
                                        <p>{formData.image.name}</p>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-2" onClick={xoaFile}>
                                            Xóa ảnh
                                        </button>
                                    </div>
                                )}
                        </div>
                        <div className="bg-slate-50 p-5 mt-5">
                            <p className="font-medium text-xl mb-3">Thông tin chi tiết</p>
                            <p>Nguồn gốc</p>
                            <input
                                type="text"
                                name="nguonGoc"
                                placeholder="Nguồn gốc"
                                required
                                className="mt-2 mb-5 bg-gray-100 w-full p-2 rounded-lg outline-none"
                                value={formData.nguonGoc}
                                onChange={(e) => setFormData(prev => ({ ...prev, nguonGoc: e.target.value }))}
                            />
                            <p>Danh sách chứng nhận</p>
                            {/* Danh sách chứng nhận */}
                            {formData.chungNhan.map((cert) => (
                                <div key={cert.id} className="mt-3 border p-4 rounded-lg mb-4 shadow-sm bg-gray-50">
                                    <p className="text-lg font-semibold mb-2">Chứng nhận {formData.chungNhan.indexOf(cert) + 1}</p>
                                    <input
                                        type="text"
                                        placeholder="Tên Chứng Nhận"
                                        value={cert.tenCN}
                                        onChange={(e) => xulyThaydoiChungnhan(cert.id, "tenCN", e.target.value)}
                                        className="mt-2 bg-gray-100 w-full p-2 rounded-lg outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Ngày Nhận Chứng Nhận"
                                        value={cert.ngayNhanCN}
                                        onChange={(e) => xulyThaydoiChungnhan(cert.id, "ngayNhanCN", e.target.value)}
                                        className="mt-2 bg-gray-100 w-full p-2 rounded-lg outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nơi Cấp Chứng Nhận"
                                        value={cert.noiCapCN}
                                        onChange={(e) => xulyThaydoiChungnhan(cert.id, "noiCapCN", e.target.value)}
                                        className="mt-2 mb-2 bg-gray-100 w-full p-2 rounded-lg outline-none"
                                    />
                                    <div className="relative w-full mb-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id={`file-upload-${cert.id}`}
                                            className="hidden"
                                            onChange={(e) => xulyThaydoiFileChungnhan(cert.id, e)}
                                        />
                                        <label
                                            htmlFor={`file-upload-${cert.id}`}
                                            className="w-full px-4 py-2 bg-pink-500 text-white text-center rounded-lg cursor-pointer hover:bg-pink-600"
                                        >
                                            Thêm Minh Chứng
                                        </label>
                                        {cert.anhCN && <p className="text-gray-700 text-sm mt-2">{cert.anhCN.name}</p>}
                                    </div>
                                    <button
                                        onClick={() => xoaChungNhan(cert.id)}
                                        className="text-red-600 hover:underline text-sm"
                                    >
                                        Xóa chứng nhận
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={themChungNhan}
                                className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                            >
                                + Thêm Chứng Nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default ProductsPageAdd;
