package com.farmbazaar.config;

import com.farmbazaar.model.entity.DeliveryPartner;
import com.farmbazaar.model.repository.DeliveryPartnerRepository;
import com.farmbazaar.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DefaultDeliveryPartnerLoader implements CommandLineRunner {

    @Autowired
    private DeliveryPartnerRepository deliveryPartnerRepository;

    /**
     * Method to run upon application startup.
     * @param args Command line arguments.
     * @throws Exception If an error occurs during the execution.
     */
    @Override
    public void run(String... args) throws Exception {
        // Check if default delivery partner already exists
        if (deliveryPartnerRepository.count() == 0) {
            // Create default delivery partner
            DeliveryPartner defaultDeliveryPartner = new DeliveryPartner();
            defaultDeliveryPartner.setUsername("delivery");
            defaultDeliveryPartner.setPassword("delivery");
            defaultDeliveryPartner.setRole(Role.DELIVERY_PARTNER);
            defaultDeliveryPartner.setActive(true);
            // Save default delivery partner
            deliveryPartnerRepository.save(defaultDeliveryPartner);
        }
    }
}
