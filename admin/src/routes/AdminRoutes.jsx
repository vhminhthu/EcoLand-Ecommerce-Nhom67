
import { Routes ,Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { User } from "../pages/User";

import { Blockchain } from "../pages/Blockchain";
import Report from "../pages/Report";
import { Roles } from "../pages/Roles";
import Product from "../pages/Product";
import { Category } from "../pages/Category";
import Login from "../pages/auth/Login";

import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

function AdminRoutes() {

    
    const { data: authUser, isLoading } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
          try {
            const response = await axios.get('/api/admin/getme',{
                withCredentials: true,
            });
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
              <Route path="/" element={!authUser ? <Login /> : <Dashboard/> } />
              <Route path="/user" element={<User />} />
              <Route path="/category" element={<Category />} />
              <Route path="/product" element={<Product />} />
              <Route path="/blockchain" element={<Blockchain />}/>
              <Route path="/report" element={<Report />} />
              <Route path="/roles" element={<Roles />} />     
        </Routes>
    )
}

export default AdminRoutes