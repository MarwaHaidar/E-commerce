import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataContext from './Components/Context.js';
import React, { useState } from "react";
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
import AdminHeader from "./Components/Admin/AdminHeader/AdminHeader.js";
import AdminCharts from "./Pages/AdminCharts.js";
import CategoryAdminEdit from "./Components/Admin/CategoryAdmin/CategoryAdminEdit.js";
import CategoryAdminDelete from "./Components/Admin/CategoryAdmin/CategoryAdminDelete.js";
import SubCategoryAdminEdit from "./Components/Admin/SubCategoryAdmin/SubCategoryAdminEdit.js";
import SubCategoryAdminDelete from "./Components/Admin/SubCategoryAdmin/SubCategoryAdminDelete.js";
import AddProduct from "./Components/Admin/AddProduct/AddProduct.js";
import AddCategories from "./Components/Admin/AddCategories/AddCategories.js";
import AddSubCategories from "./Components/Admin/AddSubCategories/AddSubCategories.js";
import ProductsView from "./Components/Home/BrowseProducts/ProductsView.js";
import ProductsAdminGet from "./Components/Admin/ProductsAdmin/ProductsAdminGet.js";
import ProductAdminEdit from "./Components/Admin/ProductsAdmin/ProductAdminEdit.js";


export default function App() {
  const isAdmin = false;
  const [products,setProducts] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  
  
  return (
    <div>
      <Router>
        <DataContext.Provider value={{ products, setProducts, itemsCount, setItemsCount }}>
          {isAdmin ? <AdminHeader /> : <Header />}
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/forgetpassword" element={<ForgetPass />} />
            <Route path="/resetpassword" element={<ResetPass />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/products/search" element={<ProductsView />} />
            <Route path="/products/filter" element={<ProductsView />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/categories/:categoryId/subcategories" element={<SubCategories />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/addcategories" element={<AddCategories />} />
            <Route path="/admin/addsubcategories" element={<AddSubCategories />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/editproduct/:id" element={<ProductAdminEdit />} /> 
            <Route path="/admin/editCat/:id" element={<CategoryAdminEdit />} />
            <Route path="/admin/deleteCat/:id" element={<CategoryAdminDelete />} />
            <Route path="/admin/editsubCat/:id" element={<SubCategoryAdminEdit />} />
            <Route path="/admin/deletesubCat/:id" element={<SubCategoryAdminDelete />} />
            <Route path="/admin/allproducts/:id" element={<ProductsAdminGet />} />
            <Route path="/adminCharts" element={<AdminCharts />} />
            <Route path="/registerverify/:token" element={<VerificationComponent />} />
            <Route path="/register" element={<Signup />} /></Routes>
            {isAdmin ? " ":<Footer />}
          
        </DataContext.Provider>
      </Router>
    </div>
  );
}