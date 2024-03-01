// farmer.services.js
import http from './http-common';

const getFarmerById = (id) => {
  return http.get(`/farmers/${id}`);
};

const getProductsByFarmerId = (id) => {
  return http.get(`/farmers/${id}/products`);
};

const updateProductStock = (farmerId, productId, quantity) => {
  return http.put(`/farmers/${farmerId}/products/${productId}?quantity=${quantity}`);
};

export { getFarmerById, getProductsByFarmerId, updateProductStock };
