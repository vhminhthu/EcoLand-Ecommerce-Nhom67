
import { Routes ,Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { User } from "../pages/User";

import { Blockchain } from "../pages/Blockchain";
import { Report } from "../pages/Report";
import { Roles } from "../pages/Roles";
import Product from "../pages/Product";
import { Category } from "../pages/Category";

function AdminRoutes() {



    return (
        <Routes>
             <Route path="/" element={<Dashboard />} />
             <Route path="/user" element={<User />} />
             <Route path="/category" element={<Category />} />
             <Route path="/product" element={<Product />} />
             <Route path="/blockchain" element={<Blockchain />} />
             <Route path="/report" element={<Report />} />
             <Route path="/roles" element={<Roles />} />     
        </Routes>
    )
}

export default AdminRoutes