import React from 'react';
import { Link } from 'react-router-dom';
import NavBarAdmin from '../../NavBars/NavBarAdmin';
import Footer from '../../NavBars/Footer';

const Admin = () => {
  return (
    <div>
      <NavBarAdmin />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Admin Panel</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Admin Users</h5>
                <p className="card-text">Manage admin users.</p>
                <Link to="/admin/admin-users" className="btn btn-primary mt-auto">Go to Admin Users</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Customer Users</h5>
                <p className="card-text">Manage customer users.</p>
                <Link to="/admin/customer-users" className="btn btn-primary mt-auto">Go to Customer Users</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Delivery Partner Users</h5>
                <p className="card-text">Manage delivery partner users.</p>
                <Link to="/admin/delivery-partner-users" className="btn btn-primary mt-auto">Go to Delivery Partner Users</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Farmer Users</h5>
                <p className="card-text">Manage farmer users.</p>
                <Link to="/admin/farmer-users" className="btn btn-primary mt-auto">Go to Farmer Users</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Categories</h5>
                <p className="card-text">Manage product categories.</p>
                <Link to="/admin/categories" className="btn btn-primary mt-auto">Go to Categories</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Products</h5>
                <p className="card-text">Manage products.</p>
                <Link to="/admin/products" className="btn btn-primary mt-auto">Go to Products</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Assign Product to Farmer</h5>
                <p className="card-text">Assign products to farmers.</p>
                <Link to="/admin/assign-product-to-farmer" className="btn btn-primary mt-auto">Go to Assign Product to Farmer</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">View all Orders</h5>
                <p className="card-text">View all orders placed by customers.</p>
                <Link to="/admin/assign-product-to-farmer" className="btn btn-primary mt-auto">Go to Assign Product to Farmer</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
