package com.farmbazaar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.farmbazaar.model.entity.Farmer;
import com.farmbazaar.model.entity.Product;
import com.farmbazaar.service.FarmerService;

import java.util.List;

@RestController
@RequestMapping("/farmers")
@CrossOrigin(origins = "http://localhost:3000")
public class FarmerController {

    @Autowired
    private FarmerService farmerService;

    @GetMapping("/{farmerId}")
    public ResponseEntity<Farmer> getFarmerById(@PathVariable int farmerId) {
        Farmer farmer = farmerService.getFarmerById(farmerId);
        if (farmer != null) {
            return ResponseEntity.ok(farmer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{farmerId}/products")
    public ResponseEntity<List<Product>> getProductsByFarmerId(@PathVariable int farmerId) {
        List<Product> products = farmerService.getProductsByFarmerId(farmerId);
        if (!products.isEmpty()) {
            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{farmerId}/products/{productId}")
    public ResponseEntity<String> updateProductStock(@PathVariable int farmerId, @PathVariable int productId, @RequestParam double quantity) {
        String response = farmerService.updateProductStock(farmerId, productId, quantity);
        if (response.startsWith("Error")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
