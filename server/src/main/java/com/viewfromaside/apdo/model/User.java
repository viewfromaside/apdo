package com.viewfromaside.apdo.model;

import java.time.Instant;

public class User {
    private String id;
    private String username;
    private String email;
    private String password;
    private Instant createdAt;
    private Instant updatedAt;
    
    public User(String id, String username, String email, String password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }


    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return this.username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return this.email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return this.password; }
    public void setPassword(String password) { this.password = password; }

    public Instant getCreatedAt() { return this.createdAt; }

    public Instant getUpdatedAt() { return this.updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

}
