import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const steps = [
    "Thông tin Shop",
    "Thông tin thuế",
    "Thông tin định danh",
];

export default function BecomeSeller() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({
        tenCH: '',
        diaChiCH: '',
        emailCH: '',
        soDienThoaiCH: '',
        thongTinThue: {
            loaiHinhKD: '',
            diaChiDK: '',
            emailHD: '',
            maSoThue: ''
        },
        thongTinDinhDanh: {
            loaiThe: '',
            hinhChup: '',
            soDinhDanh: '',
            hoVaTen: ''
        },
        cidChungNhan: ''
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.post("/api/cuahang/them", formData);
            if (response.status === 200 || response.status === 201) {
                alert("Thêm cửa hàng thành công!");
                navigate("/")
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm cửa hàng:", error);
            if (error.response) {
                console.error("Chi tiết lỗi từ API:", error.response.data);
                alert(`Có lỗi xảy ra: ${error.response.data.message || "Vui lòng thử lại!"}`);
            } else {
                alert("Có lỗi xảy ra, vui lòng kiểm tra kết nối!");
            }
        }
    };

    const xulyAnhChup = (event) => {
        const file = event.target.files[0];  
        if (file) {
            const reader = new FileReader(); 
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    thongTinDinhDanh: {
                        ...prevData.thongTinDinhDanh,
                        hinhChup: reader.result,  
                    }
                }));
            };
            reader.readAsDataURL(file);  
        }
    };   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleThueChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            thongTinThue: {
                ...prevData.thongTinThue,
                [name]: value,
            }
        }));
    };

    const handleDinhDanhChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            thongTinDinhDanh: {
                ...prevData.thongTinDinhDanh,
                [name]: value,
            }
        }));
    };

    const xulyChonFileCertify = (event) => {
        const file = event.target.files[0];  
        if (file) {
            const reader = new FileReader(); 
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    cidChungNhan: reader.result, 
                }));
            };
            reader.readAsDataURL(file);  
        }
    };   
    useEffect(() => {
        console.log("formData đã thay đổi:", formData);
    }, [formData]); 

    if (loading) return <p>Đang tải thông tin...</p>;
    
    return (
        <div className="h-screen bg-slate-50">
            <div className="w-full flex justify-between items-center bg-emerald-700 p-10 text-white shadow-md">
                <span className="flex items-center gap-3 w-full">
                    <h1>EcoLand</h1>
                    <p>Đăng ký trở thành Người bán EcoLand</p>
                </span>
                <div>
                    <p>{user?.tenNguoiDung}</p>
                </div>
            </div> 
            <div className="flex flex-col justify-center items-center bg-white h-fit min-w-7xl max-w-7xl !mx-auto !my-8 shadow-md p-10">
                <div className="border-b border-gray-400 w-full flex flex-col justify-center">
                    <div className="flex justify-between mb-5">
                        {steps.map((s, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                                index <= step ? "bg-red-500 text-white" : "bg-gray-300"
                            }`}
                            >
                            {index + 1}
                            </div>
                            <div className={`mt-2 text-sm ${
                                index === step ? "text-black font-medium" : "text-gray-400"
                            }`}>{s}</div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className=" w-full flex flex-col items-center my-5 p-5  rounded-md">
                    {step === 0 && <StepOne formData={formData} handleInputChange={handleInputChange} />}
                    {step === 1 && <StepTwo formData={formData} handleThueChange={handleThueChange} />}
                    {step === 2 && <StepThree formData={formData} handleDinhDanhChange={handleDinhDanhChange} xulyAnhChup={xulyAnhChup} xulyChonFileCertify={xulyChonFileCertify}/>}
                </div>

                <div className="flex justify-between gap-5">
                    <button
                    onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                    disabled={step === 0}
                    className="py-3 px-5 rounded-lg border cursor-pointer hover:bg-gray-100"
                    >
                    Quay lại
                    </button>
                    <button
                        onClick={() => {
                        if (step === steps.length - 1) {
                            handleSubmit();
                        } else {
                            setStep((prev) => Math.min(prev + 1, steps.length - 1));
                        }
                        }}
                        className="bg-red-500 hover:bg-red-600 py-3 px-5 rounded-lg text-white cursor-pointer"
                    >
                        {step === steps.length - 1 ? "Gửi yêu cầu mở cửa hàng" : "Tiếp theo"}
                    </button>
                </div>

            </div>
        </div>
    )
}

function StepOne({ formData, handleInputChange }) {
    StepOne.propTypes = {
        formData: PropTypes.shape({
            tenCH: PropTypes.string.isRequired,
            diaChiCH: PropTypes.string.isRequired,
            emailCH: PropTypes.string.isRequired,
            soDienThoaiCH: PropTypes.string.isRequired,
        }).isRequired,
        handleInputChange: PropTypes.func.isRequired,
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-3 items-center">
                <label htmlFor="tenCH"><span className="text-red-500">*</span> Tên Shop</label>
                <input type="text" id="tenCH" name="tenCH" value={formData?.tenCH} onChange={handleInputChange} className="border p-2 rounded-md" />
            </div>
            <div className="flex gap-3 items-center">
                <label htmlFor="diaChiCH"><span className="text-red-500">*</span> Địa chỉ lấy hàng</label>
                <input id="diaChiCH" name="diaChiCH" value={formData?.diaChiCH} onChange={handleInputChange} className="border p-2 rounded-md" />
            </div>
            <div className="flex gap-3 items-center">
                <label htmlFor="emailCH"><span className="text-red-500">*</span> Email</label>
                <input id="emailCH" name="emailCH" value={formData?.emailCH} onChange={handleInputChange} className="border p-2 rounded-md" />
            </div>
            <div className="flex gap-3 items-center">
                <label htmlFor="soDienThoaiCH"><span className="text-red-500">*</span> Số điện thoại</label>
                <input id="soDienThoaiCH" name="soDienThoaiCH" value={formData.soDienThoaiCH} onChange={handleInputChange} className="border p-2 rounded-md" />
            </div>
        </div>
    );
}

function StepTwo({ formData, handleThueChange }) {
    StepTwo.propTypes = {
        formData: PropTypes.shape({
            thongTinThue: PropTypes.shape({
                loaiHinhKD: PropTypes.string.isRequired,
                diaChiDK: PropTypes.string.isRequired,
                emailHD: PropTypes.string.isRequired,
                maSoThue: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        handleThueChange: PropTypes.func.isRequired,
    };
    return (
        <div>
            <div className="bg-blue-100 p-3 rounded-md border border-blue-200 flex gap-3">
                <IoIosInformationCircleOutline className="text-blue-600 text-4xl"/>
                <p className="text-sm">Việc thu thập Thông Tin Thuế và Thông Tin Định Danh là bắt buộc theo quy định của Luật an ninh mạng, Thương mại điện tử và Thuế của Việt Nam. Thông Tin Thuế và Thông Tin Định Danh sẽ được bảo vệ theo chính sách bảo mật của EcoLand. Người bán hoàn toàn chịu trách nhiệm về tính chính xác của thông tin.</p>
            </div>
            <div className="flex flex-col gap-5 mt-5">
                <div className="flex items-center space-x-4">
                    <label className="text-gray-700">
                        <span className="text-red-500">*</span> Loại hình kinh doanh
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="loaiHinhKD" value="ca_nhan" onChange={handleThueChange} className="hidden peer" />
                        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-red-500">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span>Cá nhân</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="loaiHinhKD" value="ho_kinh_doanh" onChange={handleThueChange} className="hidden peer" />
                        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-red-500">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span>Hộ kinh doanh</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="loaiHinhKD" value="cong_ty" onChange={handleThueChange} className="hidden peer" />
                        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-red-500">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span>Công ty</span>
                    </label>
                </div>
                <div className="flex gap-3 items-center">
                    <label htmlFor="diaChiDK"><span className="text-red-500">*</span> Địa chỉ đăng ký kinh doanh</label>
                    <input id="diaChiDK" name="diaChiDK" value={formData.thongTinThue.diaChiDK} onChange={handleThueChange} className="border p-2 rounded-md" />
                </div>
                <div className="flex gap-3 items-center">
                    <label htmlFor="emailHD"><span className="text-red-500">*</span> Email nhận hóa đơn điện tử</label>
                    <input id="emailHD" name="emailHD" value={formData.thongTinThue.emailHD} onChange={handleThueChange} className="border p-2 rounded-md" />
                </div>
                <div className="flex gap-3 items-center">
                    <label htmlFor="maSoThue"><span className="text-red-500">*</span> Mã số thuế</label>
                    <input id="maSoThue" name="maSoThue" value={formData.thongTinThue.maSoThue} onChange={handleThueChange} className="border p-2 rounded-md" />
                </div>
            </div>
        </div>
    );
}

function StepThree({ formData, handleDinhDanhChange, xulyAnhChup, xulyChonFileCertify }) {
    StepThree.propTypes = {
        formData: PropTypes.shape({
            thongTinDinhDanh: PropTypes.shape({
                loaiThe: PropTypes.string,
                hinhChup: PropTypes.string,
                soDinhDanh: PropTypes.string,
                hoVaTen: PropTypes.string,
            }).isRequired,
            cidChungNhan: PropTypes.string,
        }).isRequired,
        previewImage: PropTypes.string.isRequired,
        handleDinhDanhChange: PropTypes.func.isRequired,
        xulyAnhChup: PropTypes.func.isRequired,
        xulyChonFileCertify: PropTypes.func.isRequired,
    };
    return (
        <div>
            <div className="bg-blue-100 p-3 rounded-md border border-blue-200 flex gap-3">
                <IoIosInformationCircleOutline className="text-blue-600 text-4xl"/>
                <p className="text-sm">Vui lòng chuẩn bị sẵn hình ảnh thẻ Căn cước công dân (nếu là công dân quốc tịch Việt Nam) và Hộ Chiếu (nếu là công dân quốc tịch nước ngoài) trước khi tiến hành đăng ký thông tin định danh người bán </p>
            </div>
            <div className="flex flex-col gap-5 mt-5">
                <div className="flex items-center space-x-4">
                    <label className="text-gray-700">
                        <span className="text-red-500">*</span> Loại thẻ
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="loaiThe" value="CCCD" onChange={handleDinhDanhChange} className="hidden peer" />
                        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-red-500">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span>Căn Cước Công Dân (CCCD)</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="loaiThe" value="HoChieu" onChange={handleDinhDanhChange} className="hidden peer" />
                        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-red-500">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span>Hộ Chiếu</span>
                    </label>
                </div>
                <div className="flex flex-col gap-3 space-y-2">
                    <label htmlFor="file-upload" className="text-gray-700">
                        <span className="text-red-500">*</span> Chọn tệp: Ảnh mặt trước Căng Cước Công Dân (CCCD)
                    </label>
                    {formData?.thongTinDinhDanh?.hinhChup ? (
                        <div className="flex gap-3 items-center">
                            <img
                                src={formData?.thongTinDinhDanh?.hinhChup}
                                alt="Hình ảnh chứng nhận"
                                className="w-32 h-32 object-cover border rounded-lg"
                            />
                        </div>
                    ) : (
                        <p className="text-gray-500">Chưa có ảnh nào được chọn.</p>
                    )}
                    <label className="px-4 py-2 border text-black rounded-lg cursor-pointer hover:bg-gray-100 text-center">
                        Tải lên tệp
                        <input
                            type="file"
                            accept="image/*"
                            onChange={xulyAnhChup}
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="flex gap-3 items-center">
                    <label htmlFor="soDinhDanh"><span className="text-red-500">*</span> Số Căn Cước Công Dân (CCCD) / Số Hộ Chiếu</label>
                    <input id="soDinhDanh" name="soDinhDanh" value={formData.thongTinDinhDanh.soDinhDanh} onChange={handleDinhDanhChange} className="border p-2 rounded-md" />
                </div>
                <div className="flex gap-3 items-center">
                    <label htmlFor="hoVaTen"><span className="text-red-500">*</span> Họ & Tên</label>
                    <input id="hoVaTen" name="hoVaTen" value={formData.thongTinDinhDanh.hoVaTen} onChange={handleDinhDanhChange} className="border p-2 rounded-md" />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="file-upload" className="text-gray-700">
                        <span className="text-red-500">*</span> Nhập hình ảnh chứng nhận của cửa hàng:
                    </label>

                    {formData?.cidChungNhan ? (
                        <div className="flex gap-3 items-center">
                            <img
                                src={formData.cidChungNhan}
                                alt="Hình ảnh chứng nhận"
                                className="w-32 h-32 object-cover border rounded-lg"
                            />
                        </div>
                    ) : (
                        <p className="text-gray-500">Chưa có ảnh nào được chọn.</p>
                    )}

                    <label className="px-4 py-2 border text-black rounded-lg cursor-pointer hover:bg-gray-100 text-center">
                        Tải tệp lên
                        <input
                            type="file"
                            accept="image/*"
                            onChange={xulyChonFileCertify}
                            className="hidden"
                        />
                    </label>
                </div>

            </div>
        </div>
    );
}