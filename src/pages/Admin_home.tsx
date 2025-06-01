import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomeCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin_home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [storeId, setStoreId] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('price', price);
    formData.append('storeId', storeId);
    if (image) formData.append('image', image);

    try {
      const res = await fetch('https://tut-online-store.onrender.com/products/add', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setMessage('Product added successfully!');
        setItemName('');
        setPrice('');
        setStoreId('');
        setImage(null);
        setShowModal(false);
      } else {
        setMessage('Failed to add product.');
      }
    } catch {
      setMessage('Error occurred while adding product.');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add Product
      </button>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/RegisterAccount">Register Account</Link>
        </li>
        <li className="list-group-item">
          <Link to="/RemoveAccount">Remove Account</Link>
        </li>
        <li className="list-group-item">
          <Link to="/AccountLists">View all accounts</Link>
        </li>
        <li className="list-group-item">
          <Link to="/CheckQueries">Check Queries</Link>
        </li>
        <li className="list-group-item">
          <Link to="/AddStore">Add Store</Link>
        </li>
        <li className="list-group-item">
          <Link to="/AddStoreItem">Add Store Item</Link>
        </li>
        <li className="list-group-item">
          <Link to="/UpdateStoreItem">Update Store Item</Link>
        </li>
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="modal-header">
                  <h5 className="modal-title">Add Product</h5>
                  <button
                    type="button"
                    className="btn-close"
                    title="Close"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={itemName}
                      onChange={e => setItemName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Store ID</label>
                    <input
                      type="number"
                      className="form-control"
                      value={storeId}
                      onChange={e => setStoreId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
                      required
                    />
                  </div>
                  {message && <div className="alert alert-info">{message}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_home;