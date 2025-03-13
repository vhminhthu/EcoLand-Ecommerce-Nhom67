import { useState, useEffect } from 'react';
import { FaRegCalendarAlt, FaTag, FaBarcode } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get(`/api/sanpham/lay/serial/${id}`); 
        setProduct(response.data.product); 
      } catch (err) {
        setError("Lỗi khi kết nối đến server");
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchProductInfo();
  }, [id]); 

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  if (!product) return <div>Không có sản phẩm</div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mt-12">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-green-800">{product.tenSP}</h1>
        <hr className="my-4 border-t-2 border-gray-300" />
      </div>

      <div className="space-y-6">
        <div className="text-gray-600 font-medium text-lg space-y-4">
          <p><strong className="font-semibold text-green-800">Mô tả:</strong> {product.moTaSP}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 text-gray-600 font-medium text-lg">
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Ngày sản xuất:</strong> {product.ngaySX}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Ngày thu hoạch:</strong> {product.ngayTH}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 text-gray-600 font-medium text-lg">
          <div className="flex items-center space-x-2">
            <FaBarcode className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Mã lô:</strong> {product.batchId}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTag className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Mã phân loại:</strong> {product.phanLoai?.[0]?.tenLoai || "Chưa phân loại"}</span>
          </div>
        </div>

        <div className="text-gray-600 font-medium text-lg space-y-4">
          <div className="flex items-center space-x-2">
            <span><strong className="font-semibold text-green-800">Danh mục:</strong> {product.idDM?.tenDM}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span><strong className="font-semibold text-green-800">Nguồn gốc:</strong> {product.nguonGoc}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span><strong className="font-semibold text-green-800">Sử dụng vật tư hỗ trợ canh tác:</strong> {product.VatTuHTCT}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
