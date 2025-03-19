const abi=
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "AdminAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_inspector",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_seedType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_sowingDate",
				"type": "string"
			}
		],
		"name": "approveProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_harvestingDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fertilizersUsed",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_inspector",
				"type": "address"
			}
		],
		"name": "checkProductQuality",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "productId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "storeId",
						"type": "string"
					}
				],
				"internalType": "struct AgroSupplyChain.ProductInput",
				"name": "input",
				"type": "tuple"
			}
		],
		"name": "createProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_storeId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_storeName",
				"type": "string"
			}
		],
		"name": "createStore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "inspector",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "InspectorAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "inspector",
				"type": "address"
			}
		],
		"name": "InspectorAssigned",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_packagingDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiryDate",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_inspector",
				"type": "address"
			}
		],
		"name": "makeProductAvailable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_inspector",
				"type": "address"
			}
		],
		"name": "markProductSoldOut",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "inspector",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "seedType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "sowingDate",
				"type": "string"
			}
		],
		"name": "ProductApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "packagingDate",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "expiryDate",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "inspector",
				"type": "address"
			}
		],
		"name": "ProductAvailable",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "storeId",
				"type": "string"
			}
		],
		"name": "ProductCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "harvestingDate",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fertilizersUsed",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "inspector",
				"type": "address"
			}
		],
		"name": "ProductQualityChecked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "inspector",
				"type": "address"
			}
		],
		"name": "ProductSoldOut",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_inspector",
				"type": "address"
			}
		],
		"name": "setInspectorForProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "storeId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "storeName",
				"type": "string"
			}
		],
		"name": "StoreCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "themAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_inspector",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "themInspector",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "adminList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "admins",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAdmins",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "productId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "storeName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "seedType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sowingDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "harvestingDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fertilizersUsed",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "packagingDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expirationDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "inspectorName",
						"type": "string"
					}
				],
				"internalType": "struct AgroSupplyChain.ProductDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStores",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "storeId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "storeName",
						"type": "string"
					}
				],
				"internalType": "struct AgroSupplyChain.Store[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getInspectors",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "inspectorAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					}
				],
				"internalType": "struct AgroSupplyChain.Inspector[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productId",
				"type": "string"
			}
		],
		"name": "getProductDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "productId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "storeName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "seedType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sowingDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "harvestingDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fertilizersUsed",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "packagingDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expirationDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "inspectorName",
						"type": "string"
					}
				],
				"internalType": "struct AgroSupplyChain.ProductDetail",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productId",
				"type": "string"
			}
		],
		"name": "getStoreNameFromProductId",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "inspectorCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "inspectorList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "inspectors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "inspectorAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "productList",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "farmId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "seedType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sowingDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "harvestingDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fertilizersUsed",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "packagingDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "expirationDate",
				"type": "string"
			},
			{
				"internalType": "enum AgroSupplyChain.ProductStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "inspectorAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "inspectorName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum AgroSupplyChain.ProductStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "productStatusToString",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "productToStore",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "storeList",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "stores",
		"outputs": [
			{
				"internalType": "string",
				"name": "storeId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "storeName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "superAdmin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default abi;