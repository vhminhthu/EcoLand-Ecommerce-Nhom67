import CartItem from '../../components/customer/common/items/CartItem';
import MainLayout from '../../layouts/customer/MainLayout';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CartPage() {
    const navigate = useNavigate();
    const [gioHang, setGioHang] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const response = await axios.get(`/api/giohang/lay`);
                // console.log("Giỏ hàng:", response.data.giohang.sanPhams);          
                const sanPhams = response.data.giohang.sanPhams; 
                const checkedItems = sanPhams.flatMap(sanPham => 
                    sanPham.sanPhamChiTiet.filter(item => item.checked)
                ); 
                setGioHang(sanPhams);
                setSelectedItems(checkedItems);
            } catch (error) {
                console.error("Lỗi khi tải giỏ hàng:", error);
            }
        };
        fetchCartDetails();
    }, []);

     // Cập nhật số lượng sản phẩm
    const handleUpdateQuantity = async (idSP, idLoai, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const response = await axios.put(`/api/giohang/capnhat`, { idSP, idLoai, soLuong: newQuantity });
            // console.log("Cập nhật giỏ hàng", response.data.giohang.sanPhams)
            const sanPhams = response.data.giohang.sanPhams; 
            const checkedItems = sanPhams.flatMap(sanPham => 
                sanPham.sanPhamChiTiet.filter(item => item.checked)
            ); 
            setGioHang(sanPhams);
            setSelectedItems(checkedItems);
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng:", error);
        }
    };
    

    // Xóa sản phẩm khỏi giỏ hàng
    const handleRemoveItem = async (idSP, idLoai) => {
        try {
            const response = await axios.delete(`/api/giohang/xoa`, {
                data: { idSP, idLoai },
            });
            // console.log("Sản phẩm Giỏ hàng sau khi xóa:", response.data.giohang.sanPhams);
            setGioHang(response.data.giohang.sanPhams);
            setSelectedItems(selectedItems.filter(item => !(item.idSP === idSP && item.idLoai === idLoai)));
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
        }
    };

    //Chọn sản phẩm
    const handleSelectItem = async (sanPham) => {
        try {
            const response = await axios.put(`/api/giohang/capnhat/chonSP`, {
                idSP: sanPham.idSP._id,
                idLoai: sanPham.idLoai,
                checked: !sanPham.checked,
            });
            const sanPhams = response.data.giohang.sanPhams;
            const checkedItems = sanPhams.flatMap(sanPham => 
                sanPham.sanPhamChiTiet.filter(item => item.checked)
            );
            setGioHang(sanPhams);
            setSelectedItems(checkedItems);
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái checked:", error);
        }
    };

    //Tính tổng tiền
    useEffect(() => {
        const newTotalPrice = selectedItems
            .filter(item => item.checked)
            .reduce((total, item) => {
                const sanPhamChiTiet = gioHang?.find(shop => 
                    shop.sanPhamChiTiet?.some(sp => sp.idSP?.phanLoai?.some(loai => loai.idPL === item.idLoai))
                );
                if (!sanPhamChiTiet) return total;

                const phanLoai = sanPhamChiTiet.sanPhamChiTiet.find(sp => 
                    sp.idSP?.phanLoai?.some(loai => loai.idPL === item.idLoai)
                )?.idSP?.phanLoai?.find(loai => loai.idPL === item.idLoai);
                if (!phanLoai) return total;

                const { giaLoai, khuyenMai } = phanLoai;
                const giaSauKhuyenMai = giaLoai * (1 - khuyenMai / 100);
                const tongTienSP = Number(giaSauKhuyenMai * (item.soLuong || 1));
                return total + tongTienSP;
            }, 0);

        setTotalPrice(newTotalPrice);
        const newTotalQuantity = selectedItems.filter(item => item.checked).length;
        setTotalQuantity(newTotalQuantity);
    }, [gioHang, selectedItems]);

    //Mua hàng
    const handlePurchase = () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn sản phẩm trước khi mua hàng!");
            return;
        }

        const Stores = new Set(selectedItems.map(item => item.idSP.idCH));

        if (Stores.size > 1) {
            alert("Bạn chỉ có thể mua hàng từ một cửa hàng tại một thời điểm.");
            return;
        }

        navigate('/checkout', { 
            state: { selectedItems, totalPrice, totalQuantity }
        });
    };
    
    return (
        <MainLayout>
            <h1 className='text-xl mb-5'>Giỏ hàng</h1>

            <div className='w-full p-5 bg-slate-50 shadow-md mb-5 grid grid-cols-12 items-center font-semibold'>
                <div className='col-span-1 text-center'>
                    
                </div>
                <div className='col-span-5'>Sản Phẩm</div>
                <div className='col-span-2 text-center'>Đơn Giá</div>
                <div className='col-span-2 text-center'>Số Lượng</div>
                <div className='col-span-1 text-center'>Số Tiền</div>
                <div className='col-span-1 text-center'>Thao Tác</div>
            </div>

            <div className='mb-23'>
                {gioHang.map((cart) => (
                    <CartItem key={cart._id} {...cart} 
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onSelectItem={handleSelectItem} 
                    selectedItems={selectedItems} />
                ))}
            </div>

            <div className=' bg-slate-50 shadow-[0px_-10px_10px_0px_rgba(0,0,0,0.1)] flex items-center justify-end gap-6 px-5 fixed bottom-0 left-0 right-0 mx-auto min-w-7xl max-w-7xl my-8 h-20 text-center'>
                <p className='text-xl'>Tổng thanh toán ({totalQuantity} Sản phẩm)</p>
                <p className='text-2xl text-emerald-600'>{totalPrice.toLocaleString()} đ</p>
                <div 
                    className='bg-emerald-600 text-white px-15 py-3 hover:bg-emerald-700 cursor-pointer hover:font-bold'
                    onClick={handlePurchase}
                    disabled={selectedItems.length === 0}>
                Mua hàng
                </div>
            </div>
        </MainLayout>
    );
}

export default CartPage;
