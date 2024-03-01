package com.farmbazaar.service;

import com.farmbazaar.dto.UserDetailsDTO;
import com.farmbazaar.dto.UserRequestDTO;
import com.farmbazaar.enums.Role;
import com.farmbazaar.model.entity.*;
import com.farmbazaar.model.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private DeliveryPartnerRepository deliveryPartnerRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private OrderRepository orderRepository;

    public Admin createAdminUser(Admin user) {
        user.setRole(Role.ADMIN);
        return adminRepository.save(user);
    }

    public Admin updateAdminUser(int id, Admin userDetails) {
        Admin user = adminRepository.findById(id).orElse(null);
        if (user != null) {
            user.setUsername(userDetails.getUsername());
            user.setPassword(userDetails.getPassword());
            user.setFname(userDetails.getFname());
            user.setLname(userDetails.getLname());
            user.setPhno(userDetails.getPhno());
            user.setAddress(userDetails.getAddress());
            user.setRole(userDetails.getRole());
            user.setActive(userDetails.isActive());
            // Update other user details as needed
            return adminRepository.save(user);
        }
        return null; // Handle not found
    }

    public void deleteAdminUser(int id) {
        adminRepository.deleteById(id);
    }

    public List<Admin> getAllAdminUsers() {
        return adminRepository.findAll();
    }

    // CRUD operations for Farmer users

    public Farmer createFarmerUser(Farmer user) {
        user.setRole(Role.FARMER);
        return farmerRepository.save(user);
    }

    public Farmer updateFarmerUser(int id, Farmer userDetails) {
        Farmer user = farmerRepository.findById(id).orElse(null);
        if (user != null) {
            user.setUsername(userDetails.getUsername());
            user.setPassword(userDetails.getPassword());
            user.setFname(userDetails.getFname());
            user.setLname(userDetails.getLname());
            user.setPhno(userDetails.getPhno());
            user.setAddress(userDetails.getAddress());
            user.setRole(userDetails.getRole());
            user.setActive(userDetails.isActive());
            // Update other user details as needed
            return farmerRepository.save(user);
        }
        return null; // Handle not found
    }

    public void deleteFarmerUser(int id) {
        farmerRepository.deleteById(id);
    }

    public List<Farmer> getAllFarmerUsers() {
        return farmerRepository.findAll();
    }

    // CRUD operations for Delivery Partner users

    public DeliveryPartner createDeliveryPartnerUser(DeliveryPartner user) {
        user.setRole(Role.DELIVERY_PARTNER);
        return deliveryPartnerRepository.save(user);
    }

    public DeliveryPartner updateDeliveryPartnerUser(int id, DeliveryPartner userDetails) {
        DeliveryPartner user = deliveryPartnerRepository.findById(id).orElse(null);
        if (user != null) {
            user.setUsername(userDetails.getUsername());
            user.setPassword(userDetails.getPassword());
            user.setFname(userDetails.getFname());
            user.setLname(userDetails.getLname());
            user.setPhno(userDetails.getPhno());
            user.setAddress(userDetails.getAddress());
            user.setRole(userDetails.getRole());
            user.setActive(userDetails.isActive());
            // Update other user details as needed
            return deliveryPartnerRepository.save(user);
        }
        return null; // Handle not found
    }

    public void deleteDeliveryPartnerUser(int id) {
        deliveryPartnerRepository.deleteById(id);
    }

    public List<DeliveryPartner> getAllDeliveryPartnerUsers() {
        return deliveryPartnerRepository.findAll();
    }

    // CRUD operations for Customer users

    public Customer createCustomerUser(Customer user) {
        user.setRole(Role.CUSTOMER);
        return customerRepository.save(user);
    }

    public Customer updateCustomerUser(int id, Customer userDetails) {
        Customer user = customerRepository.findById(id).orElse(null);
        if (user != null) {
            user.setUsername(userDetails.getUsername());
            user.setPassword(userDetails.getPassword());
            user.setFname(userDetails.getFname());
            user.setLname(userDetails.getLname());
            user.setPhno(userDetails.getPhno());
            user.setAddress(userDetails.getAddress());
            user.setRole(userDetails.getRole());
            user.setActive(userDetails.isActive());
            // Update other user details as needed
            return customerRepository.save(user);
        }
        return null; // Handle not found
    }

    public void deleteCustomerUser(int id) {
        customerRepository.deleteById(id);
    }

    public List<Customer> getAllCustomerUsers() {
        return customerRepository.findAll();
    }

    // CRUD operations for categories

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(int id, Category categoryDetails) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setName(categoryDetails.getName());
            // Update other category details as needed
            return categoryRepository.save(category);
        }
        return null; // Handle not found
    }

    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Assign product to farmer

    public void assignProductsToFarmer(Integer farmerId, List<Integer> productIds) {
        Farmer farmer = farmerRepository.findById(farmerId).orElse(null);
        if (farmer != null) {
            List<Product> products = productRepository.findAllById(productIds);
            products.forEach(product -> farmer.getProducts().add(product));
            farmerRepository.save(farmer);
        }
    }

    // Endpoint to get products assigned to a specific farmer
    public List<Product> getProductsByFarmerId(int farmerId) {
        Farmer farmer = farmerRepository.findById(farmerId).orElse(null);
        if (farmer != null) {
            return farmer.getProducts();
        } else {
            // Handle case where farmer with given ID is not found
            return null; // Or return an empty list or throw an exception as per your requirement
        }
    }

    // creating user based on role (signup)
    public ResponseEntity<?> createUser(UserRequestDTO userRequestDTO) {
        try {
            // Convert DTO to AbstractUser object
            AbstractUser user = userRequestDTO.toUser();

            // Handle user creation based on role
            switch (user.getRole()) {
                case ADMIN:
                    // Create an instance of Admin
                    Admin admin = new Admin();
                    // Set common fields
                    admin.setUsername(user.getUsername());
                    admin.setPassword(user.getPassword());
                    admin.setFname(user.getFname());
                    admin.setLname(user.getLname());
                    admin.setPhno(user.getPhno());
                    admin.setAddress(user.getAddress());
                    admin.setRole(user.getRole());
                    // Save Admin entity
                    adminRepository.save(admin);
                    return ResponseEntity.ok(admin);
                case FARMER:
                    // Create an instance of Farmer
                    Farmer farmer = new Farmer();
                    // Set common fields
                    farmer.setUsername(user.getUsername());
                    farmer.setPassword(user.getPassword());
                    farmer.setFname(user.getFname());
                    farmer.setLname(user.getLname());
                    farmer.setPhno(user.getPhno());
                    farmer.setAddress(user.getAddress());
                    farmer.setRole(user.getRole());
                    // Save Farmer entity
                    farmerRepository.save(farmer);
                    return ResponseEntity.ok(farmer);
                case DELIVERY_PARTNER:
                    // Create an instance of DeliveryPartner
                    DeliveryPartner deliveryPartner = new DeliveryPartner();
                    // Set common fields
                    deliveryPartner.setUsername(user.getUsername());
                    deliveryPartner.setPassword(user.getPassword());
                    deliveryPartner.setFname(user.getFname());
                    deliveryPartner.setLname(user.getLname());
                    deliveryPartner.setPhno(user.getPhno());
                    deliveryPartner.setAddress(user.getAddress());
                    deliveryPartner.setRole(user.getRole());
                    // Save DeliveryPartner entity
                    deliveryPartnerRepository.save(deliveryPartner);
                    return ResponseEntity.ok(deliveryPartner);
                case CUSTOMER:
                    // Create an instance of Customer
                    Customer customer = new Customer();
                    // Set common fields
                    customer.setUsername(user.getUsername());
                    customer.setPassword(user.getPassword());
                    customer.setFname(user.getFname());
                    customer.setLname(user.getLname());
                    customer.setPhno(user.getPhno());
                    customer.setAddress(user.getAddress());
                    customer.setRole(user.getRole());
                    // Save Customer entity
                    customerRepository.save(customer);
                    return ResponseEntity.ok(customer);
                default:
                    return ResponseEntity.badRequest().body("Invalid role. Please select a valid role.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user.");
        }
    }

    // Method to get user details by ID for all user types
    public ResponseEntity<List<UserDetailsDTO>> getUserById(int id) {
        List<UserDetailsDTO> userDetailsList = new ArrayList<>();

        adminRepository.findById(id).ifPresent(admin -> {
            UserDetailsDTO userDetails = new UserDetailsDTO();
            userDetails.setId(admin.getId());
            userDetails.setUsername(admin.getUsername());
            userDetails.setRole(Role.ADMIN.toString());
            userDetailsList.add(userDetails);
        });

        farmerRepository.findById(id).ifPresent(farmer -> {
            UserDetailsDTO userDetails = new UserDetailsDTO();
            userDetails.setId(farmer.getId());
            userDetails.setUsername(farmer.getUsername());
            userDetails.setRole(Role.FARMER.toString());
            userDetailsList.add(userDetails);
        });

        deliveryPartnerRepository.findById(id).ifPresent(deliveryPartner -> {
            UserDetailsDTO userDetails = new UserDetailsDTO();
            userDetails.setId(deliveryPartner.getId());
            userDetails.setUsername(deliveryPartner.getUsername());
            userDetails.setRole(Role.DELIVERY_PARTNER.toString());
            userDetailsList.add(userDetails);
        });

        customerRepository.findById(id).ifPresent(customer -> {
            UserDetailsDTO userDetails = new UserDetailsDTO();
            userDetails.setId(customer.getId());
            userDetails.setUsername(customer.getUsername());
            userDetails.setRole(Role.CUSTOMER.toString());
            userDetailsList.add(userDetails);
        });

        if (userDetailsList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(userDetailsList);
        }
    }
    
    // Method to get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
