import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home.js";
import About from "./Pages/About.js";
import Contact from "./Pages/Contact.js";
import Login from "./Pages/Login.js";
import Cart from "./Pages/Cart.js";
import VerificationComponent from "./Pages/Registerverify.js"
import Wishlist from "./Pages/Wishlist.js";
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Signup from "./Pages/Signup.js";
import ForgetPass from "./Pages/ForgetPass.js";
import ResetPass from "./Pages/ResetPass.js";
import ProductDetails from "./Pages/ProductDetails.js";
import NotFound from "./Pages/NotFound.js";
import AllCategories from "./Pages/AllCategories.js";
import SubCategories from "./Pages/SubCategories.js";
import Admin from "./Pages/Admin.js";
import ProductsView from "./Components/Home/browseProducts/ProductsView.js";
import AdminHeader from "./Components/Admin/AdminHeader/AdminHeader.js";
import AdminCharts from "./Pages/AdminCharts.js";

export default function App() {
  const isAdmin = false;
  return (
    <div>
      <Router>
        {isAdmin ? <AdminHeader /> : <Header />}
          
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/forgetpassword" element={<ForgetPass />} />
          <Route path="/resetpassword" element={<ResetPass />} />
          <Route path="/products/product-slug" element={<ProductDetails />} />
          {/* temoporary route to test products render. */}
          <Route path="/products" element={<ProductsView />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route
            path="/categories/:categoryId/subcategories"
            element={<SubCategories />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminCharts" element={<AdminCharts />} />
        </Routes>
        <Routes>
          <Route path="/registerverify/:token" element={<VerificationComponent />} />
          <Route path="/register" element={<Signup />} /></Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

