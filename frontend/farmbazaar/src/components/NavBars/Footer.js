import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#F8F9FA', color: '#12372A', textAlign: 'center', margin: '20px 0' }}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} FarmBazaar. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
