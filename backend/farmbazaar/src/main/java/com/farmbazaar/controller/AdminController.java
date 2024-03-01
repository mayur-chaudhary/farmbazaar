package com.farmbazaar.controller;

import com.farmbazaar.dto.UserDetailsDTO;
import com.farmbazaar.dto.UserRequestDTO;
import com.farmbazaar.model.entity.*;
import com.farmbazaar.service.AdminService;
import com.farmbazaar.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@Autowired
	private ProductService productService;

	// CRUD operations for Admin users

	@PostMapping("/admin-users")
	public Admin createAdminUser(@RequestBody Admin user) {
		return adminService.createAdminUser(user);
	}

	@PutMapping("/admin-users/{id}")
	public Admin updateAdminUser(@PathVariable int id, @RequestBody Admin userDetails) {
		return adminService.updateAdminUser(id, userDetails);
	}

	@DeleteMapping("/admin-users/{id}")
	public void deleteAdminUser(@PathVariable int id) {
		adminService.deleteAdminUser(id);
	}

	@GetMapping("/admin-users")
	public List<Admin> getAllAdminUsers() {
		return adminService.getAllAdminUsers();
	}

	// CRUD operations for Farmer users

	@PostMapping("/farmer-users")
	public Farmer createFarmerUser(@RequestBody Farmer user) {
		return adminService.createFarmerUser(user);
	}

	@PutMapping("/farmer-users/{id}")
	public Farmer updateFarmerUser(@PathVariable int id, @RequestBody Farmer userDetails) {
		return adminService.updateFarmerUser(id, userDetails);
	}

	@DeleteMapping("/farmer-users/{id}")
	public void deleteFarmerUser(@PathVariable int id) {
		adminService.deleteFarmerUser(id);
	}

	@GetMapping("/farmer-users")
	public List<Farmer> getAllFarmerUsers() {
		return adminService.getAllFarmerUsers();
	}

	// CRUD operations for Delivery Partner users

	@PostMapping("/delivery-partner-users")
	public DeliveryPartner createDeliveryPartnerUser(@RequestBody DeliveryPartner user) {
		return adminService.createDeliveryPartnerUser(user);
	}

	@PutMapping("/delivery-partner-users/{id}")
	public DeliveryPartner updateDeliveryPartnerUser(@PathVariable int id, @RequestBody DeliveryPartner userDetails) {
		return adminService.updateDeliveryPartnerUser(id, userDetails);
	}

	@DeleteMapping("/delivery-partner-users/{id}")
	public void deleteDeliveryPartnerUser(@PathVariable int id) {
		adminService.deleteDeliveryPartnerUser(id);
	}

	@GetMapping("/delivery-partner-users")
	public List<DeliveryPartner> getAllDeliveryPartnerUsers() {
		return adminService.getAllDeliveryPartnerUsers();
	}

	// CRUD operations for Customer users

	@PostMapping("/customer-users")
	public Customer createCustomerUser(@RequestBody Customer user) {
		return adminService.createCustomerUser(user);
	}

	@PutMapping("/customer-users/{id}")
	public Customer updateCustomerUser(@PathVariable int id, @RequestBody Customer userDetails) {
		return adminService.updateCustomerUser(id, userDetails);
	}

	@DeleteMapping("/customer-users/{id}")
	public void deleteCustomerUser(@PathVariable int id) {
		adminService.deleteCustomerUser(id);
	}

	@GetMapping("/customer-users")
	public List<Customer> getAllCustomerUsers() {
		return adminService.getAllCustomerUsers();
	}

	// CRUD operations for categories

	@PostMapping("/categories")
	public Category createCategory(@RequestBody Category category) {
		return adminService.createCategory(category);
	}

	@PutMapping("/categories/{id}")
	public Category updateCategory(@PathVariable int id, @RequestBody Category categoryDetails) {
		return adminService.updateCategory(id, categoryDetails);
	}

	@DeleteMapping("/categories/{id}")
	public void deleteCategory(@PathVariable int id) {
		adminService.deleteCategory(id);
	}

	@GetMapping("/categories")
	public List<Category> getAllCategories() {
		return adminService.getAllCategories();
	}

	// CRUD operations for products

	@PostMapping("/products")
	public Product createProduct(@RequestParam("name") String name, @RequestParam("price") double price,
			@RequestParam("quantity") double quantity, @RequestParam("pre_order_quantity") double preOrderQuantity,
			@RequestParam("category_id") int categoryId, @RequestParam("imageFile") MultipartFile imageFile) {
		return productService.createProduct(name, price, quantity, preOrderQuantity, categoryId, imageFile);
	}

//    @PutMapping("/products/{id}")
//    public Product updateProduct(@PathVariable int id, @RequestParam("name") String name, @RequestParam("price") double price, @RequestParam("quantity") double quantity, @RequestParam("pre_order_quantity") double preOrderQuantity) {
//        return productService.updateProduct(id, name, price, quantity, preOrderQuantity);
//    }

//    @PutMapping("/products/{id}")
//    public Product updateProduct(@PathVariable int id, @RequestParam("imageFile") MultipartFile imageFile, @RequestParam("name") String name, @RequestParam("price") double price, @RequestParam("quantity") double quantity, @RequestParam("pre_order_quantity") double preOrderQuantity) {
//        return productService.updateProduct(id, imageFile, name, price, quantity, preOrderQuantity);
//    }

	@PutMapping("/products/{id}")
	public Product updateProduct(@PathVariable int id, @RequestParam(required = false) MultipartFile imageFile,
			@RequestParam("name") String name, @RequestParam("price") double price,
			@RequestParam("quantity") double quantity, @RequestParam("pre_order_quantity") double preOrderQuantity) {
		return productService.updateProduct(id, imageFile, name, price, quantity, preOrderQuantity);
	}

	@DeleteMapping("/products/{id}")
	public void deleteProduct(@PathVariable int id) {
		productService.deleteProduct(id);
	}

	@GetMapping("/products")
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}

	// Assign product to farmer

	@PostMapping("/assign/{farmerId}")
	public void assignProductsToFarmer(@PathVariable Integer farmerId, @RequestBody List<Integer> productIds) {
		adminService.assignProductsToFarmer(farmerId, productIds);
	}

	// Endpoint to get products assigned to a specific farmer
	@GetMapping("/{farmerId}/products")
	public List<Product> getProductsByFarmerId(@PathVariable int farmerId) {
		return adminService.getProductsByFarmerId(farmerId);
	}

	// creating user based on role (signup)
	@PostMapping("/create-user")
	public ResponseEntity<?> createUser(@RequestBody UserRequestDTO userRequestDTO) {
		return adminService.createUser(userRequestDTO);
	}

	// Method to get user details by ID for all user types
	@GetMapping("/users/{id}")
	public ResponseEntity<List<UserDetailsDTO>> getUserById(@PathVariable int id) {
		return adminService.getUserById(id);
	}

	// Method to get all orders
	@GetMapping("/orders")
	public List<Order> getAllOrders() {
		return adminService.getAllOrders();
	}
}
