import { Routes, Route } from "react-router-dom";
// import CustomerRoutes from "./routes/CustomerRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import SellerRoutes from "./routes/SellerRoutes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
      <Route path="seller/*" element={<SellerRoutes />} />
    </Routes>
  );
}

export default App;
