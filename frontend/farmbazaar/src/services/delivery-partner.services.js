// delivery-partner.services.js
import http from './http-common';

const getAllOrdersForDeliveryPartner = (deliveryPartnerId) => {
  return http.get(`/delivery-partner/${deliveryPartnerId}/orders`);
};

const updateDeliveryStatus = (orderId, deliveryStatus, deliveryDate) => {
    return http.put(`/delivery-partner/orders/${orderId}`, { deliveryStatus, deliveryDate });
  };

export { getAllOrdersForDeliveryPartner, updateDeliveryStatus };
