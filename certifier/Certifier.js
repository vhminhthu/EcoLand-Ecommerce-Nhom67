// certifier.js
const products = [
    {
        productId: "P001",
        productName: "Gạo ST25",
        storeId: "S001",
        seedType: "Lúa ST25",
        sowingDate: "2024-01-10",
        harvestingDate: "2024-05-20",
        fertilizersUsed: "Phân hữu cơ",
        packagingDate: "2024-05-25",
        expirationDate: "2025-05-25",
        inspectorAddress: "0xAbc123...",
        certifierAddress: "0xDef456...",
        isCertified: false
    },
    {
        productId: "P002",
        productName: "Cà phê Arabica",
        storeId: "S002",
        seedType: "Arabica",
        sowingDate: "2023-12-15",
        harvestingDate: "2024-06-30",
        fertilizersUsed: "Phân bón vi sinh",
        packagingDate: "2024-07-05",
        expirationDate: "2025-07-05",
        inspectorAddress: "0xGhi789...",
        certifierAddress: "0xJkl012...",
        isCertified: false
    }
];

function loadProducts() {
    const tableBody = document.getElementById("certifierTable");
    tableBody.innerHTML = "";

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.storeId}</td>
            <td>${product.seedType}</td>
            <td>${product.sowingDate}</td>
            <td>${product.harvestingDate}</td>
            <td>${product.fertilizersUsed}</td>
            <td>${product.packagingDate}</td>
            <td>${product.expirationDate}</td>
            <td>${product.inspectorAddress}</td>
            <td>${product.isCertified ? " Đã duyệt" : " Chưa duyệt"}</td>
            <td>
                <button onclick="approveProduct(${index})" ${product.isCertified ? "disabled" : ""}>
                    Duyệt
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function approveProduct(index) {
    products[index].isCertified = true;
    loadProducts();
}

loadProducts();
