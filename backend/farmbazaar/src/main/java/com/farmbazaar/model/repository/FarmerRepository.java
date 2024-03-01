package com.farmbazaar.model.repository;

import com.farmbazaar.model.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Integer> {
    Farmer findByUsername(String username);
}
