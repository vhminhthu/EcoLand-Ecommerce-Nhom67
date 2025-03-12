import { createContext, useEffect, useState ,useContext} from "react";
import PropTypes from "prop-types";
import { useAuthContext } from "./AuthContext2.jsx";
import io from "socket.io-client"

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
  };

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const  [NDOnline, setNDOnline] = useState([]);
    const {authUser} = useAuthContext()

    useEffect(()=>{
        if(authUser) {
            const socket = io("http://localhost:5000",{
                query:{
                  idNguoidung  : authUser._id
                }
            });

            setSocket(socket)
            socket.on("getOnlineUsers",(users)=>{
                setNDOnline(users)
            })
            return() => socket.close()
        } else {
            if(socket) {
                socket.close()
                setSocket(null)

                return () => socket.close()
            }
        }
    },[authUser])

    return (
        <SocketContext.Provider value={{socket,NDOnline}}>
            {children}
        </SocketContext.Provider>
    );
};

SocketContextProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};