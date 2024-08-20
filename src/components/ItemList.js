// src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import { getItems, deleteItem, updateItem } from '../api';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedQuantity, setEditedQuantity] = useState('');
  const [editedPrice, setEditedPrice] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditedName(item.name);
    setEditedQuantity(item.quantity);
    setEditedPrice(item.price);
  };

  const handleUpdate = async () => {
    try {
      await updateItem(editingItem._id, {
        name: editedName,
        quantity: parseInt(editedQuantity),
        price: parseFloat(editedPrice)
      });
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  return (
    <div className="item-list-container">
      <h2>Item List</h2>
      <ul>
        {items.map(item => (
          <li key={item._id} className="item-list-item">
            {editingItem && editingItem._id === item._id ? (
              <div className="item-edit-container">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Name"
                  required
                />
                <input
                  type="number"
                  value={editedQuantity}
                  onChange={(e) => setEditedQuantity(e.target.value)}
                  placeholder="Quantity"
                  required
                />
                <input
                  type="number"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  placeholder="Price"
                  step="0.01"
                  required
                />
                <div className="item-edit-buttons">
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">{item.quantity}</span>
                <span className="item-price">${item.price}</span>
                <div className="item-buttons">
                  <button onClick={() => handleEditClick(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;