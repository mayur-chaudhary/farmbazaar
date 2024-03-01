import React, { useState, useEffect } from 'react';
import { getAllDeliveryPartnerUsers, createDeliveryPartnerUser, updateDeliveryPartnerUser, deleteDeliveryPartnerUser } from '../../../services/admin.services';
import AddDeliveryPartner from './AddDeliveryPartner';
import NavBarAdmin from '../../NavBars/NavBarAdmin';
import Footer from '../../NavBars/Footer';


const DeliveryPartnerUsers = () => {
    const [deliveryPartnerUsers, setDeliveryPartnerUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Fetch all delivery partner users from the server
    useEffect(() => {
        const fetchDeliveryPartnerUsers = async () => {
            try {
                const response = await getAllDeliveryPartnerUsers();
                setDeliveryPartnerUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching delivery partner users:', error);
                setError('Error fetching delivery partner users. Please try again later.');
                setLoading(false);
            }
        };

        fetchDeliveryPartnerUsers();
    }, []);

    const handleAddUser = async (newUser) => {
        try {
            // Create a new delivery partner user
            await createDeliveryPartnerUser(newUser);
            setAlertMessage('Delivery partner added successfully.');

            // Reset edited data
            setEditedData({});

            // Refetch delivery partner users after adding the new user
            const response = await getAllDeliveryPartnerUsers();
            setDeliveryPartnerUsers(response.data);

            // Close the AddDeliveryPartner component
            setShowAddUserForm(false);
        } catch (error) {
            console.error('Error adding delivery partner user:', error);
            // Handle error
        }
    };

    const handleEdit = (id) => {
        setEditingUser(id);
        const userToEdit = deliveryPartnerUsers.find(user => user.id === id);
        setEditedData(userToEdit);
    };

    const handleSave = async (id) => {
        try {
            // Update the delivery partner user
            await updateDeliveryPartnerUser(id, editedData);
            setEditingUser(null);

            // Refetch delivery partner users after saving the changes
            const response = await getAllDeliveryPartnerUsers();
            setDeliveryPartnerUsers(response.data);
        } catch (error) {
            console.error('Error updating delivery partner user:', error);
            // Handle error
        }
    };

    const handleDelete = async (id) => {
        try {
            // Delete the delivery partner user
            await deleteDeliveryPartnerUser(id);
            setDeliveryPartnerUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            // You may want to fetch updated user list here if necessary
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Check if the error status is 500 (Internal Server Error)
                // This typically indicates a database constraint violation
                // Display an alert message indicating that the delivery partner cannot be deleted
                setAlertMessage('Cannot delete delivery partner user.');
            } else {
                // Handle other errors
                console.error('Error deleting delivery partner user:', error);
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
                                    <h2>Delivery Partner Users</h2>
                                </div>
                                <div className="col-sm-4">
                                    <button type="button" className="btn btn-info add-new" onClick={() => setShowAddUserForm(true)}><i className="fa fa-plus"></i> Add New</button>
                                </div>
                            </div>
                        </div>
                        {showAddUserForm && <AddDeliveryPartner onAddUser={handleAddUser} onClose={handleCloseAddUserForm} />}

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
                                {deliveryPartnerUsers.map(user => (
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

export default DeliveryPartnerUsers;
