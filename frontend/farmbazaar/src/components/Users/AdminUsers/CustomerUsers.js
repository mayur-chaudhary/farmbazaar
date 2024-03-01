// CustomerUsers.js
import React, { useState, useEffect } from 'react';
import { getAllCustomerUsers, updateCustomerUser, deleteCustomerUser, createCustomerUser } from '../../../services/admin.services';
import AddCustomerUser from './AddCustomerUser';
import NavBarAdmin from '../../NavBars/NavBarAdmin';
import Footer from '../../NavBars/Footer';

const CustomerUsers = () => {
    const [customerUsers, setCustomerUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Fetch all customer users from the server
    useEffect(() => {
        const fetchCustomerUsers = async () => {
            try {
                const response = await getAllCustomerUsers();
                setCustomerUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching customer users:', error);
                setError('Error fetching customer users. Please try again later.');
                setLoading(false);
            }
        };

        fetchCustomerUsers();
    }, []);

    
    const handleAddUser = async (newUser) => {
        try {
            await createCustomerUser(newUser);
            setAlertMessage('Customer added successfully.');
            
            // Reset edited data
            setEditedData({});
            
            // Refetch customer users after adding the new user
            const response = await getAllCustomerUsers();
            setCustomerUsers(response.data); // Update the customerUsers state with the latest data
            
            // Close the AddCustomerUser component
            setShowAddUserForm(false);
        } catch (error) {
            console.error('Error adding customer user:', error);
            // Handle error
        }
    };
    
    

    const handleEdit = (id) => {
        setEditingUser(id);
        const userToEdit = customerUsers.find(user => user.id === id);
        setEditedData(userToEdit);
    };
    
    const handleSave = async (id) => {
        try {
            await updateCustomerUser(id, editedData);
            setEditingUser(null);
            
            // Refetch customer users after saving the changes
            const response = await getAllCustomerUsers();
            setCustomerUsers(response.data); // Update the customerUsers state with the latest data
        } catch (error) {
            console.error('Error updating customer user:', error);
            // Handle error
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await deleteCustomerUser(id);
            setCustomerUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            // You may want to fetch updated user list here if necessary
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Check if the error status is 500 (Internal Server Error)
                // This typically indicates a database constraint violation
    
                // Display an alert message indicating that the customer cannot be deleted because there are associated orders
                setAlertMessage('Cannot delete customer user because there are associated orders.');
            } else {
                // Handle other errors
                console.error('Error deleting customer user:', error);
            }
        }
    };
    
    
    

    const handleInputChange = (field, value) => {
        setEditedData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleCloseAddUserForm = () => {
        setShowAddUserForm(false);
    };

    useEffect(() => {
        if (alertMessage) {
            setTimeout(() => {
                setAlertMessage('');
            }, 3000); // Hide the alert message after 3 seconds
        }
    }, [alertMessage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <NavBarAdmin/>
        <div className="container-lg">
            {alertMessage && (
                <div className="alert alert-success" role="alert">
                    {alertMessage}
                </div>
            )}
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2>Customer Users</h2>
                            </div>
                            <div className="col-sm-4">
                                <button type="button" className="btn btn-info add-new" onClick={() => setShowAddUserForm(true)}><i className="fa fa-plus"></i> Add New</button>
                            </div>
                        </div>
                    </div>
                    {showAddUserForm && <AddCustomerUser onAddUser={handleAddUser} onClose={handleCloseAddUserForm} />}

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerUsers.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        {editingUser === user.id ? (
                                            <input type="text" className="form-control" value={editedData.username} onChange={(e) => handleInputChange('username', e.target.value)} />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <input type="password" className="form-control" value={editedData.password} onChange={(e) => handleInputChange('password', e.target.value)} />
                                        ) : (
                                            user.password
                                        )}
                                    </td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <input type="text" className="form-control" value={editedData.fname} onChange={(e) => handleInputChange('fname', e.target.value)} />
                                        ) : (
                                            user.fname
                                        )}
                                    </td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <input type="text" className="form-control" value={editedData.lname} onChange={(e) => handleInputChange('lname', e.target.value)} />
                                        ) : (
                                            user.lname
                                        )}
                                    </td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <input type="text" className="form-control" value={editedData.phno} onChange={(e) => handleInputChange('phno', e.target.value)} />
                                        ) : (
                                            user.phno
                                        )}
                                    </td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <input type="text" className="form-control" value={editedData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
                                        ) : (
                                            user.address
                                        )}
                                    </td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <button onClick={() => handleSave(user.id)} className="btn btn-success">Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(user.id)} className="btn btn-primary">Edit</button>
                                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger ml-2">Delete</button>
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

export default CustomerUsers;
