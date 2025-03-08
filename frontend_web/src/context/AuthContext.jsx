import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const response = await axios.get("/api/auth/getme");
            // console.log("Thông tin người dùng", response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng", error);
        } finally {
            setLoading(false);
        }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
        {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hook để dùng context dễ dàng hơn
export const useAuth = () => useContext(AuthContext);
