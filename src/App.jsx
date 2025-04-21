import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Auth/SignUp';
import Login from './Pages/Auth/LogIn';
import Home from './Pages/Products/Index';
import Profile from './Pages/Profile/Index';
import ProductShow from './Pages/Products/Show';
import ProductStore from './Pages/Products/Store';
import UserContext from './context/UserContext';
import UserProducts from './Pages/Products/UserProducts';
import ProductUpdate from './Pages/Products/Update';
import Error404 from './components/errors/Error404';
import Favorite from './Pages/Profile/Favorite';
import UserUpdate from './Pages/Profile/Update';
import Chat from './Pages/Profile/Chat';
import Convo from './components/chat/Convo';
const App = () => {

  return (
    <Router>
      <UserContext>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductShow />} />
          <Route path="/new" element={<ProductStore />} />
          <Route path="/product/update/:id" element={<ProductUpdate />} />
          <Route path="/products/me" element={<UserProducts />} />

          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/update" element={<UserUpdate />} />
          <Route path="/favorites" element={<Favorite />} />

          <Route path="/chat" element={<Chat />} >
            <Route path=":id" element={<Convo />} />
          </Route>

          <Route path="*" element={<Error404 label={'Home'} navigateTo={'/home'} />} />
        </Routes>
      </UserContext>
    </Router>
  );
};

export default App;
