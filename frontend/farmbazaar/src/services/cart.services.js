import http from './http-common';

const getCartItems = async () => {
  return http.get('/cart/items');
};

const updateCartItem = async (itemId, newQuantity) => {
  return http.put(`/cart/items/${itemId}`, { quantity: newQuantity });
};

const removeCartItem = async (itemId) => {
  return http.delete(`/cart/items/${itemId}`);
};

const getCartItemsByUserId = (userId) => {
    return http.get(`/cart/${userId}/items`);
  };

export { getCartItems, updateCartItem, removeCartItem, getCartItemsByUserId };
