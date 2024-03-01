package com.farmbazaar.service;

import com.farmbazaar.model.entity.AbstractUser;
import com.farmbazaar.model.repository.AdminRepository;
import com.farmbazaar.model.repository.CustomerRepository;
import com.farmbazaar.model.repository.DeliveryPartnerRepository;
import com.farmbazaar.model.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DeliveryPartnerRepository deliveryPartnerRepository;

    public AbstractUser authenticateUser(LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        
        AbstractUser user = adminRepository.findByUsername(username);
        if (user == null) {
            user = farmerRepository.findByUsername(username);
        }
        if (user == null) {
            user = customerRepository.findByUsername(username);
        }
        if (user == null) {
            user = deliveryPartnerRepository.findByUsername(username);
        }
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public static class LoginRequest {
        private String username;
        private String password;

        // Getters and setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
