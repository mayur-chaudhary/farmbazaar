import React, { useState, useEffect } from 'react';
import { getProductsByFarmerId, updateProductStock } from '../../../services/farmer.services';
import NavBarFarmer from '../../NavBars/NavBarFarmer';
import Footer from '../../NavBars/Footer';

const FarmerStocks = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState(null);

  // Fetch products for the logged-in farmer
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const farmerId = JSON.parse(sessionStorage.getItem('userData')).id;
        const response = await getProductsByFarmerId(farmerId);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle editing the quantity of a product
  const handleEdit = (id) => {
    setEditingProduct(id);
    const productToEdit = products.find(product => product.id === id);
    setEditedQuantity(productToEdit.quantity); // Initialize editedQuantity here
  };


  // Function to handle saving the edited quantity
  const handleSave = async (productId, quantity) => {
    try {
      await updateProductStock(JSON.parse(sessionStorage.getItem('userData')).id, productId, quantity);
      setEditingProduct(null);
      setEditedQuantity(null);
      // Fetch updated product list
      const response = await getProductsByFarmerId(JSON.parse(sessionStorage.getItem('userData')).id);
      setProducts(response.data);
    } catch (error) {
      console.error('Error updating product stock:', error);
      // Handle error
    }
  };



  // Function to handle input changes for quantity
  const handleInputChange = (value) => {
    setEditedQuantity(value);
  };

  // Render loading state if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state if there is an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the product table
  return (
    <>
    <NavBarFarmer/>
    <div className="container-lg">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-12">
                <h2>Farmer Stocks</h2>
              </div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Pre-order Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    {editingProduct === product.id ? (
                      <input type="text" className="form-control" value={editedQuantity} onChange={(e) => handleInputChange(e.target.value)} />
                    ) : (
                      product.quantity
                    )}
                  </td>
                  <td>{product.pre_order_quantity}</td>
                  <td>
                    {editingProduct === product.id ? (
                      <button onClick={() => handleSave(product.id, editedQuantity)} className="btn btn-success">Save</button>

                    ) : (
                      <button onClick={() => handleEdit(product.id)} className="btn btn-primary">Edit Quantity</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FarmerStocks;
