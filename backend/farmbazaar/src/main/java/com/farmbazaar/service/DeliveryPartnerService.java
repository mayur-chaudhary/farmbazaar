package com.farmbazaar.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.farmbazaar.model.entity.Order;
import com.farmbazaar.model.repository.OrderRepository;

@Service
public class DeliveryPartnerService {

    @Autowired
    private OrderRepository orderRepository;

    // Method to get all orders for a specific delivery partner
    public List<Order> getAllOrdersForDeliveryPartner(int deliveryPartnerId) {
        return orderRepository.findByDeliveryPartnerId(deliveryPartnerId);
    }

    // Method to update the delivery status of an order
    public Order updateDeliveryStatus(int orderId, String deliveryStatus, Date deliveryDate) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            // Remove surrounding quotes from the deliveryStatus
            deliveryStatus = deliveryStatus.replaceAll("^\"|\"$", "");

            order.setDeliveryStatus(deliveryStatus);
            order.setDeliveryDate(deliveryDate); // Set delivery date

            orderRepository.save(order);
        }
        return order;
    }

}

