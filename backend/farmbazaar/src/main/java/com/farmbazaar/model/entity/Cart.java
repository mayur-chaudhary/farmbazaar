package com.farmbazaar.model.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Entity
public class Cart implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnore // Prevent Jackson from serializing this attribute
    private Customer customer;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true) // Add orphanRemoval
    @JsonManagedReference
    private List<CartItem> cartItems;

    private double totalPrice;

    @Column(name = "updated_at")
    private Date updatedAt;

    public Cart() {
        // Initialize cartItems list
        this.cartItems = new ArrayList<>();
    }

    // Getters and setters
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public CartItem getCartItemByProductId(int productId) {
        Optional<CartItem> optionalCartItem = cartItems.stream()
                .filter(item -> item.getProduct().getId() == productId)
                .findFirst();
        return optionalCartItem.orElse(null);
    }
    
    public void addCartItem(CartItem cartItem) {
        cartItem.setCart(this); // Associate the CartItem with this Cart
        this.cartItems.add(cartItem); // Add the CartItem to the Cart's list of items
    }

    public void calculateTotalPrice() {
        double totalPrice = 0.0;
        for (CartItem item : this.cartItems) {
            totalPrice += item.getPrice() * item.getQuantity();
        }
        this.totalPrice = totalPrice;
    }
    
    public void clearCart() {
        this.cartItems.clear(); // Clear the cart items list
        this.totalPrice = 0.0; // Reset the total price
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}
