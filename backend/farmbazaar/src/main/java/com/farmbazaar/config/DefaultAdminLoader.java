 package com.farmbazaar.config;

import com.farmbazaar.model.entity.Admin;
import com.farmbazaar.model.repository.AdminRepository;
import com.farmbazaar.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DefaultAdminLoader implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    /**
     * Method to run upon application startup.
     * @param args Command line arguments.
     * @throws Exception If an error occurs during the execution.
     */
    @Override
    public void run(String... args) throws Exception {
        // Check if admin already exists
        if (adminRepository.count() == 0) {
            // Create default admin user
            Admin defaultAdmin = new Admin();
            defaultAdmin.setUsername("admin");
            defaultAdmin.setPassword("admin");
            defaultAdmin.setRole(Role.ADMIN);
            defaultAdmin.setActive(true);
            // Save default admin user
            adminRepository.save(defaultAdmin);
        }
    }
}
