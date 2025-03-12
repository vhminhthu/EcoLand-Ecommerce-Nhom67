
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import { Routes ,Route, Navigate} from "react-router-dom";
import Signup from '../pages/auth/Signup/Signup';
import Login from '../pages/auth/Login/Login';
import CustomerRoutes from './CustomerRoutes';

function AuthRoutes() {
    const { data: authUser, isLoading } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
          try {
            const response = await axios.get('/api/auth/getme',{
              withCredentials: true,
            });
            console.log("Thông tin người dùng", response.data);
            localStorage.setItem("chat-user", JSON.stringify(response.data));
            if (response.data.error) {
              throw new Error(response.data.error);
              
            }
            return response.data;
            
          } catch (error) {
            if (error.response && error.response.status === 401) {
              return null;
            }
            throw error;
          }
        },
        retry: false,
      });
    
      if (isLoading) {
        return <div>Loading...</div>;
      }

    return (
        <Routes>
          <Route path="/*" element={!authUser ? <Navigate to="/signup" /> : <CustomerRoutes/> } />
          <Route path="/signup" element={!authUser ? <Signup /> : <CustomerRoutes/> } />
          <Route path="/login"  element={!authUser ? <Login /> : <CustomerRoutes/>} />    
        </Routes>
    )
}

export default AuthRoutes