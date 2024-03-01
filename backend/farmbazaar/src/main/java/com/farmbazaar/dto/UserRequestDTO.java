package com.farmbazaar.dto;

import com.farmbazaar.enums.Role;
import com.farmbazaar.model.entity.AbstractUser;

public class UserRequestDTO {
    private String username;
    private String password;
    private String fname;
    private String lname;
    private String phno;
    private String address;
    private Role role; 

    public AbstractUser toUser() {
        // Convert DTO to AbstractUser object
        AbstractUser user = new AbstractUser(); // You may need to make AbstractUser non-abstract or provide a concrete implementation
        user.setUsername(this.username);
        user.setPassword(this.password);
        user.setFname(this.fname);
        user.setLname(this.lname);
        user.setPhno(this.phno);
        user.setAddress(this.address);
        user.setRole(this.role);
        return user;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPhno() {
        return phno;
    }

    public void setPhno(String phno) {
        this.phno = phno;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
