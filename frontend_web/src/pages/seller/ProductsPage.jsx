
import { useState } from "react";
import MainLayout from "../../layouts/seller/MainLayout";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
    const navigate = useNavigate();
    const products = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: "Tam’s rice",
        category: "Rices",
        stock: "12 tons",
        price: "18.000đ",
        salesOff: "30%",
        status: i % 5 === 0 ? "not-available" : "available",
    }));

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
        setIsEditing(true);
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
                <div className="overflow-x-auto">
                    <table className="!w-full border-collapse">
                        <thead>
                            <tr className="bg-[#1B8057] text-white ">
                                <th className="!py-3 !px-4 text-left">Product</th>
                                <th className="!py-3 !px-4 text-left">Category</th>
                                <th className="!py-3 !px-4 text-left">Stock</th>
                                <th className="!py-3 !px-4 text-left">Price</th>
                                <th className="!py-3 !px-4 text-left">Sales off</th>
                                <th className="!py-3 !px-4 text-left">Status</th>
                                <th className="!py-3 !px-4 text-left">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedProducts.map((product) => (
                                <tr key={product.id} className="border-b !h-16">
                                    <td className="!py-3 !px-4 font-bold flex items-center">
                                        <input type="checkbox" className="!mr-3" />
                                        <img
                                            src="https://i.pinimg.com/474x/fc/03/35/fc03352bd1535768421b9d38a434da2f.jpg"
                                            alt="Rice"
                                            className="!w-15 !h-15 rounded-full !mr-3"
                                        />
                                        {product.name}
                                    </td>
                                    <td className="!py-3 !px-4">{product.category}</td>
                                    <td className="!py-3 !px-4">{product.stock}</td>
                                    <td className="!py-3 !px-4">{product.price}</td>
                                    <td className="!py-3 !px-4">{product.salesOff}</td>
                                    <td className="!py-3 !px-4">
                                        <span
                                            className={`!px-3 !py-3 rounded-lg text-sm font-semibold ${
                                                product.status === "available"
                                                    ? "bg-[#E2FCF2] text-[#158624]"
                                                    : "bg-[#FFDAD6] text-[#FF451B]"
                                            }`}
                                        >
                                            {product.status === "available"
                                                ? "● Available for sale"
                                                : "● Not available"}
                                        </span>
                                    </td>
                                    <td className="!py-3 !px-4 text-center">
                                        <button
                                            className="text-[#adadad]"
                                            onClick={() => openEditDialog(product)}
                                        >
                                            <FaEdit size={22} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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
    <div className="fixed !inset-0 flex items-center justify-center bg-gray-950/50">
        <div className="bg-white !p-6 rounded-lg shadow-lg !w-[600px] flex !gap-6">
            <div className="!w-1/2 flex flex-col items-center">
                <h3 className="text-sm font-medium !mb-2">Product Image</h3>
                <div className="relative !w-60 !h-80 border rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                        src={selectedProduct.image || "https://via.placeholder.com/150"}
                        alt="Product"
                        className="w-full h-full object-cover"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                <p className="text-xs text-gray-500 !mt-2">Click to change image</p>
            </div>

            <div className="!w-1/2">
                <h2 className="text-lg font-semibold !mb-4">Edit Product</h2>

                
                <label className="block text-sm font-medium">Product Name</label>
                <input
                    type="text"
                    className="!w-full border !p-2 rounded !mb-3"
                    defaultValue={selectedProduct.name}
                />

                <label className="block text-sm font-medium">Price</label>
                <input
                    type="text"
                    className="w-full border !p-2 rounded !mb-3"
                    defaultValue={selectedProduct.price}
                />

                <label className="block text-sm font-medium">Sales Off (%)</label>
                <input
                    type="number"
                    className="w-full border !p-2 rounded !mb-3"
                    defaultValue={selectedProduct.salesOff}
                />

                <label className="block text-sm font-medium">Status</label>
                <select className="w-full border !p-2 rounded !mb-3" defaultValue={selectedProduct.status}>
                    <option value="available">Available</option>
                    <option value="not-available">Not Available</option>
                </select>

                <div className="flex justify-end !gap-2 !mt-4">
                    <button
                        className="!px-4 !py-2 bg-gray-300 rounded-lg"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                    <button className="!px-4 !py-2 bg-[#224B35] text-white rounded-lg hover:bg-green-700">
                        Save
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
