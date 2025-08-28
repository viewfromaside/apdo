package com.viewfromaside.apdo.dto;


import com.viewfromaside.apdo.model.User;
import com.viewfromaside.apdo.utils.IDGenerator;

public class UserDTO {
    private String name;
    private String email;
    private String password;
    
    public User toModel() {
        return new User(IDGenerator.random(7), this.name, this.email, this.password);
    }
}
