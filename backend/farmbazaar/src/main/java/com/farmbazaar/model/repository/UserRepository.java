package com.farmbazaar.model.repository;

import com.farmbazaar.model.entity.AbstractUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<AbstractUser, Integer> {
    
}
