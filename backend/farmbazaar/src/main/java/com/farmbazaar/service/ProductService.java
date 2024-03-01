package com.farmbazaar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.farmbazaar.model.entity.Product;
import com.farmbazaar.model.entity.Category;
import com.farmbazaar.model.entity.Farmer;
import com.farmbazaar.model.repository.ProductRepository;
import com.farmbazaar.model.repository.CategoryRepository;
import com.farmbazaar.model.repository.FarmerRepository;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final FarmerRepository farmerRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, FarmerRepository farmerRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.farmerRepository = farmerRepository;
    }

    public Product createProduct(String name, double price, double quantity, double preOrderQuantity,
                                 int categoryId, MultipartFile imageFile) {
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setPre_order_quantity(preOrderQuantity);

        Category category = fetchCategoryById(categoryId);
        product.setCategory(category);

        try {
            if (imageFile != null) {
                product.setImage(imageFile.getBytes());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return productRepository.save(product);
    }

//    public Product updateProduct(int id, String name, double price, double quantity, double preOrderQuantity) {
//        Product product = productRepository.findById(id).orElse(null);
//        if (product != null) {
//            product.setName(name);
//            product.setPrice(price);
//            product.setQuantity(quantity);
//            product.setPre_order_quantity(preOrderQuantity);
//            return productRepository.save(product);
//        }
//        return null;
//    }
    
    public Product updateProduct(int id, MultipartFile imageFile, String name, double price, double quantity, double preOrderQuantity) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            try {
                if (imageFile != null) {
                    product.setImage(imageFile.getBytes());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            product.setName(name);
            product.setPrice(price);
            product.setQuantity(quantity);
            product.setPre_order_quantity(preOrderQuantity);
            return productRepository.save(product);
        }
        return null;
    }

//    public void deleteProduct(int id) {
//        productRepository.deleteById(id);
//    }
    
    public void deleteProduct(int productId) {
        // Find the product
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product not found")); // Provide a Supplier lambda function

        // Remove associations with farmers
        for (Farmer farmer : product.getFarmers()) {
            farmer.getProducts().remove(product);
            farmerRepository.save(farmer); // Update farmer to reflect changes
        }

        // Delete the product
        productRepository.delete(product);
    }

    

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    private Category fetchCategoryById(int categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }
}
