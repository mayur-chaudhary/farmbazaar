package com.farmbazaar.model.entity;

import javax.persistence.*;

@Entity
public class Customer extends AbstractUser {
	
	@OneToOne(mappedBy = "customer")
    private Cart cart;

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
    // Additional attributes specific to Customer if any
}
