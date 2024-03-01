import React, { useState, useEffect } from 'react';
import { getAllProducts, addToCart } from '../../../services/customer.services';
import { Link } from 'react-router-dom';
import NavBarCustomer from '../../NavBars/NavBarCustomer';
import Footer from '../../NavBars/Footer';

const Customer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productQuantities, setProductQuantities] = useState({});
  const [showToast, setShowToast] = useState(false); // State to control toast visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
        const initialQuantities = response.data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});
        setProductQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(product => product.category.name))];

  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category.name === selectedCategory);

  const handleAddToCart = async (productId) => {
    try {
      const customerId = JSON.parse(sessionStorage.getItem('userData')).id;
      const quantity = productQuantities[productId];
      await addToCart(customerId, { productId, quantity });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setProductQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  return (
<>
<NavBarCustomer />
<div className="container">
      <div className="row">
        <div className="col-md-12 mb-4">
          <div className="form-group">
            <label htmlFor="categorySelect">Filter by Category:</label>
            <select
              id="categorySelect"
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="col">
              <div className="card h-100">
                <img
                  src={`data:image/jpeg;base64,${product.imageBase64}`}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    Price: {product.price}<br />
                    Quantity: {product.quantity}<br />
                    Pre-order Quantity: {product.pre_order_quantity}
                  </p>
                  <div className="input-group mb-3">
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Enter quantity" 
                      value={productQuantities[product.id]}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    />
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Toast Notification */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: '1050' }}>
        <div className={`toast ${showToast ? 'show bg-success text-light' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Product Added</strong>
            <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">
            Product has been added to your cart.
          </div>
        </div>
      </div>
    </div>
    < Footer />
</>
  );
};

export default Customer;
