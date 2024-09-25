package com.crs.service;

import com.crs.dto.ApiResponse;
import com.crs.dto.user.AuthRequestDto;
import com.crs.dto.user.AuthRespDto;
import com.crs.dto.user.DocumentDto;
import com.crs.dto.user.RegisterUserDto;
import com.crs.dto.user.UpdateUserDto;
import com.crs.entities.Documents;
import com.crs.entities.User;

import java.util.List;

public interface UserService {

    List<AuthRespDto> getAllUser();
    AuthRespDto logInUser(AuthRequestDto req);
    RegisterUserDto registerUser(RegisterUserDto request);
    ApiResponse updateUser(UpdateUserDto updateReq);
     Documents addUserDocuments(DocumentDto docRequest);
}
