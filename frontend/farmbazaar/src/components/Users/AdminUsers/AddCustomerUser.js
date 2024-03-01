// AddCustomerUser.js
import React, { useState } from 'react';
import { createCustomerUser } from '../../../services/admin.services';

const AddCustomerUser = ({ onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fname: '',
        lname: '',
        phno: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCustomerUser(formData);
            onClose(); // Call onClose function to close the AddCustomerUser component
            // Handle successful user creation
            console.log('Customer user created successfully:', formData);
        } catch (error) {
            console.error('Error creating customer user:', error);
            // Handle error
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Add New Customer User</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fname" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="fname" name="fname" value={formData.fname} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lname" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lname" name="lname" value={formData.lname} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phno" className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" id="phno" name="phno" value={formData.phno} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCustomerUser;
