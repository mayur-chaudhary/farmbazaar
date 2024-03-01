import React, { useState, useEffect } from 'react';
import { getAllProducts, updateProduct, deleteProduct } from '../../../services/admin.services';
import AddProduct from './AddProduct';
import axios from 'axios';
import NavBarAdmin from '../../NavBars/NavBarAdmin';
import Footer from '../../NavBars/Footer';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    // Fetch all products from the server
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
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

    // Function to handle adding a new product
    const handleAddProduct = async (newProduct) => {
        try {
            // Add the new product to the product list
            setProducts([...products, newProduct]);
            // Hide the add product form
            setShowAddProductForm(false);
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error
        }
    };

    // Function to handle editing a product
    const handleEdit = (id) => {
        setEditingProduct(id);
        const productToEdit = products.find(product => product.id === id);
        setEditedData(productToEdit);
    };

    // Function to handle saving edits to a product
    const handleSave = async (id) => {
        try {
            const formData = new FormData();

            // Append image file to FormData if selected
            if (imageFile) {
                formData.append('imageFile', imageFile);
            }

            // Append other product details only if they have been edited
            if (editedData.name !== undefined) {
                formData.append('name', editedData.name);
            }
            if (editedData.price !== undefined) {
                formData.append('price', editedData.price);
            }
            if (editedData.quantity !== undefined) {
                formData.append('quantity', editedData.quantity);
            }
            if (editedData.pre_order_quantity !== undefined) {
                formData.append('pre_order_quantity', editedData.pre_order_quantity);
            }

            await updateProduct(id, formData);
            setEditingProduct(null);
            // Fetch updated product list
            const response = await getAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error updating product:', error);
            // Handle error
        }
    };



    // Function to handle deleting a product
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            // Handle error
        }
    };

    // Function to handle input changes
    const handleInputChange = (field, value) => {
        setEditedData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    // Function to handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setImageFile(file);
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
            <NavBarAdmin />
            <div className="container-lg">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h2>Products</h2>
                                </div>
                                <div className="col-sm-4">
                                    <button type="button" className="btn btn-info add-new" onClick={() => setShowAddProductForm(true)}><i className="fa fa-plus"></i> Add New</button>
                                </div>
                            </div>
                        </div>
                        {showAddProductForm && <AddProduct onAdd={handleAddProduct} />}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Pre-order Quantity</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>
                                            {editingProduct === product.id ? (
                                                <input type="text" className="form-control" value={editedData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                                            ) : (
                                                product.name
                                            )}
                                        </td>
                                        <td>
                                            {editingProduct === product.id ? (
                                                <input type="text" className="form-control" value={editedData.price} onChange={(e) => handleInputChange('price', e.target.value)} />
                                            ) : (
                                                product.price
                                            )}
                                        </td>
                                        <td>
                                            {editingProduct === product.id ? (
                                                <input type="text" className="form-control" value={editedData.quantity} onChange={(e) => handleInputChange('quantity', e.target.value)} />
                                            ) : (
                                                product.quantity
                                            )}
                                        </td>
                                        <td>
                                            {editingProduct === product.id ? (
                                                <input type="text" className="form-control" value={editedData.pre_order_quantity} onChange={(e) => handleInputChange('pre_order_quantity', e.target.value)} />
                                            ) : (
                                                product.pre_order_quantity
                                            )}
                                        </td>
                                        <td>
                                            <img src={product.imageUrl} alt="Product Image" />
                                            {editingProduct === product.id && (
                                                <input type="file" className="form-control" onChange={(e) => handleImageUpload(e)} />
                                            )}
                                        </td>
                                        <td>
                                            {editingProduct === product.id ? (
                                                <button onClick={() => handleSave(product.id)} className="btn btn-success">Save</button>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEdit(product.id)} className="btn btn-primary">Edit</button>
                                                    <button onClick={() => handleDelete(product.id)} className="btn btn-danger ml-2">Delete</button>
                                                </>
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

export default Product;

