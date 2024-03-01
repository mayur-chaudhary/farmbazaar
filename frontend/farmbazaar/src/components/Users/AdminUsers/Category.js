import React, { useState, useEffect } from 'react';
import { getAllCategories, updateCategory, deleteCategory } from '../../../services/admin.services';
import AddCategory from './AddCategory';
import NavBarAdmin from '../../NavBars/NavBarAdmin';
import Footer from '../../NavBars/Footer';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Error fetching categories. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleEdit = (id) => {
        setEditingCategory(id);
        const categoryToEdit = categories.find(category => category.id === id);
        setEditedData(categoryToEdit);
    };

    const handleSave = async (id) => {
        try {
            await updateCategory(id, editedData);
            // Update the categories state to reflect the changes
            const updatedCategories = categories.map(category => {
                if (category.id === id) {
                    return { ...category, ...editedData };
                }
                return category;
            });
            setCategories(updatedCategories);
            setEditingCategory(null);
        } catch (error) {
            console.error('Error updating category:', error);
            // Handle error
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter(category => category.id !== id));
            // You may want to fetch updated category list here if necessary
        } catch (error) {
            console.error('Error deleting category:', error);
            // Handle error
        }
    };

    const handleInputChange = (field, value) => {
        setEditedData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleAddCategory = () => {
        setShowAddCategoryForm(true);
    };

    const handleAddCategoryClose = () => {
        setShowAddCategoryForm(false);
    };

    const handleAddCategorySuccess = async (newCategory) => {
        try {
            // Add the new category to the list
            setCategories([...categories, newCategory]);
            // Hide the add category form
            setShowAddCategoryForm(false);
            // Fetch updated category list
            const response = await getAllCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error adding category:', error);
            // Handle error
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <NavBarAdmin />
        <div className="container-lg">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Categories</h2>
                        <button className="btn btn-info add-new" onClick={handleAddCategory}><i className="fa fa-plus"></i> Add Category</button>
                    </div>
                    {showAddCategoryForm && <AddCategory onClose={handleAddCategoryClose} onSuccess={handleAddCategorySuccess} />}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category.id}>
                                    <td>
                                        {editingCategory === category.id ? (
                                            <input type="text" className="form-control" value={editedData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                                        ) : (
                                            category.name
                                        )}
                                    </td>
                                    <td>
                                        {editingCategory === category.id ? (
                                            <button onClick={() => handleSave(category.id)} className="btn btn-success">Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(category.id)} className="btn btn-primary">Edit</button>
                                                <button onClick={() => handleDelete(category.id)} className="btn btn-danger ml-2">Delete</button>
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
        < Footer />
        </>
    );
};

export default Category;
