// src/components/AddItem.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../api';
import './AddItem.css';

const AddItem = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');  // State for displaying messages
  const navigate = useNavigate();  // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem({ name, quantity: parseInt(quantity), price: parseFloat(price) });
      setName('');
      setQuantity('');
      setPrice('');
      setMessage('Item added successfully!');  // Set success message
      setTimeout(() => {
        setMessage('');
        navigate('/');  // Redirect to the item list after adding
      }, 2000);  // Redirect after 2 seconds
    } catch (error) {
      console.error('Failed to add item:', error);
      setMessage('Failed to add item. Please try again.');  // Set error message
    }
  };

  return (
    <div className="add-item-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          step="0.01"
          required
        />
        <button type="submit">Add</button>
      </form>
      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddItem;
