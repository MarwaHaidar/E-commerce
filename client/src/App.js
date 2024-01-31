import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Pages/Home.js'
import About from './Pages/About.js'
import Contact from './Pages/Contact.js'
import Login from './Pages/Login.js'
import Cart from './Pages/Cart.js'
import Wishlist from './Pages/Wishlist.js'
import Register from './Pages/Register.js'
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer.js';


export default function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/register" element={<Register />} />
        </Routes>
       
        <Footer />
      
      </Router>
    </div>
  )
}
