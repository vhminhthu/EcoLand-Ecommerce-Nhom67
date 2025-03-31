import { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { useEffect } from "react";
import axios from "axios";

export const User = () => {
  const [modalImage, setModalImage] = useState(null);
  const [cccd, setCCCD] = useState(null);

  const [shopTatCa, setShopTatCa] = useState(null);
  const [shopChoXacNhan, setShopChoXacNhan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const [res0, res1] = await Promise.all([
              axios.get('/api/cuahang/cuahang-choxacnhan'),
              axios.get('/api/cuahang/laytatca/admin'),

          ]);
          setShopChoXacNhan(res0.data);
          setShopTatCa(res1.data);
      } catch (err) {
          setError(err);
      } finally {
          setLoading(false);
      }
  };

    fetchData();
  }, []);

  const handleApprove = async (storeId) => {
    try {
      await axios.patch(`/api/cuahang/update-status/${storeId}`, {
          trangThai: "Mở cửa",
          nguyenNhanTC: "Không",
      });

      alert("Cửa hàng đã được xác nhận thành công!");
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert(err.response.message);
      } else {
          setError(err);
      }
    }
};

const handleReject = async (storeId) => {
    const nguyenNhanTC = prompt("Vui lòng nhập nguyên nhân từ chối:");
    if (!nguyenNhanTC) {
        alert("Bạn phải nhập nguyên nhân từ chối!");
        return;
    }
    try {
        await axios.patch(`/api/cuahang/update-status/${storeId}`, {
            trangThai: "Từ chối",
            nguyenNhanTC: nguyenNhanTC,
        });

        alert("Cửa hàng đã bị từ chối!");
        window.location.reload();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert(err.response.message);
      } else {
          setError(err);
      }
    }
};


  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;
  
  return (
    <div>
      <Navigation>
        <Header title="Quản lý cửa hàng" />
        <div className="!pt-16 !p-4">
          <h2 className="text-2xl font-bold !mb-4">Danh sách cửa hàng cần duyệt</h2>
          <div className="max-h-[500px] grid grid-cols-2 gap-5 overflow-y-auto !space-y-4 border border-gray-300 rounded-lg !p-2">
            {shopChoXacNhan.map((store) => (
              <div key={store._id} className="h-full bg-white border-2 border-emerald-800 rounded-lg shadow-lg !p-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-800">{store.tenCH}</h3>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Địa chỉ:</b>  {store.diaChiCH}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Email:</b> {store.emailCH}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Số điện thoại:</b> {store.soDienThoaiCH}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Loại hình kinh doanh:</b> {store.thongTinThue.loaiHinhKD}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Mã số thuế:</b>{store.thongTinThue.maSoThue}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Địa chỉ đăng ký:</b>{store.thongTinThue.diaChiDK}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Thông tin định danh:</b> {store.thongTinDinhDanh.loaiThe} - {store.thongTinDinhDanh.soDinhDanh} ({store.thongTinDinhDanh.hoVaTen})</p>
                <p className="text-md text-gray-600">
                  <button onClick={() => setCCCD(store.thongTinDinhDanh.hinhChup)} className="text-blue-500 font-medium underline">
                    Xem ảnh CCCD
                  </button>
                </p>
                <p className="text-md text-gray-600">
                  <button onClick={() => setModalImage(`https://gateway.pinata.cloud/ipfs/${store.cidChungNhan}`)} className="text-blue-500 font-medium underline">
                    Xem chứng nhận
                  </button>
                </p>
                <div className="flex gap-3">
                  <button className="bg-green-500 text-white !px-5 !py-2 rounded-lg shadow-md hover:bg-green-600" onClick={() => handleApprove(store._id)}>
                    Duyệt
                  </button>
                  <button className="bg-emerald-950 text-white !px-5 !py-2 rounded-lg shadow-md hover:bg-red-600" onClick={() => handleReject(store._id)}>
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="!p-6">
          <h2 className="text-2xl font-bold !mb-4">Danh sách cửa hàng</h2>
          <div className="overflow-y-auto max-h-[700px]">
            <table className="w-full border border-emerald-900">
              <thead>
                <tr className="bg-emerald-800 text-white">
                  <th className="border !p-3">Tên cửa hàng</th>
                  <th className="border !p-3">Email</th>
                  <th className="border !p-3">Số điện thoại</th>
                  <th className="border !p-3">Trạng thái</th>
                  <th className="border !p-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {shopTatCa.map((store) => (
                  <tr key={store._id} className="text-center bg-white">
                    <td className="border !p-3">{store.tenCH}</td>
                    <td className="border !p-3">{store.emailCH}</td>
                    <td className="border !p-3">{store.soDienThoaiCH}</td>
                    <td className="border !p-3">{store.trangThaiCH}</td>
                    <td className="border !p-3">
                      <button 
                        className="bg-blue-500 text-white !px-3 !py-1 rounded hover:bg-blue-600"
                        onClick={() => setSelectedStore(store)}
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Navigation>

      {selectedStore && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700/50 bg-opacity-50">
          <div className="bg-white !p-6 rounded-lg shadow-lg relative max-w-xl w-full">
            <button className="absolute top-2 right-2 text-gray-600 text-xl" onClick={() => setSelectedStore(null)}>✖</button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin chi tiết</h2>
            <p><b className="text-emerald-800">Tên cửa hàng:</b> {selectedStore.tenCH}</p>
            <p><b className="text-emerald-800">Mô tả:</b> {selectedStore.moTaCH}</p>
            <p><b className="text-emerald-800">Địa chỉ:</b> {selectedStore.diaChiCH}</p>
            <p><b className="text-emerald-800">Email:</b> {selectedStore.emailCH}</p>
            <p><b className="text-emerald-800">Số điện thoại:</b> {selectedStore.soDienThoaiCH}</p>
            <p><b className="text-emerald-800">Loại hình kinh doanh:</b> {selectedStore.thongTinThue.loaiHinhKD}</p>
            <p><b className="text-emerald-800">Mã số thuế:</b> {selectedStore.thongTinThue.maSoThue}</p>
            <p><b className="text-emerald-800">Địa chỉ đăng ký:</b> {selectedStore.thongTinThue.diaChiDK}</p>
            <p><b className="text-emerald-800">Thông tin định danh:</b> {selectedStore.thongTinDinhDanh.loaiThe} - {selectedStore.thongTinDinhDanh.soDinhDanh} ({selectedStore.thongTinDinhDanh.hoVaTen})</p>
            {selectedStore.thongTinDinhDanh.hinhChup && (
              <p>
                <button onClick={() => setCCCD(selectedStore.thongTinDinhDanh.hinhChup)} className="text-blue-500 font-medium underline">
                  Xem ảnh CCCD
                </button>
              </p>
            )}
            {selectedStore.cidChungNhan && (
              <p>
                <button onClick={() => setModalImage(`https://gateway.pinata.cloud/ipfs/${selectedStore.cidChungNhan}`)} className="text-blue-500 font-medium underline">
                  Xem chứng nhận
                </button>
              </p>
            )}
          </div>
        </div>
      )}
      {modalImage && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white !p-6 rounded-lg shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-600 text-xl" onClick={() => setModalImage(null)}>✖</button>
            <img src={modalImage} alt="Chứng nhận cửa hàng" className="max-w-full max-h-[80vh] rounded" />
          </div>
        </div>
      )}
      {cccd && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white !p-6 rounded-lg shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-600 text-xl" onClick={() => setCCCD(null)}>✖</button>
            <img src={cccd} alt="Chứng nhận cửa hàng" className="max-w-full max-h-[80vh] rounded" />
          </div>
        </div>
      )}
    </div>
  );
};