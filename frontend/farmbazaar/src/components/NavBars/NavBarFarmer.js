import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../NavBars/logo.png";

const NavBarFarmer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData || !userData.isLoggedIn || userData.role !== 'FARMER') {
      // Redirect to login if not logged in or not a farmer
      navigate('/signin');
    }
  }, [navigate]);

  const handleSignOut = () => {
    // Clear session storage
    sessionStorage.removeItem('userData');
    // Redirect to the signin page
    navigate("/signin");
  };

  const handleLogoClick = () => {
    navigate("/farmer-dashboard");
  };

  return (
    <>
      <nav style={{backgroundColor: 'transparent', marginBottom: '20px'}} className="navbar navbar-expand-lg bg-light">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className="container-fluid">
          <div>
            <Link to="/farmer-dashboard" onClick={handleLogoClick} style={{textDecoration: 'none', color: '#12372A', display: 'flex', alignItems: 'center'}} className="navbar-brand">
              <img src={logo} alt="FarmBazaar Logo" width="52" height="45" style={{marginRight: '8px'}} />
              <span style={{fontFamily: 'cursive', fontSize: '24px', color: '#FF0000', fontWeight: 'bold'}}>Farm</span>
              <span style={{fontFamily: 'cursive', fontSize: '24px', color: '#FFA500', fontWeight: 'bold'}}>Bazaar</span>
            </Link>
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

export default NavBarFarmer;
