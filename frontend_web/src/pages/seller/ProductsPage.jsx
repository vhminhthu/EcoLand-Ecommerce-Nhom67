
import { useState , useEffect} from "react";
import MainLayout from "../../layouts/seller/MainLayout";
import { FaEdit,FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductsPage() {
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [selectedPhanLoai, setSelectedPhanLoai] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [trangThai, setTrangThai] = useState(selectedProduct?.trangThai || "");

    const laySanPham = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/sanpham/lay/theocuahang");
            setProducts(response.data.products || response.data); 
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
            setError("Lỗi khi lấy dữ liệu, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        laySanPham();
    }, []);
    

    const handleSave = async () => {
        if (!selectedProduct || !selectedPhanLoai) return;
        try {
            const updatedProduct = {
                phanLoai: selectedProduct.phanLoai.map((pl) =>
                    pl.idPL === selectedPhanLoai.idPL
                        ? {
                            ...pl,
                            giaLoai: selectedPhanLoai.giaLoai !== undefined ? selectedPhanLoai.giaLoai : pl.giaLoai,
                            khuyenMai: selectedPhanLoai.khuyenMai !== undefined ? selectedPhanLoai.khuyenMai : pl.khuyenMai
                        }
                        : pl
                ),
                trangThai,
                tenSP: selectedProduct.tenSP, 
            };
            if (image) {
                updatedProduct.dsAnhSP = image;
            }
            const response = await axios.patch(`/api/sanpham/sua/${selectedProduct._id}`, updatedProduct);
            setProducts(response.data.products); 
            setIsEditing(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            alert("Cập nhật thất bại!");
        }
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };
    
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const displayedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const openEditDialog = (product) => {
        setSelectedProduct(product);
        setSelectedPhanLoai(product.phanLoai[0]);  
        setImage(product.dsAnhSP || ""); 
        setIsEditing(true);

    };

    useEffect(() => {
        console.log("Selected product khi edit (sau khi cập nhật state):", selectedProduct);
        console.log("dsAnhSP:", selectedProduct?.dsAnhSP);
    }, [selectedProduct]);
    

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) return;
    
        try {
            const response = await axios.delete(`/api/sanpham/delete/${productId}`);
            
            if (response.status === 200) {
                alert("Xoá sản phẩm thành công!");
                setProducts((prevProducts) => prevProducts.filter(p => p._id !== productId));
            } else {
                alert("Lỗi khi xoá sản phẩm!");
            }
        } catch (error) {
            console.error("Lỗi khi xoá sản phẩm:", error);
            alert("Không thể xoá sản phẩm!");
        }
    };

    

    return (
        <MainLayout>
            <div className="bg-white !p-6 rounded-lg shadow-md min-h-screen !pb-10">
                <div className="flex justify-end items-center !mb-4">
                    <div>
                        <button 
                            className="cursor-pointer border-2 border-[#37906C] text-[#37906C] font-bold bg-white !px-8 !py-2 !mr-5 rounded-lg hover:bg-green-100 hover:border-green-700"
                            onClick={() => {
                                navigate(`/seller/products/add`);
                            }}
                            >
                            Thêm sản phẩm 
                        </button>

                        <button className="bg-[#EAEAEA] text-gray-600 !px-7 !py-2 rounded-lg cursor-not-allowed">
                            Xóa 
                        </button>
                    </div>
                </div>

                {/* Bảng sản phẩm */}
                {loading ? (
                <div className="text-center text-gray-500 text-lg py-6"> Đang tải dữ liệu...</div>
            ) : error ? (
                <div className="text-center text-red-500 text-lg py-6">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="!w-full border-collapse">
                        <thead>
                            <tr className="bg-[#1B8057] text-white ">
                                <th className="!py-3 !px-4 text-left">Sản phẩm</th>
                                <th className="!py-3 !px-4 text-left">Phân loại</th>
                                <th className="!py-3 !px-4 text-left">Giá</th>
                                <th className="!py-3 !px-4 text-left">Giảm</th>
                                <th className="!py-3 !px-4 text-left">Trạng Thái</th>
                                <th className="!py-3 !px-4 text-left">Sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                        {displayedProducts?.map((product) => (
    <tr key={product?._id || Math.random()} className="border-b !h-16">
        <td className="!py-3 !px-4 font-bold flex items-center">
            <input type="checkbox" className="!mr-3" />
            {product?.dsAnhSP && (
                <img
                    src={product.dsAnhSP}
                    alt={product?.tenSP || "Không có tên"}
                    className="!w-15 !h-15 rounded-full !mr-3"
                />
            )}
            {product?.tenSP || "Không có tên sản phẩm"}
        </td>
        <td className="!py-3 !px-4">
            {product?.phanLoai?.length > 0 ? (
                product.phanLoai.map((phanLoai) => (
                    <div key={`${phanLoai?.tenLoai}-${phanLoai?.idPL}`} className="grid grid-cols-2">
                        <span>{phanLoai?.tenLoai || "Không có tên loại"}</span>
                        <span className="text-gray-500">{phanLoai?.idPL || "Không có ID"}</span>
                    </div>
                ))
            ) : (
                <span className="text-gray-500">Không có phân loại</span>
            )}
        </td>
        <td className="!py-3 !px-4">
            {product?.phanLoai?.map((phanLoai) => (
                <div key={`${phanLoai?.tenLoai}-${phanLoai?.idPL}`} className="flex justify-between">
                    <span>{phanLoai?.giaLoai || "Không có giá"}</span>
                </div>
            )) || <span className="text-gray-500">Không có giá</span>}
        </td>
        <td className="!py-3 !px-4">
            {product?.phanLoai?.map((phanLoai) => (
                <div key={`${phanLoai?.tenLoai}-${phanLoai?.idPL}`} className="flex justify-between">
                    <span className="font-semibold text-[#728CFF]">{phanLoai?.khuyenMai || 0}%</span>
                </div>
            )) || <span className="text-gray-500">Không có khuyến mãi</span>}
        </td>
        <td className="!py-3 !px-4">
            <span
                className={`!px-3 !py-3 rounded-lg text-sm font-semibold ${
                    product?.trangThai === "Đang bán"
                        ? "bg-[#E2FCF2] text-[#158624]"
                        : product?.trangThai === "Chờ xác nhận"
                        ? "bg-[#FFF4CC] text-[#C59100]"
                        : product?.trangThai === "Đã duyệt"
                        ? "bg-[#D6E4FF] text-[#0052CC]"
                        : product?.trangThai === "Hết hàng"
                        ? "bg-fuchsia-100 text-fuchsia-800"
                        : "bg-[#FFDAD6] text-[#FF451B]"
                }`}
            >
                {product?.trangThai === "Đang bán"
                    ? "● Đang mở bán"
                    : product?.trangThai === "Chờ xác nhận"
                    ? "● Đang chờ xác nhận"
                    : product?.trangThai === "Đã duyệt"
                    ? "● Đã duyệt"
                    : product?.trangThai === "Hết hàng"
                    ? "● Hết hàng"
                    : "● Từ chối"}
            </span>
        </td>
        <td className="!py-3 !px-4 text-center flex items-center justify-center gap-2">
            {product?.trangThai === "Từ chối" ? (
                <>
                    <button 
                        className="text-[#FF451B] font-semibold underline hover:text-[#d43b15]"
                        onClick={() => alert(`Nguyên nhân từ chối: ${product?.nguyenNhanTC || "Không có thông tin"}`)}
                    >
                        Chi tiết
                    </button>

                    <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteProduct(product?._id)}
                    >
                        <FaTrash size={22} />
                    </button>
                </>
            ) : (
                <button 
                    className="text-[#adadad]"
                    onClick={() => product && openEditDialog(product)}
                >
                    <FaEdit size={22} />
                </button>
            )}

        </td>
    </tr>
))}

                        </tbody>
                    </table>
                </div>
)}


                {/* PHÂN TRANG */}
                <div className="flex justify-center items-center !mt-6">
                    <button
                        className={`!px-4 !py-2 !mr-4 rounded-lg ${
                            currentPage === 1
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-[#1B8057] text-white hover:bg-green-700"
                        }`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>
                    <span className="text-lg font-semibold">
                        Trang {currentPage} trong tổng {totalPages}
                    </span>
                    <button
                        className={`!px-4 !py-2 !ml-4 rounded-lg ${
                            currentPage === totalPages
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-[#1B8057] text-white hover:bg-green-700"
                        }`}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </button>
                </div>
            </div>

            {isEditing && selectedProduct && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] max-w-full flex gap-6">
            
            {/* Bên trái: Hình ảnh sản phẩm */}
            <div className="w-1/3 flex flex-col items-center gap-4">
                <img 
                    src={image || selectedProduct.dsAnhSP || "https://via.placeholder.com/150"} 
                    alt="Ảnh sản phẩm" 
                    className="w-32 h-32 object-cover rounded-md shadow-md border"
                />
                <p className="text-xs text-gray-500">{image ? "Ảnh mới" : "Ảnh hiện tại"}</p>

                {/* Chỉ cho chỉnh ảnh nếu trạng thái là "Chờ xác nhận" */}
                {selectedProduct?.trangThai === "Chờ xác nhận" && (
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="w-full border rounded-md p-2 focus:ring focus:ring-emerald-400 text-sm"
                        onChange={handleImageChange} 
                    />
                )}
            </div>

            {/* Bên phải: Form chỉnh sửa sản phẩm */}
            <div className="w-2/3 flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Chỉnh sửa sản phẩm</h2>

                {/* Tên sản phẩm - Chỉ chỉnh khi chờ xác nhận */}
                {selectedProduct.trangThai === "Chờ xác nhận" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Tên sản phẩm</label>
                        <input
                            type="text"
                            className="w-full border rounded-md p-2 focus:ring focus:ring-emerald-400"
                            value={selectedProduct.tenSP || ""}
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, tenSP: e.target.value })}
                        />
                    </div>
                )}

                {/* Phân loại - Chỉ chỉnh khi chờ xác nhận */}
                {selectedProduct.trangThai === "Chờ xác nhận" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Phân loại</label>
                        <select
                            className="w-full border rounded-md p-2 focus:ring focus:ring-emerald-400"
                            value={selectedPhanLoai?.tenLoai || ''}
                            onChange={(e) => {
                                const selected = selectedProduct.phanLoai.find(pl => pl.tenLoai === e.target.value);
                                setSelectedPhanLoai(selected);
                            }}
                        >
                            {selectedProduct.phanLoai.map((phanLoai, index) => (
                                <option key={index} value={phanLoai.tenLoai}>{phanLoai.tenLoai}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Thông tin khác - Chỉ hiển thị khi trạng thái là "Chờ xác nhận" */}
                {selectedProduct.trangThai === "Chờ xác nhận" && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Mã</label>
                            <input 
                                type="text" 
                                className="w-full border rounded-md p-2 focus:ring focus:ring-emerald-400" 
                                value={selectedPhanLoai?.idPL || ''} 
                                onChange={(e) => setSelectedPhanLoai({ ...selectedPhanLoai, idPL: e.target.value })} 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Giá</label>
                            <input 
                                type="text" 
                                className="w-full border rounded-md p-2 focus:ring focus:ring-emerald-400" 
                                value={selectedPhanLoai?.giaLoai || ''} 
                                onChange={(e) => setSelectedPhanLoai({ ...selectedPhanLoai, giaLoai: e.target.value })} 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Giảm giá (%)</label>
                            <input 
                                type="number" 
                                className="w-full border rounded-md p-2 focus:ring focus:ring-emerald-400" 
                                value={selectedPhanLoai?.khuyenMai || ''} 
                                onChange={(e) => setSelectedPhanLoai({ ...selectedPhanLoai, khuyenMai: e.target.value })} 
                            />
                        </div>
                    </div>
                )}

                {/* Trạng thái sản phẩm */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Trạng thái</label>
                    <select 
                        className="w-full border rounded-md p-2 focus:ring focus:ring-emerald-400" 
                        value={trangThai} 
                        onChange={(e) => setTrangThai(e.target.value)}
                    >   
                        {selectedProduct.trangThai === "Đã duyệt" ? (
                            <>
                                <option value="Đang bán">Đang bán</option>
                                <option value="Hết hàng">Hết hàng</option>
                            </>
                        ) : selectedProduct.trangThai === "Đang bán" ? (
                            <option value="Hết hàng">Hết hàng</option>
                        ) : (
                            <option value="Hết hàng">Hết hàng</option>
                        )}
                    </select>
                </div>

                {/* Nút hành động */}
                <div className="flex justify-end gap-2 mt-4">
                    <button 
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        onClick={() => setIsEditing(false)}
                    >
                        Hủy
                    </button>
                    <button 
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                        onClick={handleSave}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    </div>
)}



        </MainLayout>
    );
}

export default ProductsPage;
