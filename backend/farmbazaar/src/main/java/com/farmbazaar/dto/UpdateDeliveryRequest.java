package com.farmbazaar.dto;

import java.util.Date;

public class UpdateDeliveryRequest {
    private String deliveryStatus;
    private Date deliveryDate;
    
    // getters and setters
    
	public String getDeliveryStatus() {
		return deliveryStatus;
	}
	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}
	public Date getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

    
}
