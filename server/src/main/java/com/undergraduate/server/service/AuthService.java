package com.undergraduate.server.service;

import com.undergraduate.server.entity.Role;
import com.undergraduate.server.entity.User;
import com.undergraduate.server.exception.*;
import com.undergraduate.server.model.request.ChangePasswordRequest;
import com.undergraduate.server.model.request.LoginRequest;
import com.undergraduate.server.model.request.RegisterRequest;
import com.undergraduate.server.model.response.AuthResponse;
import com.undergraduate.server.model.response.UserResponse;
import com.undergraduate.server.repository.RoleRepository;
import com.undergraduate.server.repository.UserRepository;
import com.undergraduate.server.security.JwtUserDetailsService;
import com.undergraduate.server.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class AuthService {
    private final JwtUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public AuthService(JwtUserDetailsService userDetailsService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository){
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }


    public void register(RegisterRequest body){
        Optional<User> optionalUserByUsername = userRepository.findByUsername(body.getUsername());
        Optional<User> optionalUserByEmail = userRepository.findByEmail(body.getEmail());

        if (optionalUserByUsername.isPresent()){
            throw new AlreadyTakenException(AlreadyTakenType.USERNAME);
        }

        if (optionalUserByEmail.isPresent()){
            throw new AlreadyTakenException(AlreadyTakenType.EMAIL);
        }

        if (!body.getPassword().equals(body.getPasswordRepeat())){
            throw new PasswordMismatchException();
        }

        User user = new User();
        user.setName(body.getName());
        user.setUsername(body.getUsername());
        user.setEmail(body.getEmail());
        user.setContactInfo(body.getContactInfo());
        user.setPassword(passwordEncoder.encode(body.getPassword()));

        Role role = null;

        if (body.getRole().equals("Student")){
            role = roleRepository.findByName("STUDENT");
        }
        else if (body.getRole().equals("House Owner")){
            role = roleRepository.findByName("HOUSE_OWNER");
        }
        user.setRole(role);

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest body){
        Optional<User> optionalUser = userRepository.findByUsername(body.getUsername());
        if (!optionalUser.isPresent()){
            throw new ResourceNotFoundException(ResourceType.USER);
        }
        if (!passwordEncoder.matches(body.getPassword(), optionalUser.get().getPassword())){
            throw new PasswordMismatchException();
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(body.getUsername());
        final String jwtToken = jwtUtil.createToken(userDetails);

        return AuthResponse.builder()
                .token(jwtToken)
                .user(UserResponse.fromEntity(optionalUser.get()))
                .build();
    }

    public void changePassword(Long userId, ChangePasswordRequest body){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        if (!passwordEncoder.matches(body.getOldPassword(), user.getPassword())){
            throw new PasswordMismatchException();
        }
        user.setPassword(passwordEncoder.encode(body.getNewPassword()));
        userRepository.save(user);
    }
}