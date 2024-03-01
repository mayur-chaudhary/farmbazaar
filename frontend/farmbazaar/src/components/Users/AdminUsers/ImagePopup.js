import React from 'react';

const ImagePopup = ({ imageUrl, onClose }) => {
    return (
        <div className="image-popup">
            <div className="image-popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <img src={imageUrl} alt="Product Image" />
            </div>
        </div>
    );
};

export default ImagePopup;
