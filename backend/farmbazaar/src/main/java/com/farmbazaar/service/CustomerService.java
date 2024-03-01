package com.farmbazaar.service;

import com.farmbazaar.dto.CartItemRequest;
import com.farmbazaar.dto.CheckoutRequest;
import com.farmbazaar.model.entity.Cart;
import com.farmbazaar.model.entity.CartItem;
import com.farmbazaar.model.entity.Customer;
import com.farmbazaar.model.entity.DeliveryPartner;
import com.farmbazaar.model.entity.Order;
import com.farmbazaar.model.entity.OrderItem;
import com.farmbazaar.model.entity.Product;
import com.farmbazaar.model.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private DeliveryPartnerRepository deliveryPartnerRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        // Encode image data to Base64 before sending
        products.forEach(Product::encodeImageDataToBase64);
        return products;
    }

    public String addToCart(int customerId, CartItemRequest cartItemRequest) {
        Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
        if (!optionalCustomer.isPresent()) {
            return "Error: Customer not found";
        }
        Customer customer = optionalCustomer.get();

        // Check if the customer has a cart, create a new one if not
        Cart cart = customer.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setCustomer(customer);
            customer.setCart(cart); // Associate cart with customer
        }

        Optional<Product> optionalProduct = productRepository.findById(cartItemRequest.getProductId());
        if (!optionalProduct.isPresent()) {
            return "Error: Product not found";
        }
        Product product = optionalProduct.get();

        // Check if the cart already contains the product, update quantity if it does
        CartItem existingCartItem = cart.getCartItemByProductId(product.getId());
        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItemRequest.getQuantity());
        } else {
            // Create new CartItem and add it to the cart
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(cartItemRequest.getQuantity());
            cartItem.setPrice(product.getPrice());
            cart.addCartItem(cartItem); // Associate the CartItem with the Cart
        }

        cart.calculateTotalPrice();

        cartRepository.save(cart);

        return "Product added to cart successfully";
    }

    public List<CartItem> getCartItems(int customerId) {
        Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
        if (!optionalCustomer.isPresent()) {
            return new ArrayList<>();
        }
        Customer customer = optionalCustomer.get();

        Cart cart = customer.getCart();
        if (cart == null) {
            return new ArrayList<>(); // Return an empty list if cart is null
        }

        List<CartItem> cartItems = cart.getCartItems();

        // Encode image data to Base64 for each product
        return cartItems.stream()
                .peek(item -> item.getProduct().encodeImageDataToBase64()) // Ensure that imageBase64 is populated
                .collect(Collectors.toList());
    }

    public String checkoutCart(int customerId, CheckoutRequest checkoutRequest) {
        // Retrieve customer and cart
        Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
        if (!optionalCustomer.isPresent()) {
            return "Error: Customer not found";
        }
        Customer customer = optionalCustomer.get();
        Cart cart = customer.getCart();
        if (cart == null || cart.getCartItems().isEmpty()) {
            return "Error: Cart is empty";
        }

        // Create a new order
        Order order = new Order();
        order.setCustomer(customer);
        order.setTotalAmount(cart.getTotalPrice()); // Set total amount from cart
        order.setOrderStatus("Pending"); // Set initial order status
        order.setDeliveryStatus("Pending"); // Set initial delivery status
        order.setDeliveryAddress(checkoutRequest.getDeliveryAddress()); // Set delivery address

        // Set expected delivery date
        Date expectedDeliveryDate;
        if (checkoutRequest.getOrderType().equals("pre-order")) {
            String deliveryDateStr = checkoutRequest.getDeliveryDate();
            if (deliveryDateStr != null && !deliveryDateStr.isEmpty()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    expectedDeliveryDate = sdf.parse(deliveryDateStr);
                    order.setExpectedDeliveryDate(expectedDeliveryDate);
                } catch (ParseException e) {
                    return "Error: Invalid delivery date format";
                }
            } else {
                return "Error: Delivery date is required for pre-orders";
            }
        } else {
            // Calculate next to next day
            Calendar nextToNextDay = Calendar.getInstance();
            nextToNextDay.add(Calendar.DAY_OF_MONTH, 2);
            expectedDeliveryDate = nextToNextDay.getTime();
            order.setExpectedDeliveryDate(expectedDeliveryDate);
        }

        // Set placed date
        order.setPlacedDate(new Date());

        // Assign order to a delivery partner
        DeliveryPartner assignedPartner = assignOrderToDeliveryPartner();

        // If no delivery partner available, set delivery status to "No delivery partner available"
        if (assignedPartner == null) {
            order.setDeliveryStatus("No delivery partner available");
        } else {
            // Set delivery partner for the order
            order.setDeliveryPartner(assignedPartner);
            // Increase the assigned delivery partner's workload
            assignedPartner.incrementWorkload();
        }

        // Save the order
        orderRepository.save(order);
        
        // Set order status
        order.setOrderStatus("Placed.");

        // Create order items from cart items
        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            orderItemRepository.save(orderItem);
        }

        // Clear the cart
        cart.getCartItems().clear();
        cart.calculateTotalPrice();
        cartRepository.save(cart);

        return "Order placed successfully";
    }

    private DeliveryPartner assignOrderToDeliveryPartner() {
        // Retrieve all available delivery partners
        List<DeliveryPartner> availablePartners = deliveryPartnerRepository.findAll();

        // Sort delivery partners based on workload (number of orders)
        availablePartners.sort(Comparator.comparingInt(DeliveryPartner::getWorkload));

        // Return the least busy delivery partner
        return availablePartners.isEmpty() ? null : availablePartners.get(0);
    }

    public List<Order> getOrdersByCustomerId(int customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
}
