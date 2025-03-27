import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Auth/SignUp';
import Login from './Pages/Auth/LogIn';
import Home from './Pages/Products/Index';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;
