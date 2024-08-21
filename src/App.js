// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import './App.css';  // Import CSS for styling

const App = () => {
  return (
    <BrowserRouter basename = "/Inventory_Mngmt_frontend">
      <div className="app-container">
        <h1>Inventory Management</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Item List</Link>
          <Link to="/add" className="nav-link">Add Item</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
