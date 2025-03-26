// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EcoLand {
    address public superAdmin;

    struct Inspector {
        address inspectorAddress;
        string name;
        bool isActive;
    }

    struct Certifier {
        address certifierAddress;
        string name;
        bool isActive;
    }

    struct Store {
        string storeId;      // ID của nông dân hoặc trang trại
        string storeName;    // Tên trang trại / nông dân
        string cid;          // CID của IPFS lưu thông tin chi tiết
        string storeLocation; // Địa chỉ trang trại
    }

    struct Product {
        string productId;           //ID sản phẩm
        string productName;         //Tên sản phẩm
        string storeId;             //ID cửa hàng
        string seedType;            //Loại giống
        string sowingDate;          //Ngày gieo trồng/sản xuất
        string harvestingDate;      //Ngày thu hoạch
        string packagingDate;       //Ngày đóng gói
        string expirationDate;      //Ngày hết hạn
        address inspectorAddress;  //Địa chỉ của nhà kiểm duyệt
        address certifierAddress; // Địa chỉ của nhà kiểm định
        bool isCertified;         // true nếu đã được kiểm định
        string certifierImageCid;
    }

    mapping(address => Inspector) public inspectors;
    mapping(address => Certifier) public certifiers;
    mapping(string => Store) public stores;
    mapping(string => Product) public products;
    mapping(string => string) public productToStore;
    mapping(address => string[]) public certifierToProducts;

    string[] public productList;

    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, "Only SuperAdmin can perform this action");
        _;
    }

    modifier onlyInspector() {
        require(inspectors[msg.sender].isActive, "Only Inspector can perform this action");
        _;
    }

    modifier onlyCertifier() {
        require(certifiers[msg.sender].isActive, "Only Certifier can perform this action");
        _;
    }

    constructor() {
        superAdmin = msg.sender;
    }

    event InspectorAdded(address indexed inspectorAddress, string name);
    event CertifierAdded(address indexed certifierAddress, string name);
    event StoreCreated(string storeId, string storeName, string cid);
    event ProductCreated(string productId, string productName, string storeId, address indexed inspector);
    event ProductCertified(string productId, address indexed certifier);

    // SuperAdmin thêm người kiểm duyệt
    function addInspector(address _inspector, string memory _name) public onlySuperAdmin {
        require(inspectors[_inspector].inspectorAddress == address(0), "Inspector already exists");
        inspectors[_inspector] = Inspector(_inspector, _name, true);
        emit InspectorAdded(_inspector, _name);
    }

    // SuperAdmin thêm nhà kiểm định
    function addCertifier(address _certifier, string memory _name) public onlySuperAdmin {
        require(certifiers[_certifier].certifierAddress == address(0), "Certifier already exists");
        certifiers[_certifier] = Certifier(_certifier, _name, true);
        emit CertifierAdded(_certifier, _name);
    }

    // Kiểm duyệt viên tạo cửa hàng
    function createStore(string memory _storeId, string memory _storeName, string memory _cid, string memory _storeLocation) public onlyInspector {
        require(bytes(stores[_storeId].storeId).length == 0, "Store ID already exists");
        stores[_storeId] = Store(_storeId, _storeName, _cid, _storeLocation);
        emit StoreCreated(_storeId, _storeName, _cid);
    }

    // Kiểm duyệt viên tạo sản phẩm
    function createProduct(
        string memory _productId,
        string memory _productName,
        string memory _storeId,
        string memory _seedType,
        string memory _sowingDate,
        string memory _harvestingDate,
        string memory _packagingDate,
        string memory _expirationDate,
        address _certifierAddress,
        string memory _certifierImageCid
    ) public onlyInspector {
        require(bytes(products[_productId].productId).length == 0, "Product already exists");
        require(bytes(stores[_storeId].storeId).length != 0, "Store ID does not exist");
        require(certifiers[_certifierAddress].certifierAddress != address(0), "Certifier is not authorized");

        products[_productId] = Product({
            productId: _productId,
            productName: _productName,
            storeId: _storeId,
            seedType: _seedType,
            sowingDate: _sowingDate,
            harvestingDate: _harvestingDate,
            packagingDate: _packagingDate,
            expirationDate: _expirationDate,
            inspectorAddress: msg.sender,
            certifierAddress: _certifierAddress,
            isCertified: false,
            certifierImageCid: _certifierImageCid
        });

        productToStore[_productId] = _storeId;
        productList.push(_productId);
        certifierToProducts[_certifierAddress].push(_productId); // Thêm sản phẩm vào danh sách của nhà kiểm định

        emit ProductCreated(_productId, _productName, _storeId, msg.sender);
    }

    // Nhà kiểm định kiểm tra sản phẩm và ký xác nhận trên blockchain nếu đạt chuẩn
    function certifyProduct(string memory _productId) public onlyCertifier {
        require(bytes(products[_productId].productId).length > 0, "Product does not exist");
        require(!products[_productId].isCertified, "Product already certified");
        require(products[_productId].certifierAddress == msg.sender, "You are not authorized to certify this product");

        products[_productId].isCertified = true;
        emit ProductCertified(_productId, msg.sender);
    }

    struct ProductDetail {
        string productId;
        string productName;
        string storeName;
        string seedType;
        string sowingDate;
        string harvestingDate;
        string packagingDate;
        string expirationDate;
        string inspectorName;
        bool isCertified;
        string certifierName;
        string certifierImageCid;
    }

    // Lấy tất cả sản phẩm của một nhà kiểm định
    function getProductsByCertifier(address _certifierAddress) public view returns (ProductDetail[] memory) {
        string[] memory productIds = certifierToProducts[_certifierAddress];
        ProductDetail[] memory productDetails = new ProductDetail[](productIds.length);
        for (uint256 i = 0; i < productIds.length; i++) {
            string memory productId = productIds[i];
            Product memory p = products[productId];

            productDetails[i] = ProductDetail({
                productId: p.productId,
                productName: p.productName,
                storeName: stores[p.storeId].storeName,
                seedType: p.seedType,
                sowingDate: p.sowingDate,
                harvestingDate: p.harvestingDate,
                packagingDate: p.packagingDate,
                expirationDate: p.expirationDate,
                inspectorName: inspectors[p.inspectorAddress].name,
                isCertified: p.isCertified,
                certifierName: certifiers[p.certifierAddress].name,
                certifierImageCid: p.certifierImageCid
            });
        }

        return productDetails;
    }


    // Truy xuất nguồn gốc sản phẩm
    function getProductDetails(string memory _productId) public view returns (ProductDetail memory) {
        require(bytes(products[_productId].productId).length > 0, "Product does not exist");

        Product memory p = products[_productId];

        ProductDetail memory detail = ProductDetail({
            productId: p.productId,
            productName: p.productName,
            storeName: stores[p.storeId].storeName,
            seedType: p.seedType,
            sowingDate: p.sowingDate,
            harvestingDate: p.harvestingDate,
            packagingDate: p.packagingDate,
            expirationDate: p.expirationDate,
            inspectorName: inspectors[p.inspectorAddress].name,
            isCertified: p.isCertified,
            certifierName: certifiers[p.certifierAddress].name,
            certifierImageCid: p.certifierImageCid
        });

        return detail;
    }

    //Lấy tất cả sản phẩm
    function getAllProducts() public view returns (ProductDetail[] memory) {
        ProductDetail[] memory productArray = new ProductDetail[](productList.length);
        
        for (uint256 i = 0; i < productList.length; i++) {
            Product memory p = products[productList[i]];

            productArray[i] = ProductDetail({
                productId: p.productId,
                productName: p.productName,
                storeName: stores[p.storeId].storeName,
                seedType: p.seedType,
                sowingDate: p.sowingDate,
                harvestingDate: p.harvestingDate,
                packagingDate: p.packagingDate,
                expirationDate: p.expirationDate,
                inspectorName: inspectors[p.inspectorAddress].name,
                isCertified: p.isCertified,
                certifierName: certifiers[p.certifierAddress].name,
                certifierImageCid: p.certifierImageCid
            });
        }

        return productArray;
    }

}
