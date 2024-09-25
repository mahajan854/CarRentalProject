package com.crs.controller;

import com.crs.config.JWTTokenUtil;
import com.crs.dto.ApiResponse;
import com.crs.dto.JWTAuthRequest;
import com.crs.dto.admin.*;
import com.crs.dto.user.AuthRequestDto;
import com.crs.dto.user.AuthRespDto;
import com.crs.dto.user.RegisterUserDto;
import com.crs.service.AdminService;
import com.crs.service.JWTAuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    @Autowired
    private JWTAuthenticationService jwtAuthenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterAdminDTO request) {

        log.info("In registerUser() " + getClass());

        RegisterAdminDTO registerAdminDTO = null;

        registerAdminDTO = adminService.registerAdmin(request);

        if (registerAdminDTO != null) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Admin Registered successfully"));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse(false, "Admin Not Registered"));
    }

//    @PostMapping("/signIn")
//    public ResponseEntity<?> logInAdmin(@RequestBody AdminAuthRequestDTO request) {
//        System.out.println("in sign in " + request);
//
//        AdminAuthResponseDTO responseDTO = null;
//        responseDTO = adminService.logInAdmin(request);
//
//
//        if (responseDTO != null) {
//            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
//        }
//
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse(false, "Admin user Not Found"));
//    }

    // JWT returning login
    @PostMapping("/signIn")
    public ResponseEntity<?> logInAdmin(@RequestBody JWTAuthRequest request) throws Exception {

        log.info("In logInAdmin() " + getClass());

        // Jwt code
        try {
            log.info("In Admin Authentication");
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            ));
        } catch (BadCredentialsException e) {

            throw new Exception("Incorrect Email or Password", e);
        }

        final UserDetails userDetails = jwtAuthenticationService.loadUserByUsername(request.getEmail());

        final String token = jwtTokenUtil.generateToken(userDetails, "admin");

        AdminAuthResponseDTO responseDTO = null;
        responseDTO = adminService.logInAdmin(new AdminAuthRequestDTO(request.getEmail(), request.getPassword()));

        if (responseDTO != null) {

            responseDTO.setToken(token);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(responseDTO);
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse(false, "Admin user Not Found with Email " + request.getEmail()));
    }

    @PostMapping("/editProfile")
    public ResponseEntity<?> updateAdmin(@RequestBody UpdateAdminDTO request) {

        log.info("In updateAdmin() " + getClass());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(adminService.updateAdmin(request));
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody AdminChangePasswordDTO request) {

        log.info("In changePassword() " + getClass());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(adminService.changePassword(request));
    }

    @GetMapping("/get/{admin_id}")
    public ResponseEntity<?> getAdminDetails(@PathVariable Long admin_id) {

        log.info("In getAdminDetails() " + getClass());

        GetAdminDetailsDTO adminDTO = adminService.getAdmin(admin_id);

        if (adminDTO != null) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(adminDTO);
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse(false, "Admin not found"));
    }

}
