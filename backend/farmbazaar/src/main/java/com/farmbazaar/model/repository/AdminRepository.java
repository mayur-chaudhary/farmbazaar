package com.farmbazaar.model.repository;

import com.farmbazaar.model.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    // Method to find an Admin entity by username
    Admin findByUsername(String username);
}
