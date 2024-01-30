import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Pages/Home.js'
import About from './Pages/About.js'
import Contact from './Pages/Contact.js'
import Login from './Pages/Login.js'
import Header from './Components/Header/Header.js';

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}
