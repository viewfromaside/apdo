package com.viewfromaside.apdo.model;

import java.time.Instant;

public class User {
    private String id;
    private String name;
    private String email;
    private String password;
    private Instant createdAt;
    private Instant updatedAt;
    
    public User(String id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    

}
