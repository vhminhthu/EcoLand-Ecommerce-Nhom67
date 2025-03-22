async function loadProducts() {
    const tableBody = document.getElementById("certifierTable");
    tableBody.innerHTML = "<tr><td colspan='12'>Đang tải...</td></tr>";

    // Lấy thông tin certifier từ localStorage
    const certifierData = JSON.parse(localStorage.getItem("certifierData"));
    console.log(certifierData)

    if (!certifierData || !certifierData.tenAdmin) {
        console.error("Không tìm thấy thông tin certifier");
        tableBody.innerHTML = "<tr><td colspan='12'>Lỗi: Không có thông tin certifier</td></tr>";
        return;
    }

    try {
        // Gọi API lấy danh sách sản phẩm pending theo certifier
        const response = await fetch(`http://localhost:5000/api/sanpham/get/${certifierData.tenAdmin}`);
        const products = await response.json();

        tableBody.innerHTML = "";

        if (products.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='12'>Không có sản phẩm pending</td></tr>";
            return;
        }

        // Duyệt qua danh sách sản phẩm và hiển thị lên bảng
        products.forEach((sp) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sp._id}</td>
                <td>${sp.tenNguoiDung}</td>
                <td>${sp.tenCuaHang}</td>
                <td>${sp.tenSP}</td>
                <td>${sp.nguonGoc}</td>
                <td>${sp.trangThai}</td>
                <td>${sp.ngaySX}</td>
                <td>${sp.tenDM}</td>
                <td>${sp.certifier}</td>
                <td>
                           <button onclick="approveProduct('${sp._id}')" ${sp.trangThai === "approved" ? "disabled" : ""}>
            Duyệt
        </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Lỗi khi tải sản phẩm pending:", error);
        tableBody.innerHTML = "<tr><td colspan='12'>Lỗi tải dữ liệu</td></tr>";
    }
}

async function approveProduct(productId) {
    const privateKey = prompt("Nhập Private Key để duyệt sản phẩm:");

    if (!privateKey) {
        alert("Bạn cần nhập private key!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/sanpham/certify/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ privateKey })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Sản phẩm đã được duyệt!");
            document.querySelector(`tr[data-id='${productId}']`)?.remove(); // Xóa dòng đã duyệt khỏi bảng
        } else {
            alert(`Lỗi: ${data.message}`);
        }
    } catch (error) {
        console.error("Lỗi khi duyệt sản phẩm:", error);
        alert("Không thể duyệt sản phẩm. Hãy kiểm tra lại kết nối và private key!");
    }
}


document.addEventListener("DOMContentLoaded", loadProducts);
