import { Routes, Route } from "react-router-dom";
// import CustomerRoutes from "./routes/CustomerRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import SellerRoutes from "./routes/SellerRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<AuthRoutes />} />
        <Route path="seller/*" element={<SellerRoutes />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
