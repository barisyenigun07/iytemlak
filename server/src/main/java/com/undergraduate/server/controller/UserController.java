package com.undergraduate.server.controller;


import com.undergraduate.server.model.request.UpdateUserRequest;
import com.undergraduate.server.model.response.UserResponse;
import com.undergraduate.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    @GetMapping("/{id}/image/download")
    public byte[] getUserProfilePhoto(@PathVariable Long id){
        return userService.getUserProfilePhoto(id);
    }

    @PutMapping("/update")
    public void updateUser(@ModelAttribute UpdateUserRequest body){
        userService.updateUser(body);
    }
}