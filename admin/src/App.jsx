import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./routes/AdminRoutes.jsx";


function App() {
  return (
    <div>
     <Routes>
      <Route path="/*" element={<AdminRoutes />} />
     </Routes>
    </div>
  );
}

export default App;
