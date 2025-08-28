package com.viewfromaside.apdo.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viewfromaside.apdo.dto.UserDTO;
import com.viewfromaside.apdo.model.User;
import com.viewfromaside.apdo.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
      
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public User create(@RequestBody UserDTO userDTO) throws ExecutionException, InterruptedException {
        return this.userService.createUser(userDTO.toModel());
    }

    @GetMapping("/{id}")
    public User get(@PathVariable String id) throws ExecutionException, InterruptedException {
        return this.userService.getUserById(id);
    }

    @GetMapping("/")
    public List<User> getAll() throws ExecutionException, InterruptedException {
        return this.userService.getAllUsers();
    }

    @PutMapping("/{id}/edit")
    public User update(@PathVariable String id, @RequestBody UserDTO userDTO) throws ExecutionException, InterruptedException {
        User user = userDTO.toModel();
        user.setId(id);
        return this.userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) throws ExecutionException, InterruptedException {
        return this.userService.deleteUser(id);
    }
}
