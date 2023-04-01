import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./App.css";
import AddProduct from "./components/addProduct/AddProduct";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import { useSelector } from "react-redux";

function App() {
  const userRole = useSelector((state) => state.Session.role);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login"/>}/>
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/auth/signup" element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/>
        {userRole === 'admin' && <Route path="/product" element={<Product/>}/>}
        {userRole === 'admin' && <Route path="/product/add-product" element={<AddProduct/>}/>}
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
