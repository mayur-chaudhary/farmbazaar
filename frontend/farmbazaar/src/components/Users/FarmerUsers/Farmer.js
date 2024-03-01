import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsByFarmerId, getFarmerById } from '../../../services/farmer.services';
import NavBarFarmer from '../../NavBars/NavBarFarmer';
import Footer from '../../NavBars/Footer';

const Farmer = () => {
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    // Fetch farmer details from session data
    const farmerData = JSON.parse(sessionStorage.getItem('userData'));
    if (farmerData) {
      setFarmer(farmerData);
      // Fetch profit from the database
      fetchProfit(farmerData.id);
      // Fetch products for the farmer
      fetchProducts(farmerData.id);
    }
  }, []);

  const fetchProfit = (farmerId) => {
    getFarmerById(farmerId)
      .then(response => {
        setProfit(response.data.totalProfit);
      })
      .catch(error => {
        console.error('Error fetching farmer:', error);
      });
  };

  const fetchProducts = (farmerId) => {
    getProductsByFarmerId(farmerId)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  return (
    <>
    <NavBarFarmer />
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Update Stock</h5>
              <p className="card-text">Update the stocks for your assigned product.</p>
              <Link to="/farmer/farmer-stocks" className="btn btn-primary">Update Stock</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Profit</h5>
              <p className="card-text text-success">Profit: {profit.toFixed(2)}<span>&#x20B9;</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Farmer;
