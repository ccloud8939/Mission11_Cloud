import './App.css'
import BooksPage from './pages/BooksPage'
import CartPage from './pages/CartPage'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<BooksPage/>}/>
        <Route path="/CartPage/:title" element={<CartPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
