package com.crs.service;


import com.crs.entities.Admin;
import com.crs.entities.User;
import com.crs.repo.AdminRepo;
import com.crs.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JWTAuthenticationService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Admin admin = adminRepo.findAdminByEmail(email).orElse(null);

        if (admin != null) {

            return new org.springframework.security.core.userdetails.User(admin.getEmail(), admin.getPassword(), new ArrayList<>());
        } else {

            User user = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email " + email));
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
        }
    }
}