package com.viewfromaside.apdo.dto;


import com.viewfromaside.apdo.model.User;
import com.viewfromaside.apdo.utils.IDGenerator;

public class UserDTO {
    private String username;
    private String email;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User toModel() {
        return new User(IDGenerator.random(7), this.username, this.email, this.password);
    }
}
