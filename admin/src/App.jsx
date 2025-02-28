import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import Login from "./pages/auth/Login.jsx";

function App() {
  const { data: authAdmin, isLoading } = useQuery({
    queryKey: ["authAdmin"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/admin/getme",{
          withCredentials: true,
        });
        if (response.data.error) {
          throw new Error(response.data.error);
          
        }
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Dữ liệu authUser:", authAdmin);
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


  const validAdminRoles = ["AM1", "AM2", "AM3"];

  return (
    <Routes>
      
      <Route path="/adlogin" element={!authAdmin ? <Login /> :   <AdminRoutes /> } />

 
      <Route
        path="/*"
        element={authAdmin && validAdminRoles.includes(authAdmin.phanQuyen) ? (
          <AdminRoutes />
        ) : (
          <Navigate to="/adlogin" />
        )}
      />
    </Routes>
  );
}

export default App;
