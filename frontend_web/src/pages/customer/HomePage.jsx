import CategoryCard from "../../components/customer/common/cards/CategoryCard"
import ProductCard from "../../components/customer/common/cards/ProductCard";
import ShopCard from "../../components/customer/common/cards/ShopCard";
import MainLayout from "../../layouts/customer/MainLayout"
import { BiChevronRight } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

function HomePage() {

    const products = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1533321942807-08e4008b2025?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVzJTIwbCVDMyVBOWd1bWVzfGVufDB8fDB8fHww",
            discount: 50,
            shopName: "Rau vui vẻ",
            title: "Rau xà lách nhà trồng",
            oldPrice: 200000,
            newPrice: 10000,
            rating: 4.9,
            reviews: 30,
            location: "Đồng Nai",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1558818498-28c1e002b655?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVzJTIwbCVDMyVBOWd1bWVzfGVufDB8fDB8fHww",
            discount: 30,
            shopName: "Nông trại xanh",
            title: "Cà chua hữu cơ",
            oldPrice: 150000,
            newPrice: 105000,
            rating: 4.8,
            reviews: 25,
            location: "TP. HCM",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1663262432134-93bb1e7a60ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fENPVVJHRVRURSUyMHZlZ2V0YWJsZXxlbnwwfHwwfHx8MA%3D%3D",
            discount: 20,
            shopName: "Trang trại sạch",
            title: "Bí xanh sạch",
            oldPrice: 180000,
            newPrice: 144000,
            rating: 4.7,
            reviews: 40,
            location: "Hà Nội",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZlZ2V0YWJsZXxlbnwwfHwwfHx8MA%3D%3D",
            discount: 40,
            shopName: "Farm Organic",
            title: "Khoai lang mật",
            oldPrice: 250000,
            newPrice: 150000,
            rating: 4.9,
            reviews: 50,
            location: "Đà Nẵng",
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwdmVnZXRhYmxlfGVufDB8fDB8fHww",
            discount: 35,
            shopName: "Green Farm",
            title: "Cam sành hữu cơ",
            oldPrice: 220000,
            newPrice: 143000,
            rating: 4.6,
            reviews: 20,
            location: "Lâm Đồng",
        },
    ];

    const categories = [
        { id: "1", name: "Hạt Hạnh Nhân", img: "https://example.com/hanh-nhan.jpg" },
        { id: "2", name: "Hạt Macca", img: "https://example.com/macca.jpg" },
        { id: "3", name: "Hạt Chia", img: "https://example.com/chia.jpg" },
        { id: "4", name: "Hạt Óc Chó", img: "https://example.com/oc-cho.jpg" },
        { id: "5", name: "Hạt Dẻ Cười", img: "https://example.com/de-cuoi.jpg" },
        { id: "6", name: "Hạt Hướng Dương", img: "https://example.com/huong-duong.jpg" },
        { id: "7", name: "Hạt Điều", img: "https://example.com/dieu.jpg" },
        { id: "8", name: "Hạt Lanh", img: "https://example.com/lanh.jpg" },
    ];   
    
    const shopData = [
        {
            id: "1",
            img: "https://via.placeholder.com/150",
            shopName: "Cửa hàng A ssdh jdhfsksjdh sdlf",
            location: "Hà Nội",
            followers: 1200,
            rating: 4.8,
            reviews: 320,
        },
        {
            id: "2",
            img: "https://via.placeholder.com/150",
            shopName: "Shop B",
            location: "TP. Hồ Chí Minh",
            followers: 980,
            rating: 4.5,
            reviews: 210,
        },
        {
            id: "3",
            img: "https://via.placeholder.com/150",
            shopName: "Store C",
            location: "Đà Nẵng",
            followers: 540,
            rating: 4.6,
            reviews: 120,
        },
        {
            id: "4",
            img: "https://via.placeholder.com/150",
            shopName: "Tiệm D",
            location: "Hải Phòng",
            followers: 650,
            rating: 4.2,
            reviews: 98,
        },
        {
            id: "5",
            img: "https://via.placeholder.com/150",
            shopName: "Shop E",
            location: "Cần Thơ",
            followers: 890,
            rating: 4.9,
            reviews: 456,
        },
        {
            id: "6",
            img: "https://via.placeholder.com/150",
            shopName: "Chợ F",
            location: "Bình Dương",
            followers: 730,
            rating: 4.4,
            reviews: 230,
        },
    ];
    
    return (
        <MainLayout>
            <div className="bg-gray-200 h-150 rounded-2xl relative">
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 !px-4 !py-2 bg-emerald-600 text-white rounded-full w-fit ">
                    <button className="text-xl"><FaChevronLeft/></button>
                    <span>1/10</span>
                    <button className="text-xl"><FaChevronRight /></button>
                </div>
            </div>

            <div className="!my-8 min-w-7xl">
                <h1 className="!mb-3 text-emerald-700 font-bold text-xl">Mua sắm theo danh mục</h1>
                <div className="relative w-full flex gap-3 justify-center ">
                    <button className="absolute top-1/2 -translate-y-1/2 left-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full"><FaArrowLeft/></button>
                    {categories.map((category) => (
                        <CategoryCard key={category.id} {...category} />
                    ))}
                    <button className="absolute top-1/2 -translate-y-1/2 right-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full"><FaArrowRight /></button>
                </div>
            </div>

            <div className="!my-8 min-w-7xl">
                <div className="!mb-3 bg-emerald-600 !py-2 !px-5 flex items-center justify-between">
                    <h1 className="text-white text-2xl font-bold">TOP DEAL SIÊU RẺ</h1>
                    <div className="flex items-center text-gray-200">Xem tất cả <BiChevronRight/></div>
                </div>
                <div className="relative w-full flex gap-4 justify-center">
                    <button className="absolute top-1/2 -translate-y-1/2 left-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full"><FaArrowLeft/></button>
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                    <button className="absolute top-1/2 -translate-y-1/2 right-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full"><FaArrowRight /></button>
                </div>
            </div>

            <div className="!my-8 min-w-7xl">
                <div className="!py-2 flex items-center justify-between w-full">
                    <h1 className="text-emerald-600 text-xl font-bold">Bán chạy nhất</h1>
                    <div className="flex items-center text-gray-500">Xem tất cả <BiChevronRight/></div>
                </div>
                <div className="relative w-full flex gap-4 justify-center">
                    <button className="absolute top-1/2 -translate-y-1/2 left-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full"><FaArrowLeft/></button>
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                    <button className="absolute top-1/2 -translate-y-1/2 right-0.5 text-xl bg-emerald-600/50 text-white !p-2 rounded-full"><FaArrowRight /></button>
                </div>
            </div>

            <div className="!my-8 min-w-7xl">
                <div className="!py-2 flex items-center justify-between w-screen">
                    <h1 className="text-emerald-600 text-xl font-bold">Gian hàng phổ biến</h1>
                    <div className="flex items-center text-gray-500">Xem tất cả <BiChevronRight/></div>
                </div>
                <div className="grid grid-cols-3 gap-4 justify-center">
                {shopData.map((shop) => (
                    <ShopCard key={shop.id} {...shop} />
                ))}
                </div>
            </div>

            <div className="!my-8 min-w-7xl">
                <div className="!mb-3 !py-2 !px-5 w-full flex items-center justify-between border-emerald-600 border-b-2">    
                    <h1 className="text-emerald-600 font-bold text-xl !m-auto">GỢI Ý HÔM NAY</h1>
                </div>                
                <div className="flex gap-4 justify-center">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default HomePage