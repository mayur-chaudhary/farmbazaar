import React, { useState, useEffect } from 'react';
import { getAllFarmerUsers, updateFarmerUser, deleteFarmerUser, createFarmerUser } from '../../../services/admin.services';
import AddFarmerUser from './AddFarmerUser';
import NavBarAdmin from '../../NavBars/NavBarAdmin';
import Footer from '../../NavBars/Footer';

const FarmerUsers = () => {
    const [farmerUsers, setFarmerUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Fetch all farmer users from the server
    useEffect(() => {
        const fetchFarmerUsers = async () => {
            try {
                const response = await getAllFarmerUsers();
                setFarmerUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching farmer users:', error);
                setError('Error fetching farmer users. Please try again later.');
                setLoading(false);
            }
        };

        fetchFarmerUsers();
    }, []);

    
    const handleAddUser = async (newUser) => {
        try {
            await createFarmerUser(newUser);
            setAlertMessage('Farmer added successfully.');
            
            // Reset edited data
            setEditedData({});
            
            // Refetch farmer users after adding the new user
            const response = await getAllFarmerUsers();
            setFarmerUsers(response.data); // Update the farmerUsers state with the latest data
            
            // Close the AddFarmerUser component
            setShowAddUserForm(false);
        } catch (error) {
            console.error('Error adding farmer user:', error);
            // Handle error
        }
    };
    
    

    const handleEdit = (id) => {
        setEditingUser(id);
        const userToEdit = farmerUsers.find(user => user.id === id);
        setEditedData(userToEdit);
    };
    
    const handleSave = async (id) => {
        try {
            await updateFarmerUser(id, editedData);
            setEditingUser(null);
            
            // Refetch farmer users after saving the changes
            const response = await getAllFarmerUsers();
            setFarmerUsers(response.data); // Update the farmerUsers state with the latest data
        } catch (error) {
            console.error('Error updating farmer user:', error);
            // Handle error
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await deleteFarmerUser(id);
            setFarmerUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            // You may want to fetch updated user list here if necessary
        } catch (error) {
            console.error('Error deleting farmer user:', error);
            // Handle error
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
                                <h2>Farmer Users</h2>
                            </div>
                            <div className="col-sm-4">
                                <button type="button" className="btn btn-info add-new" onClick={() => setShowAddUserForm(true)}><i className="fa fa-plus"></i> Add New</button>
                            </div>
                        </div>
                    </div>
                    {showAddUserForm && <AddFarmerUser onAddUser={handleAddUser} onClose={handleCloseAddUserForm} />}

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
                            {farmerUsers.map(user => (
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

export default FarmerUsers;
