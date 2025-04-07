import './App.css'
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';
import BooksPage from './pages/BooksPage'
import CartPage from './pages/CartPage'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<BooksPage/>}/>
        <Route path="/CartPage" element={<CartPage/>}/>
        <Route path="/adminBooks" element={<AdminBooksPage/>}/>
      </Routes>
    </Router>
    </CartProvider>
    </>
  )
}

export default App
