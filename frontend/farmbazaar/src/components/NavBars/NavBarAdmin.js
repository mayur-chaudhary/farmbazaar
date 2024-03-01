import React, { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from "../NavBars/logo.png";

const NavBarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData || !userData.isLoggedIn || userData.role !== 'ADMIN') {
      // Redirect to login if not logged in or not an admin
      navigate('/signin');
    }
  }, [navigate]);

  const handleSignOut = () => {
    // Clear session storage
    sessionStorage.removeItem('userData');
    // Redirect to the signin page
    navigate("/signin");
  };

  // Function to determine if the current path matches the given link
  const isActiveLink = (link) => {
    return location.pathname === link;
  };

  return (
    <>
      <nav style={{backgroundColor: 'transparent', marginBottom: '20px'}} className="navbar navbar-expand-lg bg-light">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className="container-fluid">
          <div>
            <Link to="/" style={{textDecoration: 'none', color: '#12372A', display: 'flex', alignItems: 'center'}} className="navbar-brand">
              <img src={logo} alt="FarmBazaar Logo" width="52" height="45" style={{marginRight: '8px'}} />
              <span style={{fontFamily: 'cursive', fontSize: '24px', color: '#FF0000', fontWeight: 'bold'}}>Farm</span>
              <span style={{fontFamily: 'cursive', fontSize: '24px', color: '#FFA500', fontWeight: 'bold'}}>Bazaar</span>
            </Link>
          </div>
          <div className="navbar-nav">
            <ul style={{display: 'flex', justifyContent: 'center', marginBottom: '0'}} className="nav">
              <li className="nav-item">
                <NavLink to="/admin/admin-users" style={{textDecoration: 'none', color: '#12372A', padding: '0.5rem 1rem'}} activeClassName="active" className="nav-link">Admins</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/customer-users" style={{textDecoration: 'none', color: '#12372A', padding: '0.5rem 1rem'}} activeClassName="active" className="nav-link">Customers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/delivery-partner-users" style={{textDecoration: 'none', color: '#12372A', padding: '0.5rem 1rem'}} activeClassName="active" className="nav-link">Delivery Partners</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/farmer-users" style={{textDecoration: 'none', color: '#12372A', padding: '0.5rem 1rem'}} activeClassName="active" className="nav-link">Farmers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/categories" style={{textDecoration: 'none', color: '#12372A', padding: '0.5rem 1rem'}} activeClassName="active" className="nav-link">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/products" style={{textDecoration: 'none', color: '#12372A', padding: '0.5rem 1rem'}} activeClassName="active" className="nav-link">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/assign-product-to-farmer" style={{textDecoration: 'none', color: '#12372A', padding: '0.5rem 1rem'}} activeClassName="active" className="nav-link">Assign Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/orders" style={{textDecoration: 'none', color: '#12372A', padding: '0.5rem 1rem'}} activeClassName="active" className="nav-link">Orders</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <button style={{marginRight: '1rem', backgroundColor: '#FFFFFF', color: '#1F4E3D'}} type="button" className="btn btn-outline-primary" onClick={handleSignOut}>Logout</button>
          </div>
        </div>
      </nav>
      {/* Add margin or padding below the Navbar */}
      <div style={{ marginBottom: '20px' }}>
        {/* Your page content here */}
      </div>
    </>
  );
};

export default NavBarAdmin;
