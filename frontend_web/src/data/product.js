const product = {
    _id: "65a123456789abcd12345678",
    tenSP: "Rau Xà Lách Nhà Trồng",
    moTaSP: "Rau xà lách tươi, trồng tại nhà không hóa chất.",
    idDM: "65a987654321abcd87654321",
    danhMuc: {
        _id: "65a987654321abcd87654321",
        tenDM: "Rau Xanh"
    },
    idCH: "65b123456789abcd12345678",
    cuaHang: {
        _id: "65b123456789abcd12345678",
        tenCH: "Nông Trại Xanh",
        anhCH: "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
        moTaCH: "Chuyên cung cấp rau sạch từ nông trại."
    },
    dsYeuThich: ["65c123456789abcd12345678", "65c876543210abcd87654321"],
    phanLoai: [
        { tenLoai: "500g", giaLoai: 25000, donVi: "VND", khuyenMai: 10 },
        { tenLoai: "1kg", giaLoai: 45000, donVi: "VND", khuyenMai: 15 }
    ],
    trangThai: "Đang bán",
    luotXem: 120,
    khoHang: 50,
    daBan: 20,
    anhSP: ["https://images.unsplash.com/photo-1581618048854-b2f6f877cef3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
        "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
        "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
        "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d"],
    chungNhan: ["VietGAP", "Hữu Cơ"],
    nguonGoc: "Đà Lạt",
    tongSoSao: 4.5,
    tongSoDanhGia: 35,
    dsDanhGia: [
        {
            _id: "65d123456789abcd12345678",
            soSao: 5,
            noiDung: "Rau rất tươi, ăn ngon.",
            idDonHang: "65e123456789abcd12345678",
            idSanPham: "65a123456789abcd12345678",
            khachHangId: "65f123456789abcd12345678",
            hinhAnh: ["https://example.com/images/review1.jpg"]
        },
        {
            _id: "65d876543210abcd87654321",
            soSao: 4,
            noiDung: "Sản phẩm tốt nhưng giao hơi chậm.",
            idDonHang: "65e876543210abcd87654321",
            idSanPham: "65a123456789abcd12345678",
            khachHangId: "65f876543210abcd87654321",
            hinhAnh: []
        }
    ]
};

export default product;
