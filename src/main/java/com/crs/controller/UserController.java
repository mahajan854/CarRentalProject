package com.crs.controller;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;

import com.crs.config.JWTTokenUtil;
import com.crs.service.JWTAuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crs.dto.ApiResponse;
import com.crs.dto.user.AuthRequestDto;
import com.crs.dto.user.AuthRespDto;
import com.crs.dto.user.DocumentDto;
import com.crs.dto.user.RegisterUserDto;
import com.crs.dto.user.UpdateUserDto;
import com.crs.entities.Documents;
import com.crs.entities.User;
import com.crs.service.UserService;


@Slf4j
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    @Autowired
    private JWTAuthenticationService jwtAuthenticationService;

    //Get All Users
    @GetMapping
    public List<AuthRespDto> getAllUsers() {

        log.info("In getAllUsers()");

        return userService.getAllUser();
    }

    //login
//    @PostMapping("/signIn")
//    public ResponseEntity<?> logInUser(@RequestBody AuthRequestDto request) {
//        System.out.println("in sign in " + request);
//
//        AuthRespDto authRespDto = null;
//        authRespDto = userService.logInUser(request);
//
//
//        if (authRespDto != null) {
//            return ResponseEntity.status(HttpStatus.OK).body(authRespDto);
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(false, "User Not Found"));
//    }


    //jwt enabled login
    @PostMapping("/signIn")
    public ResponseEntity<?> logInUser(@RequestBody AuthRequestDto request) throws Exception {

        log.info("In logInUser()");

        // Jwt code
        try {
            log.info("In User Authentication");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    ));
        } catch (BadCredentialsException e) {

            throw new Exception("Incorrect Email or Password", e);
        }

        final UserDetails userDetails = jwtAuthenticationService
                .loadUserByUsername(request.getEmail());

        final String token = jwtTokenUtil.generateToken(userDetails, "user");

        AuthRespDto authRespDto = null;
        authRespDto = userService.logInUser(new AuthRequestDto(request.getEmail(), request.getPassword()));


        if (authRespDto != null) {

            authRespDto.setToken(token);
            return ResponseEntity.status(HttpStatus.OK).body(authRespDto);
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse(false, "User Not Found with Email " + request.getEmail()));
    }


    //Register
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDto request) {

        log.info("In registerUser()");

        RegisterUserDto registerUserDto = null;
        registerUserDto = userService.registerUser(request);

        if (registerUserDto != null) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "User Registered successfully"));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse(false, "User Not Registered, or User Already Exist"));
    }


    @PostMapping("/update")
    public ResponseEntity<?> updateUserDetails(@RequestBody UpdateUserDto updateReq) {

        log.info("In updateUserDetails()");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updateUser(updateReq));
    }

    //login
    @PostMapping("/document")
    public ResponseEntity<?> addDocuments(@RequestBody DocumentDto docRequest) {

        log.info("In addDocument()");

        Documents document = userService.addUserDocuments(docRequest);
        if (document != null) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse(true, "Documents uploaded sucessfully."));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse(false, "Documents Not uploaded."));
    }

}
