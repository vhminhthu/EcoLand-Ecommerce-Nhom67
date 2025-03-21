import { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const sampleStores = [
  {
    _id: "1",
    tenCH: "Cửa hàng A",
    anhCH: "https://example.com/image1.jpg",
    moTaCH: "Chuyên cung cấp rau củ sạch",
    idNguoiDung: "user1",
    dsQuangCao: [],
    dsSanPham: [],
    diaChiCH: "Hà Nội",
    trangThaiCH: "Chờ xác nhận",
    nguyenNhanTC: "",
    emailCH: "cuahanga@example.com",
    soDienThoaiCH: "0123456789",
    thongTinThue: {
      loaiHinhKD: "Công ty TNHH",
      diaChiDK: "Hà Nội",
      emailHD: "hoadon@example.com",
      maSoThue: "1234567890"
    },
    thongTinDinhDanh: {
      loaiThe: "CMND",
      hinhChup: "https://example.com/id1.jpg",
      soDinhDanh: "123456789",
      hoVaTen: "Nguyễn Văn A"
    }
  },
  {
    _id: "2",
    tenCH: "Cửa hàng B",
    anhCH: "https://example.com/image2.jpg",
    moTaCH: "Chuyên cung cấp trái cây nhập khẩu",
    idNguoiDung: "user2",
    dsQuangCao: [],
    dsSanPham: [],
    diaChiCH: "TP. Hồ Chí Minh",
    trangThaiCH: "Chờ xác nhận",
    nguyenNhanTC: "",
    emailCH: "cuahangb@example.com",
    soDienThoaiCH: "0987654321",
    thongTinThue: {
      loaiHinhKD: "Hộ kinh doanh",
      diaChiDK: "TP. Hồ Chí Minh",
      emailHD: "hoadonb@example.com",
      maSoThue: "0987654321"
    },
    thongTinDinhDanh: {
      loaiThe: "CCCD",
      hinhChup: "https://example.com/id2.jpg",
      soDinhDanh: "987654321",
      hoVaTen: "Trần Thị B"
    }
  }
];

export const User = () => {
  const [stores, setStores] = useState(sampleStores);
  const [modalImage, setModalImage] = useState(null);

  const handleApprove = (storeId) => {
    setStores(stores.filter(store => store._id !== storeId));
  };

  const handleReject = (storeId) => {
    setStores(stores.filter(store => store._id !== storeId));
  };

  return (
    <div>
      <Navigation>
        <Header title="Quản lý cửa hàng" />
        <div className="!pt-16 !p-4">
          <h2 className="text-lg font-bold !mb-4">Danh sách cửa hàng cần duyệt</h2>
          <div className="max-h-[500px] overflow-y-auto !space-y-4 border border-gray-300 rounded-lg !p-2">
            {stores.map((store) => (
              <div key={store._id} className="bg-white border-2 border-emerald-800 rounded-lg shadow-lg !p-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-800">{store.tenCH}</h3>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Địa chỉ:</b>  {store.diaChiCH}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Mô tả:</b> {store.moTaCH}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Email:</b> {store.emailCH}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Số điện thoại:</b> {store.soDienThoaiCH}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Loại hình kinh doanh:</b> {store.thongTinThue.loaiHinhKD}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Mã số thuế:</b>{store.thongTinThue.maSoThue}</p>
                <p className="text-md text-gray-600"><b className="text-emerald-800">Thông tin định danh:</b> {store.thongTinDinhDanh.loaiThe} - {store.thongTinDinhDanh.soDinhDanh} ({store.thongTinDinhDanh.hoVaTen})</p>
                <p className="text-md text-gray-600">
                  <button onClick={() => setModalImage(store.anhCH)} className="text-blue-500 font-medium underline">
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
      </Navigation>
      {modalImage && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white !p-6 rounded-lg shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-600 text-xl" onClick={() => setModalImage(null)}>✖</button>
            <img src={modalImage} alt="Chứng nhận cửa hàng" className="max-w-full max-h-[80vh] rounded" />
          </div>
        </div>
      )}
    </div>
  );
};