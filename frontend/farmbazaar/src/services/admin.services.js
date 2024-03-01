// admin.services.js
import http from './http-common';

// Admin Users CRUD operations
const createAdminUser = (data) => {
  return http.post('/admin/admin-users', data);
};

const updateAdminUser = (id, data) => {
  return http.put(`/admin/admin-users/${id}`, data);
};

const deleteAdminUser = (id) => {
  return http.delete(`/admin/admin-users/${id}`);
};

const getAllAdminUsers = () => {
  return http.get('/admin/admin-users');
};

// Farmer Users CRUD operations
const createFarmerUser = (data) => {
  return http.post('/admin/farmer-users', data);
};

const updateFarmerUser = (id, data) => {
  return http.put(`/admin/farmer-users/${id}`, data);
};

const deleteFarmerUser = (id) => {
  return http.delete(`/admin/farmer-users/${id}`);
};

const getAllFarmerUsers = () => {
  return http.get('/admin/farmer-users');
};

// Delivery Partner Users CRUD operations
const createDeliveryPartnerUser = (data) => {
  return http.post('/admin/delivery-partner-users', data);
};

const updateDeliveryPartnerUser = (id, data) => {
  return http.put(`/admin/delivery-partner-users/${id}`, data);
};

const deleteDeliveryPartnerUser = (id) => {
  return http.delete(`/admin/delivery-partner-users/${id}`);
};

const getAllDeliveryPartnerUsers = () => {
  return http.get('/admin/delivery-partner-users');
};

// Customer Users CRUD operations
const createCustomerUser = (data) => {
  return http.post('/admin/customer-users', data);
};

const updateCustomerUser = (id, data) => {
  return http.put(`/admin/customer-users/${id}`, data);
};

const deleteCustomerUser = (id) => {
  return http.delete(`/admin/customer-users/${id}`);
};

const getAllCustomerUsers = () => {
  return http.get('/admin/customer-users');
};

// Category CRUD operations
const createCategory = (data) => {
  return http.post('/admin/categories', data);
};

const updateCategory = (id, data) => {
  return http.put(`/admin/categories/${id}`, data);
};

const deleteCategory = (id) => {
  return http.delete(`/admin/categories/${id}`);
};

const getAllCategories = () => {
  return http.get('/admin/categories');
};

// Product CRUD operations
const createProduct = (data) => {
  return http.post('/admin/products', data, {
      headers: {
          'Content-Type': 'multipart/form-data' // Ensure proper content type
      }
  });
};

const updateProductAPI = (id, updatedData) => {
  return http.put(`/admin/products/${id}`, updatedData);
};

const updateProduct = (id, formData) => {
  return http.put(`/admin/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


const deleteProduct = (id) => {
  return http.delete(`/admin/products/${id}`);
};

const getAllProducts = () => {
  return http.get('/admin/products');
};

// Additional operations
const assignProductsToFarmer = (farmerId, productIds) => {
  return http.post(`/admin/assign/${farmerId}`, productIds);
};

const getProductsByFarmerId = (farmerId) => {
  return http.get(`/admin/${farmerId}/products`);
};

const getAllOrders = () => {
  return http.get('/admin/orders');
};

export {
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getAllAdminUsers,
  createFarmerUser,
  updateFarmerUser,
  deleteFarmerUser,
  getAllFarmerUsers,
  createDeliveryPartnerUser,
  updateDeliveryPartnerUser,
  deleteDeliveryPartnerUser,
  getAllDeliveryPartnerUsers,
  createCustomerUser,
  updateCustomerUser,
  deleteCustomerUser,
  getAllCustomerUsers,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  createProduct,
  updateProductAPI,
  updateProduct,
  deleteProduct,
  getAllProducts,
  assignProductsToFarmer,
  getProductsByFarmerId,
  getAllOrders
};
