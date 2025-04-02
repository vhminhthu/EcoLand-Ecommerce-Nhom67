// SPDX-License-Identifier: FIT
pragma solidity ^0.8.0;

contract EcoLandSupplyChain {
    enum ProductStatus { 
        Sowed,              // Gieo trồng
        InspectionAfterSowing,  // Kiểm tra sau gieo trồng
        Growing,            // Phát triển
        InspectionDuringGrowth,  // Kiểm tra trong quá trình phát triển
        Harvested,          // Thu hoạch
        InspectionAfterHarvest,  // Kiểm tra sau thu hoạch
        Packaged,           // Đóng gói
        FinalQualityCheck   // Kiểm tra chất lượng cuối cùng trước khi phân phối
    }

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    struct Participant {
        string name;
        string role; // Chỉ có thể là "VERIFIER"
        bool isActive;
    }
    
    mapping(address => Participant) public participants;
    address[] public participantAddresses;
    mapping(address => bool) public participantRegistered;

    // Thêm người dùng
    function setParticipant(
        address _participant,
        string memory _name,
        string memory _role,
        bool _isActive
    ) public {
        require(msg.sender == admin, "Only Admin can perform this action");
        require(
            keccak256(bytes(_role)) == keccak256(bytes("VERIFIER")),
            "Role must be VERIFIER"
        );
        require(!participantRegistered[_participant], "Participant already exists");
        
        if (!participantRegistered[_participant]) {
            participantAddresses.push(_participant);
            participantRegistered[_participant] = true;
        }
        participants[_participant] = Participant(_name, _role, _isActive);
    }
    
    // Lấy tất cả người dùng
    function getParticipants() public view returns (Participant[] memory) {
        uint256 len = participantAddresses.length;
        Participant[] memory result = new Participant[](len);
        for (uint256 i = 0; i < len; i++) {
            result[i] = participants[participantAddresses[i]];
        }
        return result;
    }
    
    struct SowingInfo {
        string seedType;
        string sowingDate;
        uint256 quantity;
    }

    struct GrowingInfo {
        string fertilizerType;
        string fertilizationDate;
        string pesticideType;
        string pesticideApplicationDate;
    }

    struct HarvestInfo {
        string harvestingDate;
        uint256 harvestingQuantity;
    }

    struct PackagingInfo {
        string packagingDate;
        string expirationDate;
    }

    struct Product {
        uint256 productId;
        uint256 uuid;
        string productName;
        string farmerName;
        address farmer;
        SowingInfo sowing;
        GrowingInfo growing;
        HarvestInfo harvest;
        PackagingInfo packaging;
        ProductStatus status;
        address approvedBy;
    }
    
    mapping(uint256 => Product) public products;
    uint256 public nextProductId= 1;
    
    event ProductCreated(uint256 productId, string productName, string farmerName, string seedType, string sowingDate, uint256 quantity);
    event ProductSowedApproved(uint256 productId);

    event ProductAdvancedToGrowing(uint256 productId);
    event ProductGrowingApproved(uint256 productId);

    event ProductHarvested(uint256 productId, string harvestingDate, uint256 harvestingQuantity);
    event ProductHarvestedApproved(uint256 productId);

    event ProductPackaged(uint256 productId, string packagingDate, string expirationDate);
    event ProductPackagedApproved(uint256 productId);

    //Thêm sản phẩm - Giai đoạn gieo trồng
    function createProduct(
        string memory _productName,
        string memory _farmerName,
        string memory _seedType,
        string memory _sowingDate,
        uint256 _quantity
    ) public {
        address farmer = msg.sender;
        uint256 currentId = nextProductId;
        nextProductId++;
        uint256 currentUUID = uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, _productName)));
        
        products[currentId] = Product({
            productId: currentId,
            uuid: currentUUID,
            productName: _productName,
            farmerName: _farmerName,
            farmer: farmer,
            sowing: SowingInfo(_seedType, _sowingDate, _quantity),
            growing: GrowingInfo("", "", "", ""),
            harvest: HarvestInfo("", 0),
            packaging: PackagingInfo("", ""),
            status: ProductStatus.Sowed,
            approvedBy: address(0)
        });

        emit ProductCreated(currentId, _productName, _farmerName, _seedType, _sowingDate, _quantity);
    }

    //Kiểm tra sau gieo trồng
    function approveSowedProduct(uint256 _productId ) public {
        require(participants[msg.sender].isActive, "Participant is not active");
        require(
            keccak256(bytes(participants[msg.sender].role)) == keccak256(bytes("VERIFIER")),
            "Only VERIFIER can approve"
        );
        require(products[_productId].productId != 0, "Product does not exist");
        require(products[_productId].status == ProductStatus.Sowed, "Product must be in Sowed status to approve");
        
        Product storage product = products[_productId];
        product.approvedBy = msg.sender;
        product.status = ProductStatus.InspectionAfterSowing;
        emit ProductSowedApproved(_productId);
    }

    //Cập nhật - Giai đoạn phát triển
    function advanceToGrowing(
        uint256 _productId,
        string memory _fertilizerType,
        string memory _fertilizationDate,
        string memory _pesticideType,
        string memory _pesticideApplicationDate
    ) public {
        require(products[_productId].farmer == msg.sender, "Only the assigned farmer can update this product");
        require(products[_productId].productId != 0, "Product does not exist");
        require(products[_productId].status  == ProductStatus.InspectionAfterSowing, "Product must be in InspectionAfterSowing status to advance to Growing");

        Product storage product = products[_productId];
        product.status = ProductStatus.Growing;
        
        product.growing = GrowingInfo(
            _fertilizerType,
            _fertilizationDate,
            _pesticideType,
            _pesticideApplicationDate
        );

        emit ProductAdvancedToGrowing(_productId);
    }

    // Kiểm tra trong quá trình phát triển
    function approveGrowingProduct(uint256 _productId) public {
        require(participants[msg.sender].isActive, "Participant is not active");
        require(
            keccak256(bytes(participants[msg.sender].role)) == keccak256(bytes("VERIFIER")),
            "Only VERIFIER can approve"
        );
        require(products[_productId].approvedBy == msg.sender, "Only approved designees can approve this product");
        require(products[_productId].productId != 0, "Product does not exist");
        require(products[_productId].status == ProductStatus.Growing, "Product must be in Growing status to approve");
        
        Product storage product = products[_productId];
        product.status = ProductStatus.InspectionDuringGrowth;
        emit ProductGrowingApproved(_productId);
    }

    //Cập nhật - Giai đoạn thu hoạch
    function recordHarvest(
        uint256 _productId,
        uint256 _harvestingQuantity,
        string memory _harvestingDate
    ) public {
        require(products[_productId].farmer == msg.sender, "Only the assigned farmer can update this product");
        require(products[_productId].productId != 0, "Product does not exist");
        require(products[_productId].status  == ProductStatus.InspectionDuringGrowth, "Product must be in InspectionDuringGrowth status to advance to Growing");

        Product storage product = products[_productId];
        product.status = ProductStatus.Harvested;

        product.harvest = HarvestInfo(
            _harvestingDate,
            _harvestingQuantity
        );
        emit ProductHarvested(_productId, _harvestingDate, _harvestingQuantity );
    }

    // Kiểm tra sau thu hoạch
    function approveHarvestedProduct(uint256 _productId) public {
        require(participants[msg.sender].isActive, "Participant is not active");
        require(
            keccak256(bytes(participants[msg.sender].role)) == keccak256(bytes("VERIFIER")),
            "Only VERIFIER can approve"
        );
        require(products[_productId].approvedBy == msg.sender, "Only approved designees can approve this product");
        require(products[_productId].productId != 0, "Product does not exist");
        require(products[_productId].status == ProductStatus.Harvested, "Product must be in Harvested status to approve");
        
        Product storage product = products[_productId];
        product.status = ProductStatus.InspectionAfterHarvest;
        emit ProductHarvestedApproved(_productId);
    }

    //Cập nhật - Giai đoạn đóng gói
    function packageProduct(
        uint256 _productId,
        string memory _packagingDate,  
        string memory _expirationDate  
    ) public {
        require(products[_productId].farmer == msg.sender, "Only the assigned farmer can update this product");
        require(products[_productId].productId != 0, "Product does not exist");
        require(products[_productId].status  == ProductStatus.InspectionAfterHarvest, "Product must be in InspectionAfterHarvest status to advance to Growing");

        Product storage product = products[_productId];
        product.status = ProductStatus.Packaged;
        product.packaging = PackagingInfo(
            _packagingDate,
            _expirationDate
        );
        emit ProductPackaged(_productId, _packagingDate, _expirationDate);
    }

    // Kiểm tra chất lượng cuối cùng trước khi phân phối
    function approvePackagedProduct(uint256 _productId) public {
        require(participants[msg.sender].isActive, "Participant is not active");
        require(
            keccak256(bytes(participants[msg.sender].role)) == keccak256(bytes("VERIFIER")),
            "Only VERIFIER can approve"
        );
        require(products[_productId].approvedBy == msg.sender, "Only approved designees can approve this product");
        require(products[_productId].productId != 0, "Product does not exist");
        require(products[_productId].status == ProductStatus.Packaged, "Product must be in Packaged status to approve");
        
        Product storage product = products[_productId];
        product.status = ProductStatus.FinalQualityCheck;
        emit ProductPackagedApproved(_productId);
    }

    // Lấy chi tiết sản phẩm
    function getProductDetails(uint256 _uuid) public view returns (ProductDetail memory) {
        // Duyệt qua tất cả các sản phẩm để tìm UUID tương ứng
        Product memory product;
        bool found = false;
        
        // Lặp qua tất cả các sản phẩm để tìm sản phẩm theo UUID
        for (uint256 i = 1; i < nextProductId; i++) {
            if (products[i].uuid == _uuid) {
                product = products[i];
                found = true;
                break;
            }
        }
        
        // Kiểm tra xem sản phẩm có tồn tại không
        require(found, "Product does not exist");

        string memory approvedByName = participants[product.approvedBy].name;

        ProductDetail memory detail = ProductDetail({
            productId: product.productId,
            productName: product.productName,
            farmerName: product.farmerName,
            approvedBy: approvedByName,
            seedType: product.sowing.seedType,
            sowingDate: product.sowing.sowingDate,
            quantity: product.sowing.quantity,
            fertilizerType: product.growing.fertilizerType,
            fertilizationDate: product.growing.fertilizationDate,
            pesticideType: product.growing.pesticideType,
            pesticideApplicationDate: product.growing.pesticideApplicationDate,
            harvestingDate: product.harvest.harvestingDate,
            harvestingQuantity: product.harvest.harvestingQuantity,
            packagingDate: product.packaging.packagingDate,
            expirationDate: product.packaging.expirationDate,
            status: product.status
        });

        return detail;
    }

    struct ProductDetail {
        uint256 productId;
        string productName;
        string farmerName;
        string approvedBy;
        string seedType;
        string sowingDate;
        uint256 quantity;
        string fertilizerType;
        string fertilizationDate;
        string pesticideType;
        string pesticideApplicationDate;
        string harvestingDate;
        uint256 harvestingQuantity;
        string packagingDate;
        string expirationDate;
        ProductStatus status;
    }
}