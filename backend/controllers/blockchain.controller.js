import { ethers } from "ethers";
import abi from "../abi.js";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.INFURA_API_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = abi;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

export const getInspector = async (req, res) => {
    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }
        const inspector = await contract.inspectors(address);
        const result = convertBigIntToString(inspector);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu inspector" });
    }
};

export const getCertifier = async (req, res) => {
    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }
        const certifier = await contract.certifiers(address);
        const result = convertBigIntToString(certifier);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu certifier" });
    }
};

export const getStore = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const store = await contract.stores(id);
        const result = convertBigIntToString(store);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching stores:", error);
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu store" });
    }
};

export const getAllProduct = async (req, res) => {
    try {
        const allProducts = await contract.getAllProducts();
        console.log("Danh sách tất cả các sản phẩm:", allProducts);
        res.status(201).json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu product" });
    }
};

function convertBigIntToString(obj) {
    if (typeof obj === 'bigint') {
        return obj.toString();
    }

    if (Array.isArray(obj)) {
        return obj.map(convertBigIntToString);
    }

    if (obj !== null && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = convertBigIntToString(obj[key]);
            }
        }
        return newObj;
    }

    return obj;
}
