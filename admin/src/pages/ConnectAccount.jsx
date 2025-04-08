import { ethers } from "ethers";
import PropTypes from "prop-types";

function ConnectAccount({ userAddress, setUserAddress }) {
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Vui lòng cài đặt MetaMask!");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress(); 
            setUserAddress(address);
            localStorage.setItem("userAddress", address);
        } catch (error) {
            console.error("Lỗi kết nối MetaMask:", error);
        }
    };

    const disconnectWallet = () => {
        localStorage.removeItem("userAddress");
        setUserAddress("");
    };

    return (
        <div className=" bg-gray-50 flex items-center justify-center h-185">
            <div className="bg-white rounded-lg shadow-lg !p-5 max-w-lg w-full">
                <h2 className="text-2xl font-semibold text-center !mb-4 text-gray-800">Kết nối tài khoản MetaMask</h2>

                {userAddress ? (
                    <div className="text-center">
                        <p className="text-lg text-green-600 !mb-4">Bạn đã kết nối ví thành công!</p>
                        <p className="text-gray-600 !mb-3 flex gap-2">Địa chỉ ví: <span className="font-mono">{userAddress}</span></p>
                        <button 
                            onClick={disconnectWallet} 
                            className="w-full bg-red-500 text-white !py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
                            Ngắt kết nối
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={connectWallet} 
                        className="w-full bg-blue-500 text-white !py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                        Kết nối MetaMask
                    </button>
                )}
            </div>
        </div>
    );
}

ConnectAccount.propTypes = {
    userAddress: PropTypes.string,
    setUserAddress: PropTypes.func,
};

export default ConnectAccount;
