import { useState } from "react";
import MainLayout from "../../layouts/seller/MainLayout";

const steps = ["Nhập thông tin cơ bản", "Nhập loại giống & vật tư", "Nhập ngày thu hoạch","Nhập ngày đóng gói", "Hoàn thành"];

const mockData = [
  {
    id: 1,
    name: "Lúa mùa",
    plantingDate: "2025-04-01",
    seedType: "OM5451",
    fertilizer: "NPK 16-16-8",
    pesticide: "Regent 800WG",
    harvestDate: "2025-09-20",
    harvestQuantity: 200,
    packagingDate:"2025-03-02",
    expirationDate:"2025-09-10"
  },
  {
    id: 2,
    name: "Ngô lai",
    plantingDate: "2025-03-15",
    seedType: "DK6919",
    fertilizer: "Urê + Kali",
    pesticide: "Confidor 100SL",
    harvestDate: "2025-08-10",
    harvestQuantity:300,
    packagingDate:"2025-01-04",
    expirationDate:"2025-09-10"
  }
];

const ProductTracking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleSelectProduct = (product) => {
    setFormData(product);
    setSelectedProduct(product.id);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6 flex justify-center min-h-screen">
        {!selectedProduct ? (
         <div className="min-w-[1350px]">
         <h2 className="text-2xl font-bold mb-4">Danh sách nông sản</h2>
         <div className=" rounded-lg overflow-hidden">
           <div className="text-xl grid grid-cols-3 bg-green-700 text-white p-3">
             <div className="text-center">Tên cây</div>
             <div className="text-center">Ngày gieo trồng</div>
             <div className="text-center">Ngày thu hoạch</div>
           </div>
           {mockData.map((product) => (
             <div
               key={product.id}
               className="text-lg bg-white grid grid-cols-3 p-5 border-b hover:bg-gray-100 cursor-pointer"
               onClick={() => handleSelectProduct(product)}
             >
               <div className="text-center font-semibold">{product.name}</div>
               <div className="text-center">{product.plantingDate}</div>
               <div className="text-center">{product.harvestDate}</div>
             </div>
           ))}
         </div>
       </div>       
        ) : (
            <div>
            <div className="flex space-x-9 mb-5">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex-auto min-w-[230px] text-center py-4 px-6 rounded-lg text-white font-semibold ${
                    currentStep === index ? "bg-green-600" : "bg-gray-400"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          
            <div className="bg-white p-6 rounded-lg shadow-md min-w-5xl">
              {currentStep === 0 && (
               <div className="p-6">
               <h2 className="text-xl font-semibold mb-6">Nhập thông tin cơ bản</h2>
               <div className="grid grid-cols-1 gap-4">
                 
                 {/* Tên cây trồng */}
                 <div>
                   <label className="block font-medium mb-1">Tên cây trồng</label>
                   <input
                     type="text"
                     placeholder="Nhập tên cây trồng"
                     className="w-full p-3 border rounded"
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   />
                 </div>
             
                 {/* Loại giống */}
                 <div>
                   <label className="block font-medium mb-1">Loại giống</label>
                   <input
                     type="text"
                     placeholder="Nhập loại giống"
                     className="w-full p-3 border rounded"
                     value={formData.seedType}
                     onChange={(e) => setFormData({ ...formData, seedType: e.target.value })}
                   />
                 </div>
             
                 {/* Ngày gieo trồng */}
                 <div>
                   <label className="block font-medium mb-1">Ngày gieo trồng</label>
                   <input
                     type="date"
                     className="w-full p-3 border rounded"
                     value={formData.plantingDate}
                     onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                   />
                 </div>
                 
               </div>
             </div>             
              )}
          
              {currentStep === 1 && (
           <div>
            <h2 className="text-xl font-bold mb-4">Nhập loại phân bón & vật tư</h2>
            <div className="grid grid-cols-1 gap-4">
          
              {/* Loại phân bón */}
              <div>
                <label className="block font-medium mb-1">Loại phân bón</label>
                <input
                  type="text"
                  placeholder="Nhập loại phân bón"
                  className="w-full p-3 border rounded"
                  value={formData.fertilizer}
                  onChange={(e) => setFormData({ ...formData, fertilizer: e.target.value })}
                />
              </div>
          
              {/* Ngày bón phân */}
              <div>
                <label className="block font-medium mb-1">Ngày bón phân</label>
                <input
                  type="date"
                  className="w-full p-3 border rounded"
                  value={formData.fertilizingDate}
                  onChange={(e) => setFormData({ ...formData, fertilizingDate: e.target.value })}
                />
              </div>
          
              {/* Thuốc bảo vệ thực vật */}
              <div>
                <label className="block font-medium mb-1">Thuốc bảo vệ thực vật</label>
                <input
                  type="text"
                  placeholder="Nhập tên thuốc bảo vệ thực vật"
                  className="w-full p-3 border rounded"
                  value={formData.pesticide}
                  onChange={(e) => setFormData({ ...formData, pesticide: e.target.value })}
                />
              </div>
          
              {/* Ngày phun thuốc */}
              <div>
                <label className="block font-medium mb-1">Ngày phun thuốc</label>
                <input
                  type="date"
                  className="w-full p-3 border rounded"
                  value={formData.sprayingDate}
                  onChange={(e) => setFormData({ ...formData, sprayingDate: e.target.value })}
                />
              </div>
          
            </div>
            </div>     
              )}
          
              {currentStep === 2 && (
              <div className="p-10">
              <h2 className="text-2xl font-semibold mb-10">Nhập thông tin thu hoạch</h2>
              <div className="grid grid-cols-1 gap-4">
            
                {/* Ngày thu hoạch */}
                <div>
                  <label className="block font-medium mb-4">Ngày thu hoạch</label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded"
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                  />
                </div>
            
                {/* Số lượng thu hoạch */}
                <div>
                  <label className="block font-medium mb-4">Số lượng thu hoạch (kg)</label>
                  <input
                    type="number"
                    placeholder="Nhập số lượng thu hoạch"
                    className="w-full p-3 border rounded"
                    value={formData.harvestQuantity}
                    onChange={(e) => setFormData({ ...formData, harvestQuantity: e.target.value })}
                  />
                </div>
            
              </div>
            </div>            
              )}

              {currentStep === 3 && (
              <div className="p-10">
              <h2 className="text-2xl font-semibold mb-10">Nhập thông tin đóng gói</h2>
              <div className="grid grid-cols-1 gap-4">
            
                {/* Ngày đóng gói */}
                <div>
                  <label className="block font-medium mb-4">Ngày đóng gói </label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded"
                    value={formData.packagingDate}
                    onChange={(e) => setFormData({ ...formData, packagingDate: e.target.value })}
                  />
                </div>
            
                {/* Hạn sử dụng */}
                <div>
                  <label className="block font-medium mb-4">Hạn sử dụng</label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                  />
                </div>
            
              </div>
            </div>            
              )}
          
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-5">Hoàn thành</h2>
                  <p className="mb-2"><strong className="text-emerald-800">Cây trồng:</strong> {formData.name}</p>
                  <p className="mb-2"><strong className="text-emerald-800">Ngày gieo trồng:</strong> {formData.plantingDate}</p>
                  <p className="mb-2"><strong className="text-emerald-800">Giống:</strong> {formData.seedType}</p>
                  <p className="mb-2"><strong className="text-emerald-800">Phân bón:</strong> {formData.fertilizer}</p>
                  <p className="mb-2"><strong className="text-emerald-800">Thuốc:</strong> {formData.pesticide}</p>
                  <p className="mb-2"><strong className="text-emerald-800">Ngày thu hoạch:</strong> {formData.harvestDate}</p>
                  <p className="mb-2"><strong className="text-emerald-800">Số lượng thu hoạch:</strong> {formData.harvestQuantity}</p>
                  <p className="mb-2"><strong className="text-emerald-800">Ngày đóng gói:</strong> {formData.packagingDate}</p>
                  <p className="mb-2"><strong className="text-emerald-800">Hạn sử dụng:</strong> {formData.expirationDate}</p>
                </div>
              )}
            </div>
          
            <div className="flex justify-between mt-4">
              {currentStep > 0 && (
                <button onClick={handlePrev} className="bg-gray-500 text-white py-2 px-4 rounded">
                  Quay lại
                </button>
              )}
              {currentStep < steps.length - 1 && (
                <button onClick={handleNext} className="bg-green-600 text-white py-2 px-4 rounded">
                  Tiếp tục
                </button>
              )}
              {currentStep === steps.length - 1 && (
                <button onClick={() => setSelectedProduct(null)} className="bg-red-600 text-white py-2 px-4 rounded">
                  Quay lại danh sách
                </button>
              )}
            </div>
          </div>
          
        )}
      </div>
    </MainLayout>
  );
};

export default ProductTracking;