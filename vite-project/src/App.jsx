import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import SignUp from "./components/SignUp";
import Signin from "./components/Signin";
import Admin from "./components/Admin";
import App1 from "./components/App";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<App1/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin" element={<Admin  />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
