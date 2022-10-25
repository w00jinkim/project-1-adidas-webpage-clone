import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Itemdetail from './pages/Itemdetail/Itemdetail';
import Itemlist from './pages/Itemlist/Itemlist';
import Cart from './pages/Cart/Cart';
import Signup from './pages/Signup/Signup';
import Wishlist from './pages/Wishlist/Wishlist';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Delivery from './pages/Delivery/Delivery';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/itemlist/:gender" element={<Itemlist />} />
        <Route path="/detail/:id" element={<Itemdetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
