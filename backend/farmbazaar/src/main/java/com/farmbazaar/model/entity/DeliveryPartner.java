package com.farmbazaar.model.entity;

import javax.persistence.*;

@Entity
public class DeliveryPartner extends AbstractUser {
	private int workload;
	
	// Method to get the current workload (number of assigned orders)
	public int getWorkload() {
        return workload;
    }
	
	// Method to increment the workload when a new order is assigned
	public void incrementWorkload() {
        workload++;
    }
}
