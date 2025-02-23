export const product = {
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


export const Reviews = [
    {
        id: "1",
        avatar: "https://i.pravatar.cc/40?img=1", 
        username: "Nguyễn Văn A", 
        rating: 5, 
        date: "2024-01-08 09:58", 
        category: "1kg", 
        content: "Sản phẩm rất tốt, đóng gói cẩn thận!"
    },
    {
        id: "2",
        avatar: "https://i.pravatar.cc/40?img=2", 
        username: "Trần Thị B", 
        rating: 4, 
        date: "2024-02-15 14:23", 
        category: "500g", 
        content: "Giao hàng nhanh, sản phẩm ổn so với giá tiền."
    },
    {
        id: "3",
        avatar: "https://i.pravatar.cc/40?img=3", 
        username: "Lê Quốc C", 
        rating: 3, 
        date: "2024-03-02 18:40", 
        category: "2kg", 
        content: "Sản phẩm khá ổn nhưng giao hàng hơi chậm."
    },
    {
        id: "4",
        avatar: "https://i.pravatar.cc/40?img=4", 
        username: "Hoàng Minh D", 
        rating: 2, 
        date: "2024-04-10 11:05", 
        category: "1kg", 
        content: "Chất lượng sản phẩm chưa đạt mong đợi."
    },
    {
        id: "5",
        avatar: "https://i.pravatar.cc/40?img=5", 
        username: "Phạm Thanh E", 
        rating: 1, 
        date: "2024-05-20 20:15", 
        category: "500g", 
        content: "Hàng lỗi, shop phản hồi chậm."
    },
    {
        id: "6",
        avatar: "https://i.pravatar.cc/40?img=6",
        username: "Đặng Văn F",
        rating: 5,
        date: "2024-06-01 08:45",
        category: "2kg",
        content: "Sản phẩm chất lượng, giá cả hợp lý."
    },
    {
        id: "7",
        avatar: "https://i.pravatar.cc/40?img=7",
        username: "Bùi Thị G",
        rating: 4,
        date: "2024-06-10 12:30",
        category: "1kg",
        content: "Sản phẩm tốt nhưng đóng gói chưa cẩn thận lắm."
    },
    // {
    //     id: "8",
    //     avatar: "https://i.pravatar.cc/40?img=8",
    //     username: "Ngô Quốc H",
    //     rating: 3,
    //     date: "2024-06-15 17:55",
    //     category: "500g",
    //     content: "Khá ổn, nhưng giá hơi cao so với chất lượng."
    // },
    // {
    //     id: "9",
    //     avatar: "https://i.pravatar.cc/40?img=9",
    //     username: "Hồ Minh I",
    //     rating: 5,
    //     date: "2024-07-02 10:10",
    //     category: "2kg",
    //     content: "Mình đã mua nhiều lần, chất lượng luôn ổn định."
    // },
    // {
    //     id: "10",
    //     avatar: "https://i.pravatar.cc/40?img=10",
    //     username: "Trịnh Văn J",
    //     rating: 2,
    //     date: "2024-07-08 14:50",
    //     category: "1kg",
    //     content: "Hơi thất vọng về chất lượng sản phẩm."
    // },
    // {
    //     id: "11",
    //     avatar: "https://i.pravatar.cc/40?img=11",
    //     username: "Lâm Thị K",
    //     rating: 4,
    //     date: "2024-07-12 09:35",
    //     category: "500g",
    //     content: "Tạm ổn, sẽ ủng hộ nếu giá giảm thêm."
    // },
    // {
    //     id: "12",
    //     avatar: "https://i.pravatar.cc/40?img=12",
    //     username: "Dương Quốc L",
    //     rating: 5,
    //     date: "2024-08-01 19:20",
    //     category: "2kg",
    //     content: "Chất lượng tuyệt vời, giao hàng nhanh."
    // },
    // {
    //     id: "13",
    //     avatar: "https://i.pravatar.cc/40?img=13",
    //     username: "Võ Minh M",
    //     rating: 3,
    //     date: "2024-08-05 16:15",
    //     category: "1kg",
    //     content: "Ổn nhưng đóng gói chưa kỹ."
    // },
    // {
    //     id: "14",
    //     avatar: "https://i.pravatar.cc/40?img=14",
    //     username: "Lê Văn N",
    //     rating: 4,
    //     date: "2024-08-12 20:40",
    //     category: "500g",
    //     content: "Hàng đẹp, chất lượng tương xứng với giá."
    // },
    // {
    //     id: "15",
    //     avatar: "https://i.pravatar.cc/40?img=15",
    //     username: "Nguyễn Thị O",
    //     rating: 5,
    //     date: "2024-08-18 13:55",
    //     category: "2kg",
    //     content: "Rất hài lòng, sẽ tiếp tục mua lần sau."
    // },
    // {
    //     id: "16",
    //     avatar: "https://i.pravatar.cc/40?img=16",
    //     username: "Phạm Quốc P",
    //     rating: 2,
    //     date: "2024-08-22 11:25",
    //     category: "1kg",
    //     content: "Sản phẩm chưa đúng mô tả, cần cải thiện."
    // },
    // {
    //     id: "17",
    //     avatar: "https://i.pravatar.cc/40?img=17",
    //     username: "Bùi Thị Q",
    //     rating: 3,
    //     date: "2024-09-05 18:00",
    //     category: "500g",
    //     content: "Chất lượng tạm ổn nhưng cần cải tiến đóng gói."
    // },
    // {
    //     id: "18",
    //     avatar: "https://i.pravatar.cc/40?img=18",
    //     username: "Đặng Minh R",
    //     rating: 4,
    //     date: "2024-09-10 15:45",
    //     category: "2kg",
    //     content: "Sản phẩm tốt, đóng gói chắc chắn."
    // },
    // {
    //     id: "19",
    //     avatar: "https://i.pravatar.cc/40?img=19",
    //     username: "Hoàng Văn S",
    //     rating: 5,
    //     date: "2024-09-15 08:30",
    //     category: "1kg",
    //     content: "Hàng đúng như mô tả, rất hài lòng."
    // },
    // {
    //     id: "20",
    //     avatar: "https://i.pravatar.cc/40?img=20",
    //     username: "Ngô Thị T",
    //     rating: 1,
    //     date: "2024-09-20 10:10",
    //     category: "500g",
    //     content: "Không như mong đợi, sẽ không mua lại."
    // }
];


export const orders = [
    {
        id: "order001",
        shopName: "Nông Trại Xanh",
        orderStatus: "Chờ giao hàng",
        products: [
            { name: "Gạo ST25", type: "Túi 5kg", quantity: 1, price: 250000 },
            { name: "Đậu xanh", type: "Túi 1kg", quantity: 2, price: 50000 }
        ],
        totalPrice: 350000,
        orderReceived: false
    },
    {
        id: "order002",
        shopName: "Rau Củ Quê Hương",
        orderStatus: "Đã giao hàng",
        products: [
            { name: "Rau cải xanh", type: "Bó 500g", quantity: 3, price: 30000 },
            { name: "Cà chua bi", type: "Hộp 500g", quantity: 2, price: 40000 }
        ],
        totalPrice: 70000,
        orderReceived: true
    },
    {
        id: "order003",
        shopName: "Trái Cây Miền Tây",
        orderStatus: "Chờ giao hàng",
        products: [
            { name: "Sầu riêng Ri6", type: "Trái 2kg", quantity: 1, price: 300000 },
            { name: "Bưởi da xanh", type: "Trái 1.5kg", quantity: 1, price: 120000 }
        ],
        totalPrice: 420000,
        orderReceived: false
    },
    {
        id: "order004",
        shopName: "Nông Sản Đà Lạt",
        orderStatus: "Đã giao hàng",
        products: [
            { name: "Khoai lang mật", type: "Túi 2kg", quantity: 1, price: 80000 },
            { name: "Dâu tây", type: "Hộp 500g", quantity: 2, price: 150000 }
        ],
        totalPrice: 230000,
        orderReceived: true
    }
];
