import './App.css';
import Profile from './components/profile';
import InputProfiles from './components/input';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfiles from './components/userProfiles';
import Products from './components/products/products';
import ProductsId from './components/products/productsId';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputProfiles />} />
        <Route path="/user-table" element={<Profile />} />
        <Route path="/user-table/:id" element={<UserProfiles />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductsId />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
