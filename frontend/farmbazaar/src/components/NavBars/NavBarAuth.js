import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../NavBars/logo.png";

const NavBarAuth = () => {
  return (
    <>
      <nav style={{ backgroundColor: 'transparent' }} className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="mx-auto"> {/* Center the contents */}
            <Link to='/signin' style={{ textDecoration: 'none', color: '#12372A', display: 'flex', alignItems: 'center' }} className="navbar-brand">
              <img src={logo} alt="FarmBazaar Logo" width="52" height="45" style={{ marginRight: '8px' }} />
              <span style={{ fontFamily: 'cursive', fontSize: '24px', color: '#FF0000', fontWeight: 'bold' }}>Farm</span>
              <span style={{ fontFamily: 'cursive', fontSize: '24px', color: '#FFA500', fontWeight: 'bold' }}>Bazaar</span>
            </Link>
          </div>
        </div>
      </nav>
      <div style={{ padding: '20px' }}> {/* Add padding instead of margin */}
        {/* Your page content here */}
      </div>
    </>
  );
};

export default NavBarAuth;
