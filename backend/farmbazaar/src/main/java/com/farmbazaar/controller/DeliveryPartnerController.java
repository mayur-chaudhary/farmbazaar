package com.farmbazaar.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.farmbazaar.dto.UpdateDeliveryRequest;
import com.farmbazaar.model.entity.Order;
import com.farmbazaar.service.DeliveryPartnerService;

import java.util.List;

@RestController
@RequestMapping("/delivery-partner")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryPartnerController {

    @Autowired
    private DeliveryPartnerService deliveryPartnerService;

    // Endpoint to get all orders for a specific delivery partner
    @GetMapping("/{deliveryPartnerId}/orders")
    public List<Order> getAllOrdersForDeliveryPartner(@PathVariable int deliveryPartnerId) {
        return deliveryPartnerService.getAllOrdersForDeliveryPartner(deliveryPartnerId);
    }

    // Endpoint to update the delivery status of an order including delivery date
    @PutMapping("/orders/{orderId}")
    public Order updateDeliveryStatus(@PathVariable int orderId, @RequestBody UpdateDeliveryRequest updateRequest) {
        return deliveryPartnerService.updateDeliveryStatus(orderId, updateRequest.getDeliveryStatus(), updateRequest.getDeliveryDate());
    }
}
