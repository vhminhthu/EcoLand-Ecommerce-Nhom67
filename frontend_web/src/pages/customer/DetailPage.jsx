
import { FaRegCalendarAlt, FaTag, FaBarcode } from 'react-icons/fa';

export const DetailPage = () => {
  const product = {
    name: "Sản phẩm A",
    description: "Mô tả chi tiết về sản phẩm A, được sản xuất với quy trình hiện đại và đạt tiêu chuẩn chất lượng cao.",
    productionDate: "01/01/2025",
    harvestDate: "15/01/2025",
    lotCode: "12345",
    classificationCode: "ABC123",
    category: "Nông sản",
    origin: "Việt Nam",
    supportMaterial: "Phân bón hữu cơ, thuốc trừ sâu tự nhiên",
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mt-12">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-green-800">{product.name}</h1>
        <hr className="my-4 border-t-2 border-gray-300" />
      </div>

      <div className="space-y-6">
        <div className="text-gray-600 font-medium text-lg space-y-4">
          <p><strong className="font-semibold text-green-800">Mô tả:</strong> {product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 text-gray-600 font-medium text-lg">
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Ngày sản xuất:</strong> {product.productionDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Ngày thu hoạch:</strong> {product.harvestDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 text-gray-600 font-medium text-lg">
          <div className="flex items-center space-x-2">
            <FaBarcode className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Mã lô:</strong> {product.lotCode}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTag className="text-green-800" />
            <span><strong className="font-semibold text-green-800">Mã phân loại:</strong> {product.classificationCode}</span>
          </div>
        </div>

        <div className="text-gray-600 font-medium text-lg space-y-4">
          <div className="flex items-center space-x-2">
      
            <span><strong className="font-semibold ">Danh mục:</strong> {product.category}</span>
          </div>
          <div className="flex items-center space-x-2">
      
            <span><strong className="font-semibold ">Nguồn gốc:</strong> {product.origin}</span>
          </div>
          <div className="flex items-center space-x-2">
      
            <span><strong className="font-semibold ">Sử dụng vật tư hỗ trợ canh tác:</strong> {product.supportMaterial}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
