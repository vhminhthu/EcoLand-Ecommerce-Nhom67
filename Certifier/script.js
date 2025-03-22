document.getElementById("loginButton").addEventListener("click", async () => {
    const tenAdmin = document.getElementById("username").value.trim();
    const address = document.getElementById("walletAddress").value.trim();

    if (!tenAdmin || !address) {
        alert("Vui lòng nhập đầy đủ tên và địa chỉ ví!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/admin/certifier-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tenAdmin, address })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Đăng nhập thất bại!");
            return;
        }

        // Lưu thông tin đăng nhập vào localStorage (hoặc sessionStorage)
        localStorage.setItem("certifierData", JSON.stringify(data));

        // Điều hướng đến trang Certifier.html sau khi đăng nhập thành công
        window.location.href = "Certifier.html";
        
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        alert("Lỗi hệ thống, vui lòng thử lại!");
    }
});
