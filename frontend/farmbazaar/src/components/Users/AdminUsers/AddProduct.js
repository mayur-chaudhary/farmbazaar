import React, { useState } from 'react';
import { createProduct } from '../../../services/admin.services';

const AddProduct = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        pre_order_quantity: '',
        category_id: '' // You may need to change this to match your category data structure
    });
    const [imageFile, setImageFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('quantity', formData.quantity);
            formDataToSend.append('pre_order_quantity', formData.pre_order_quantity);
            formDataToSend.append('category_id', formData.category_id);
            formDataToSend.append('imageFile', imageFile); // Append the actual image file
            
            const response = await createProduct(formDataToSend);
            onAdd(response.data); // Update parent component with the new product
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error
        }
    };
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Add New Product</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price:</label>
                                    <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">Quantity:</label>
                                    <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pre_order_quantity" className="form-label">Pre-order Quantity:</label>
                                    <input type="number" className="form-control" id="pre_order_quantity" name="pre_order_quantity" value={formData.pre_order_quantity} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category_id" className="form-label">Category:</label>
                                    <input type="text" className="form-control" id="category_id" name="category_id" value={formData.category_id} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imageFile" className="form-label">Image:</label>
                                    <input type="file" className="form-control" id="imageFile" name="imageFile" onChange={handleImageUpload} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Add Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
