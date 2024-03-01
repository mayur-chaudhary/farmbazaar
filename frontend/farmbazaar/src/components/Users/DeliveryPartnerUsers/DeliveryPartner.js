import React, { useState, useEffect } from 'react';
import { getAllOrdersForDeliveryPartner, updateDeliveryStatus } from '../../../services/delivery-partner.services';
import NavBarDeliveryPartner from '../../NavBars/NavBarDeliveryPartner';
import Footer from '../../NavBars/Footer';

const DeliveryPartner = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingOrder, setEditingOrder] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected delivery date

    // Define deliveryStatusOptions
    const deliveryStatusOptions = [
        { value: '', label: 'Select Status' },
        { value: 'Confirmed Order', label: 'Confirmed Order' },
        { value: 'Processing Order', label: 'Processing Order' },
        { value: 'Order Dispatched', label: 'Order Dispatched' },
        { value: 'Order in Route', label: 'Order in Route' },
        { value: 'Out for Delivery', label: 'Out for Delivery' },
        { value: 'Delivered', label: 'Delivered' }
    ];


    // Fetch orders for the delivery partner
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Assuming you have a way to retrieve the delivery partner ID from session storage
                const deliveryPartnerId = JSON.parse(sessionStorage.getItem('userData')).id;
                const response = await getAllOrdersForDeliveryPartner(deliveryPartnerId);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Error fetching orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Function to handle editing the delivery status of an order
    const handleEdit = (orderId) => {
        setEditingOrder(orderId);
    };

    // Function to handle saving the edited delivery status
    const handleSave = async (orderId) => {
        try {
            await updateDeliveryStatus(orderId, selectedStatus, selectedDate); // Pass selected date to updateDeliveryStatus
            setEditingOrder(null);
            // Fetch updated order list
            const deliveryPartnerId = JSON.parse(sessionStorage.getItem('userData')).id;
            const response = await getAllOrdersForDeliveryPartner(deliveryPartnerId);
            setOrders(response.data);
        } catch (error) {
            console.error('Error updating delivery status:', error);
            // Handle error
        }
    };

    // Function to handle selection change in the dropdown
    const handleSelectChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    // Function to handle date change in the date picker
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); // Update selected date with the value from the input
    };

    // Render loading state if data is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error state if there is an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render the order table
    return (
        <>
        <NavBarDeliveryPartner />
        <div className="container-lg">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>Delivery Partner Orders</h2>
                            </div>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Total Amount</th>
                                <th>Delivery Address</th>
                                <th>Delivery Status</th>
                                <th>Delivery Date</th> {/* Add Delivery Date column */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>{order.deliveryAddress}</td>
                                    <td>
                                        {editingOrder === order.id ? (
                                            <select value={selectedStatus} onChange={handleSelectChange} className="form-control">
                                                {deliveryStatusOptions.map(option => (
                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            order.deliveryStatus // No quotes added here
                                        )}
                                    </td>
                                    <td>
                                        {editingOrder === order.id ? (
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            order.deliveryDate // Render delivery date here
                                        )}
                                    </td>
                                    <td>
                                        {editingOrder === order.id ? (
                                            <button onClick={() => handleSave(order.id)} className="btn btn-success">Save</button>
                                        ) : (
                                            <button onClick={() => handleEdit(order.id)} className="btn btn-primary">Edit Status</button>
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

export default DeliveryPartner;
