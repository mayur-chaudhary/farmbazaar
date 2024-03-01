import React, { useState, useEffect } from 'react';
import { getAllAdminUsers, updateAdminUser, deleteAdminUser } from '../../../services/admin.services';
import AddAdminUser from './AddAdminUser';
import NavBarAdmin from '../../NavBars/NavBarAdmin';
import Footer from '../../NavBars/Footer';

const AdminUsers = () => {
    const [adminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [showAddUserForm, setShowAddUserForm] = useState(false)

    // Fetch all admin users from the server
    useEffect(() => {
        const fetchAdminUsers = async () => {
            try {
                const response = await getAllAdminUsers();
                setAdminUsers(response.data);
            } catch (error) {
                console.error('Error fetching admin users:', error);
                setError('Error fetching admin users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminUsers();
    }, []);

    // Function to handle adding a new admin user
    const handleAddUser = async (newUser) => {
        try {
            // Add the new user to the user list
            setAdminUsers([...adminUsers, newUser]);
            // Hide the add user form
            setShowAddUserForm(false);
        } catch (error) {
            console.error('Error adding admin user:', error);
            // Handle error
        }
    };

    const handleEdit = (id) => {
        setEditingUser(id);
        const userToEdit = adminUsers.find(user => user.id === id);
        // Set default values for editedData
        setEditedData({
            username: userToEdit.username || '',
            password: userToEdit.password || '',
            fname: userToEdit.fname || '',
            lname: userToEdit.lname || '',
            phno: userToEdit.phno || '',
            address: userToEdit.address || ''
        });
    };
    

    const handleSave = async (id) => {
        try {
            await updateAdminUser(id, editedData);
            // Update the adminUsers state to reflect the changes
            const updatedUsers = adminUsers.map(user => {
                if (user.id === id) {
                    return { ...user, ...editedData };
                }
                return user;
            });
            setAdminUsers(updatedUsers);
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating admin user:', error);
            // Handle error
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await deleteAdminUser(id);
            setAdminUsers(adminUsers.filter(user => user.id !== id));
            // You may want to fetch updated user list here if necessary
        } catch (error) {
            console.error('Error deleting admin user:', error);
            // Handle error
        }
    };

    const handleInputChange = (field, value) => {
        setEditedData(prevState => ({
            ...prevState,
            [field]: value
        }));
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
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <div className="table-wrapper">
                <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2>Admin Users</h2>
                            </div>
                            <div className="col-sm-4">
                                <button type="button" className="btn btn-info add-new" onClick={() => setShowAddUserForm(true)}><i className="fa fa-plus"></i> Add New</button>
                            </div>
                        </div>
                    </div>
                    {showAddUserForm && <AddAdminUser onAdd={handleAddUser} />} {/* Render the AddAdminUser component only when showAddUserForm is true */}
                    
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
                            {adminUsers.map(user => (
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

export default AdminUsers;
