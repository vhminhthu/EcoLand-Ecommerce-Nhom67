import PropTypes from "prop-types";

function CheckoutItem({ _id, idLoai, idSP, soLuong }) {
    const phanLoai = idSP?.phanLoai?.find((loai) => loai.id === idLoai);
    const donGia = phanLoai ? (phanLoai.giaLoai * (1 - phanLoai.khuyenMai / 100)) : 0;
    const thanhTien = phanLoai ? (donGia * soLuong) : 0;

    return (
        <div key={_id} className="grid grid-cols-12 items-center mb-3 px-6">
            <div className="col-span-6 flex items-center gap-3">
                <img
                    src={idSP?.dsAnhSP}
                    alt={idSP?.tenSP}
                    className="w-14 h-14 object-cover rounded"
                />
                <div>
                    <p className="line-clamp-2">{idSP?.tenSP}</p>
                    <p className="text-gray-500 text-sm">
                        Phân loại: {phanLoai?.tenLoai || "Không xác định"}
                    </p>
                </div>
            </div>
            <div className="col-span-2 text-center text-gray-600">{donGia.toLocaleString()} đ</div>
            <div className="col-span-2 text-center text-gray-600">{soLuong}</div>
            <div className="col-span-2 text-center text-gray-600">{thanhTien.toLocaleString()} đ</div>
        </div>
    );
}

CheckoutItem.propTypes = {
    idSP: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        tenSP: PropTypes.string.isRequired,
        phanLoai: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                tenLoai: PropTypes.string.isRequired,
                giaLoai: PropTypes.number.isRequired,
                khuyenMai: PropTypes.number.isRequired,
            })
        ).isRequired,
        dsAnhSP: PropTypes.string.isRequired,
    }).isRequired,
    _id: PropTypes.string.isRequired,
    idLoai: PropTypes.number.isRequired,
    soLuong: PropTypes.number.isRequired,
};

export default CheckoutItem;
