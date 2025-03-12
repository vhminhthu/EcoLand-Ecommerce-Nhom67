import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation"


const useListenMessages = () => {
const {socket} = useSocketContext()
const {cacTinNhan,setCacTinNhan}= useConversation()

useEffect(()=> {
    socket?.on("tinNhanMoi",(tinNhanMoi)=>{
        setCacTinNhan([...cacTinNhan,tinNhanMoi])
        console.log("Received new message:", tinNhanMoi);
    })

    return() => socket.off("tinNhanMoi")
},[socket,setCacTinNhan,cacTinNhan])
}
export default useListenMessages