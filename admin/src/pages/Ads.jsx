import Navigation from '../components/Navigation'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { MdClose } from "react-icons/md";
import axios from "axios";
import moment from "moment";

function Ads() {
    const [moThem, setMoThem] = useState(false);
    const [moSua, setMoSua] = useState(false);
    const [quangCaoList, setQuangCaoList] = useState([]);
    const [quangCao, setQuangCao] = useState({
        loaiQuangCao: "Hệ Thống",
        hinhAnh: "",
        tieuDe: "",
        noiDung: "",
        ngayBatDau: "",
        ngayKetThuc: "",
    });

    useEffect(() => {
        const fetchQuangCao = async () => {
            try {
                const response = await axios.get("/api/quangcao/admin/lay");
                setQuangCaoList(response.data);
            } catch (err) {
                console.error("Lỗi API:", err);
            }
        };
        fetchQuangCao();
    }, []);

    const handleChange = (e) => {
        setQuangCao((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setQuangCao((prev) => ({
                    ...prev,
                    hinhAnh: reader.result 
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/quangcao/admin/them", quangCao);

            if (response.status === 200 || response.status === 201) {
                alert("Thêm quảng cáo thành công!");
                window.location.reload();
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Lỗi kết nối đến server!");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa quảng cáo này?");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/quangcao/xoa/${id}`);
                alert("Xóa quảng cáo thành công!");
                window.location.reload();
            } catch (error) {
                console.error("Lỗi khi xóa quảng cáo:", error);
                alert("Không thể xóa quảng cáo.");
            }
        }
    };

    const handleEdit = (qc) => {
        setQuangCao(qc);
        setMoSua(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/quangcao/capnhat/${quangCao._id}`, quangCao);
            if (response.status === 200) {
                alert("Cập nhật thành công!");
                window.location.reload();
            } else {
                alert("Cập nhật thất bại!");
            }
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            alert("Lỗi khi kết nối đến server!");
        }
    };

    return (
        <Navigation>
            <Header title="Quản lý quảng cáo" />
            <div className='bg-white rounded-xl shadow-xl !px-5 !py-2 w-auto h-fit !mt-16'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-black uppercase text-emerald-900'>Dách sách quảng cáo của cửa hàng</h1>
                    <button 
                        className='bg-emerald-700 text-white text-lg rounded-md !px-5 !py-2 hover:bg-emerald-800'
                        onClick={() => setMoThem(true)}
                        >Thêm quảng cáo</button>
                </div>

                <div className='!mt-5'>
                    <div className='w-full rounded-md bg-emerald-900 text-white grid grid-cols-23 items-center font-semibold'>
                        <div className='col-span-1 text-center border-r !py-2 uppercase'>#</div>
                        <div className='col-span-4 border-r !py-2 text-center uppercase'>hình ảnh</div>
                        <div className='col-span-4 border-r !py-2 text-center uppercase'>tiêu đề</div>
                        <div className='col-span-4 border-r !py-2 text-center uppercase'>nội dung</div>
                        <div className='col-span-3 border-r !py-2 text-center uppercase'>ngày bắt đầu</div>
                        <div className='col-span-3 border-r !py-2 text-center uppercase'>ngày kết thúc</div>
                        <div className='col-span-2 border-r !py-2 text-center uppercase'>trạng thái</div>
                        <div className='col-span-2 !py-2 text-center uppercase'>hành động</div>
                    </div>
                    {quangCaoList.map((qc, index) => (
                        <div key={index} className='w-full bg-gray-100 grid grid-cols-23 text-lg items-center border-b !py-2'>
                            <div className='col-span-1 text-center border-r'>{index + 1}</div>
                            <div className='col-span-4 border-r text-center'>
                                <img src={qc.linkAnh} alt="Hình ảnh QC" className="h-30 w-30 object-cover mx-auto rounded" />
                            </div>
                            <div className='col-span-4 border-r text-center'>{qc.tieuDe}</div>
                            <div className='col-span-4 border-r text-center'>{qc.noiDung}</div>
                            <div className='col-span-3 border-r text-center'>{moment(qc.ngayBatDau).format("YYYY-MM-DD HH:mm")}</div>
                            <div className='col-span-3 border-r text-center'>{moment(qc.ngayKetThuc).format("YYYY-MM-DD HH:mm")}</div>
                            <div className='col-span-2 border-r text-center'>{qc.trangThai}</div>
                            <div className='col-span-2 text-center flex justify-center gap-2'>
                                <button 
                                    className="bg-blue-500 text-white !px-3 !py-1 rounded hover:bg-blue-700"
                                    onClick={() => handleEdit(qc)}
                                >
                                    Sửa
                                </button>
                                <button 
                                    className="bg-red-500 text-white !px-3 !py-1 rounded hover:bg-red-700"
                                    onClick={() => handleDelete(qc._id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {moThem && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                    <div className="bg-white w-96 md:w-[500px] !p-7 rounded-lg shadow-lg relative">
                        <button
                            className="cursor-pointer absolute top-3 right-3 text-lg !p-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
                            onClick={() => {
                                setMoThem(false);
                                setQuangCao({
                                    loaiQuangCao: "Cửa Hàng",
                                    hinhAnh: "",
                                    tieuDe: "",
                                    noiDung: "",
                                    ngayBatDau: "",
                                    ngayKetThuc: "",
                                });
                            }}
                        >
                            <MdClose />
                        </button>
                        <h1 className="text-2xl font-bold text-emerald-900 text-center !mb-5">THÊM QUẢNG CÁO MỚI</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium !mb-2">Hình ảnh:</label>
                                {quangCao.hinhAnh && (
                                    <img src={quangCao.hinhAnh} alt="Hình ảnh QC" className="w-full h-60 !mb-5 object-cover rounded-lg" />
                                )}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="w-full border rounded-md !p-2 focus:ring focus:ring-emerald-400 text-sm"
                                    onChange={handleImageChange} 
                                    />
                            </div>
                            <div>
                                <label className="block font-medium !mb-2">Tiêu đề:</label>
                                <input
                                    type="text"
                                    name="tieuDe"
                                    value={quangCao.tieuDe}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg !p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium !mb-2">Nội dung:</label>
                                <input
                                    type="text"
                                    name="noiDung"
                                    value={quangCao.noiDung}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg !p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium !mb-2">Ngày bắt đầu:</label>
                                <input
                                    type="datetime-local"
                                    name="ngayBatDau"
                                    value={quangCao.ngayBatDau}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg !p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium !mb-2">Ngày kết thúc:</label>
                                <input
                                    type="datetime-local"
                                    name="ngayKetThuc"
                                    value={quangCao.ngayKetThuc}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg !p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-800 text-white !py-2 rounded-lg cursor-pointer hover:bg-blue-900 transition"
                            >
                                Thêm quảng cáo
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {moSua && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                    <div className="bg-white w-96 md:w-[500px] !p-7 rounded-lg shadow-lg relative">
                        <button
                            className="cursor-pointer absolute top-3 right-3 text-lg !p-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
                            onClick={() => {
                                setMoSua(false);
                                setQuangCao({
                                    loaiQuangCao: "Cửa Hàng",
                                    hinhAnh: "",
                                    tieuDe: "",
                                    noiDung: "",
                                    ngayBatDau: "",
                                    ngayKetThuc: "",
                                });
                            }}
                        >
                            <MdClose />
                        </button>
                        <h1 className="text-2xl font-bold text-emerald-900 text-center !mb-5">CHỈNH SỬA QUẢNG CÁO</h1>
                        <form onSubmit={handleUpdate} className="!space-y-4">
                            {(quangCao.hinhAnh ? quangCao.hinhAnh : quangCao.linkAnh) && (
                                <img
                                    src={quangCao.hinhAnh ? quangCao.hinhAnh : quangCao.linkAnh}
                                    alt="Hình ảnh QC"
                                    className="w-full h-60 !mb-5 object-cover rounded-lg"
                                />
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border rounded-lg !p-2" />
                            <input type="text" name="tieuDe" value={quangCao.tieuDe} onChange={handleChange} className="w-full border rounded-lg !p-2" placeholder="Tiêu đề" required />
                            <textarea name="noiDung" value={quangCao.noiDung} onChange={handleChange} className="w-full border rounded-lg !p-2" placeholder="Nội dung" required></textarea>
                            <input type="datetime-local" name="ngayBatDau" value={quangCao.ngayBatDau ? moment(quangCao.ngayBatDau).format("YYYY-MM-DD HH:mm") : ''} onChange={handleChange} className="w-full border rounded-lg !p-2" required />
                            <input type="datetime-local" name="ngayKetThuc" value={quangCao.ngayKetThuc ? moment(quangCao.ngayKetThuc).format("YYYY-MM-DD HH:mm") : ''} onChange={handleChange} className="w-full border rounded-lg !p-2" required />
                            <select name="trangThai" value={quangCao.trangThai} onChange={handleChange} className="w-full border rounded-lg !p-2" required>
                                <option value={quangCao.trangThai}>{quangCao.trangThai}</option>
                                <option value="Đang diễn ra">Đang diễn ra</option>
                                <option value="Tạm dừng">Tạm dừng</option>
                                <option value="Đã kết thúc">Đã kết thúc</option>
                            </select>
                            <button type="submit" className="w-full bg-blue-800 text-white !py-2 rounded-lg hover:bg-blue-900 transition">
                                Cập nhật
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Navigation>
    )
}

export default Ads