package com.farmbazaar.controller;

import com.farmbazaar.service.LoginService;
import com.farmbazaar.service.LoginService.LoginRequest;
import com.farmbazaar.model.entity.AbstractUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        AbstractUser user = loginService.authenticateUser(loginRequest);
        if (user != null) {
            return ResponseEntity.ok(user); // Return user data if login successful
        }

        // Authentication failed
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
