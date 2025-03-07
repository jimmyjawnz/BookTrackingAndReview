import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // ✅ Use 'Routes' instead of 'Switch'
import SigninForm from './components/SigninForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Browse from './components/Browse';
import './App.css';
import BookDetails from './components/BookDetails'; // Add this import


function App() {
  return (
    <Router>
      <div>
                      <Navbar />
        
        <Routes> 
        <Route path="/book/:id" element={<BookDetails />} />

          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/signin" element={<SigninForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
