package com.farmbazaar.dto;

public class CheckoutRequest {
    private String orderType;
    private String deliveryDate; // If applicable
    private String deliveryAddress;

    // Getters and setters
    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

	@Override
	public String toString() {
		return "CheckoutRequest [orderType=" + orderType + ", deliveryDate=" + deliveryDate + ", deliveryAddress="
				+ deliveryAddress + "]";
	}
    
    
}
