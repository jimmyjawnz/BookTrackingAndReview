import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import RegisterForm from './components/RegisterForm';
import SigninForm from './components/SigninForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Browse from './components/Browse';
import './App.css';
import BookDetails from './components/BookDetails'; 
import UserProfile from './components/UserProfile';


function App() {
  return (
    <Router>
      <div>
                      <Navbar />
        
        <Routes> 
        <Route path="/book/:id" element={<BookDetails />} />

          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/user" element={<UserProfile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
