const abi=[
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_productId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_fertilizerType",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_fertilizationDate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_pesticideType",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_pesticideApplicationDate",
                    "type": "string"
                }
            ],
            "name": "advanceToGrowing",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_productId",
                    "type": "uint256"
                }
            ],
            "name": "approveGrowingProduct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_productId",
                    "type": "uint256"
                }
            ],
            "name": "approveHarvestedProduct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_productId",
                    "type": "uint256"
                }
            ],
            "name": "approvePackagedProduct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_productId",
                    "type": "uint256"
                }
            ],
            "name": "approveSowedProduct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_productName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_farmerName",
                    "type": "string"
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
                },
                {
                    "internalType": "uint256",
                    "name": "_quantity",
                    "type": "uint256"
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
                    "internalType": "uint256",
                    "name": "_productId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_packagingDate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_expirationDate",
                    "type": "string"
                }
            ],
            "name": "packageProduct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
                }
            ],
            "name": "ProductAdvancedToGrowing",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
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
                    "name": "farmerName",
                    "type": "string"
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
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
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
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
                }
            ],
            "name": "ProductGrowingApproved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "harvestingDate",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "harvestingQuantity",
                    "type": "uint256"
                }
            ],
            "name": "ProductHarvested",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
                }
            ],
            "name": "ProductHarvestedApproved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
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
                    "name": "expirationDate",
                    "type": "string"
                }
            ],
            "name": "ProductPackaged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
                }
            ],
            "name": "ProductPackagedApproved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
                }
            ],
            "name": "ProductSowedApproved",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_productId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_harvestingQuantity",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_harvestingDate",
                    "type": "string"
                }
            ],
            "name": "recordHarvest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_participant",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_role",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "_isActive",
                    "type": "bool"
                }
            ],
            "name": "setParticipant",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getParticipants",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "role",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "isActive",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct EcoLandSupplyChain.Participant[]",
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
                    "internalType": "uint256",
                    "name": "_uuid",
                    "type": "uint256"
                }
            ],
            "name": "getProductDetails",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "productId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "productName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "farmerName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "approvedBy",
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
                            "internalType": "uint256",
                            "name": "quantity",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "fertilizerType",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "fertilizationDate",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "pesticideType",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "pesticideApplicationDate",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "harvestingDate",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "harvestingQuantity",
                            "type": "uint256"
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
                            "internalType": "enum EcoLandSupplyChain.ProductStatus",
                            "name": "status",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct EcoLandSupplyChain.ProductDetail",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextProductId",
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
            "name": "participantAddresses",
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
            "name": "participantRegistered",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "participants",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "role",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "isActive",
                    "type": "bool"
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
            "name": "products",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "uuid",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "productName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "farmerName",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "farmer",
                    "type": "address"
                },
                {
                    "components": [
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
                            "internalType": "uint256",
                            "name": "quantity",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct EcoLandSupplyChain.SowingInfo",
                    "name": "sowing",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "fertilizerType",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "fertilizationDate",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "pesticideType",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "pesticideApplicationDate",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct EcoLandSupplyChain.GrowingInfo",
                    "name": "growing",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "harvestingDate",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "harvestingQuantity",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct EcoLandSupplyChain.HarvestInfo",
                    "name": "harvest",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "packagingDate",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "expirationDate",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct EcoLandSupplyChain.PackagingInfo",
                    "name": "packaging",
                    "type": "tuple"
                },
                {
                    "internalType": "enum EcoLandSupplyChain.ProductStatus",
                    "name": "status",
                    "type": "uint8"
                },
                {
                    "internalType": "address",
                    "name": "approvedBy",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
export default abi;