// customer.services.js
import http from './http-common';

const getAllProducts = () => {
  return http.get(`/customer/products`);
};

const addToCart = (customerId, cartItemRequest) => {
  return http.post(`/customer/cart/${customerId}/add`, cartItemRequest);
};

const getCartItems = (customerId) => {
  return http.get(`/customer/cart/${customerId}/items`);
};

const checkoutOrder = (customerId, checkoutRequest) => {
  return http.post(`/customer/cart/${customerId}/checkout`, checkoutRequest);
};

const getOrdersByCustomerId = (customerId) => {
  return http.get(`/customer/${customerId}/orders`);
};

export { getAllProducts, addToCart, getCartItems, checkoutOrder, getOrdersByCustomerId};
