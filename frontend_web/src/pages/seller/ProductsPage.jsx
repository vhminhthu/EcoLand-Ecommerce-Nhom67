
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


    const laySanPham = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/sanpham/lay/theocuahang");
    
            console.log("Dữ liệu sản phẩm từ API:", response.data);
            setProducts(response.data.products || response.data); 
            console.log("Sản phẩm từ API:", response.data);

    
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
                trangThai: selectedProduct.trangThai,
                tenSP: selectedProduct.tenSP, 
            };
    
            if (image) {
                updatedProduct.dsAnhSP = image;
            }
    
        
            const response = await axios.patch(`/api/sanpham/sua/${selectedProduct._id}`, updatedProduct);
    
            
            setProducts(response.data.products); 
    
            console.log("Cập nhật thành công:", response.data);
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

    const [isEditing, setIsEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

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
                <div className="flex justify-between items-center !mb-4">
                    <input
                        type="text"
                        placeholder="Search in product"
                        className="border-2 border-[#E7E7E7] !px-4 !py-2 rounded-full !w-1/3 !outline-none focus:outline-none"
                    />
                    <div>
                        <button 
                            className="border-2 border-[#37906C] text-[#37906C] font-bold bg-white !px-8 !py-2 !mr-5 rounded-lg hover:bg-green-100 hover:border-green-700"
                            onClick={() => {
                                navigate(`/seller/products/add`);
                            }}
                            >
                            New product
                        </button>

                        <button className="bg-[#EAEAEA] text-gray-600 !px-7 !py-2 rounded-lg cursor-not-allowed">
                            Delete
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
                                <th className="!py-3 !px-4 text-left">Batch ID</th>
                                <th className="!py-3 !px-4 text-left">Giá</th>
                                <th className="!py-3 !px-4 text-left">Giảm</th>
                                <th className="!py-3 !px-4 text-left">Trạng Thái</th>
                                <th className="!py-3 !px-4 text-left">Edit</th>
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
        <td className="!py-3 !px-4">{product?.batchId || "Không có Batch ID"}</td>
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
                        : "bg-[#FFDAD6] text-[#FF451B]"
                }`}
            >
                {product?.trangThai === "Đang bán"
                    ? "● Đang mở bán"
                    : product?.trangThai === "Chờ xác nhận"
                    ? "● Đang chờ xác nhận"
                    : product?.trangThai === "Đã duyệt"
                    ? "● Đã duyệt"
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
                        Previous
                    </button>
                    <span className="text-lg font-semibold">
                        Page {currentPage} of {totalPages}
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
                        Next
                    </button>
                </div>
            </div>

            {isEditing && selectedProduct && (
                 <div className="fixed inset-0 flex items-center justify-center bg-gray-950/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] flex gap-6">
                <div className="w-1/2">
                <h2 className="text-lg font-semibold !mb-4">Edit Product</h2>
                
                <label className="block text-sm font-medium">Sản Phẩm</label>
                <input
                    type="text"
                    className="w-full border !p-2 rounded !mb-3"
                    value={selectedProduct.tenSP || ""}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, tenSP: e.target.value })}
                />

                
                <label className="block text-sm font-medium">Phân Loại</label>
                <select
                    className="w-full border !p-2 rounded !mb-3"
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
                
             
                 {selectedProduct.dsAnhSP && (
                    <div className="mb-2">
                        <img 
                            src={selectedProduct.dsAnhSP} 
                            alt="Current product image" 
                            className="w-full max-w-xs object-cover mb-2" 
                        />
                        <p className="text-sm text-gray-500">Ảnh hiện tại</p>
                    </div>
                )}

               
                <label className="block text-sm font-medium">Ảnh Sản Phẩm</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    className="w-full border !p-2 rounded !mb-3" 
                    onChange={handleImageChange} 
                />
                {image && <img src={image} alt="Preview" className="w-full mt-2" />}
                
                <label className="block text-sm font-medium">Mã</label>
                <input type="text" className="w-full border !p-2 rounded !mb-3" value={selectedPhanLoai?.idPL || ''} onChange={(e) => setSelectedPhanLoai({ ...selectedPhanLoai, idPL: e.target.value })} />
                
                <label className="block text-sm font-medium">Giá</label>
                <input type="text" className="w-full border !p-2 rounded !mb-3" value={selectedPhanLoai?.giaLoai || ''} onChange={(e) => setSelectedPhanLoai({ ...selectedPhanLoai, giaLoai: e.target.value })} />
                
                <label className="block text-sm font-medium">Giảm (%)</label>
                <input type="number" className="w-full border !p-2 rounded !mb-3" value={selectedPhanLoai?.khuyenMai || ''} onChange={(e) => setSelectedPhanLoai({ ...selectedPhanLoai, khuyenMai: e.target.value })} />
                
                <label className="block text-sm font-medium">BatchID</label>
                <input type="text" className="w-full border !p-2 rounded !mb-3" defaultValue={selectedProduct.batchId} />
                
                <label className="block text-sm font-medium">Trạng thái</label>
                <select className="w-full border !p-2 rounded mb-3" defaultValue={selectedProduct.trangThai}>
                    <option value="available">Available</option>
                    <option value="not-available">Not Available</option>
                </select>
                
                <div className="flex justify-end !gap-2 !mt-4">
                    <button className="!px-4 !py-2 bg-gray-300 rounded-lg" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button className="!px-4 !py-2 bg-[#224B35] text-white rounded-lg hover:bg-green-700" onClick={handleSave}>Save</button>
                </div>
                </div>
                </div>
                </div>
                    
)}

        </MainLayout>
    );
}

export default ProductsPage;
