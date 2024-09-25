package com.crs.service;

import com.crs.exception.ResourceNotFoundException;
import com.crs.dto.ApiResponse;
import com.crs.dto.admin.*;
import com.crs.entities.Admin;
import com.crs.entities.Branch;
import com.crs.repo.AdminRepo;
import com.crs.repo.BranchRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private BranchRepo branchRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public RegisterAdminDTO registerAdmin(RegisterAdminDTO request) {

        Admin admin = mapper.map(request, Admin.class);

        Branch branch = branchRepo.findById(request.getBranchId()).orElse(null);

        if (branch != null) {

            admin.setPassword(passwordEncoder.encode(request.getPassword()));
            admin.setBranch(branch);
            Admin adminResp = adminRepo.save(admin);
            return mapper.map(adminResp, RegisterAdminDTO.class);
        }

        return null;
    }

    public AdminAuthResponseDTO logInAdmin(AdminAuthRequestDTO request) {

        AdminAuthResponseDTO responseDTO = null;

        Admin admin = adminRepo.findAdminByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("admin/email not found"));

        if (admin != null) {
            boolean flag = passwordEncoder.matches(request.getPassword(), admin.getPassword());
            if (flag) {
                responseDTO = mapper.map(admin, AdminAuthResponseDTO.class);
                responseDTO.setBranchId(admin.getBranch().getId());
                responseDTO.setBranchName(admin.getBranch().getLocality());
            }
        }
        return responseDTO;
    }

    public ApiResponse updateAdmin(UpdateAdminDTO request) {

        Admin admin = null;
        admin = adminRepo.findById(request.getId()).orElse(null);

        if (admin != null) {

            admin.setFirstName(request.getFirstName());
            admin.setLastName(request.getLastName());
            admin.setMobile(request.getMobile());
            admin.setModifiedAt(LocalDateTime.now());
            adminRepo.save(admin);

            return new ApiResponse(true, "Admin Data Updated Successfully");
        }

        return new ApiResponse(false, "Unable to update data");
    }

    public ApiResponse changePassword(AdminChangePasswordDTO request) {

        Admin admin = null;
        admin = adminRepo.findById(request.getId()).orElse(null);

        if (admin != null) {

            admin.setPassword(passwordEncoder.encode(request.getPassword()));
            admin.setModifiedAt(LocalDateTime.now());

            adminRepo.save(admin);
            return new ApiResponse(true, "Password Changed Successfully");
        }

        return new ApiResponse(false, "Password change failed!!!!");
    }

    public GetAdminDetailsDTO getAdmin(Long id) {

        Admin admin = adminRepo.findById(id).orElse(null);

        if (admin != null) {

            GetAdminDetailsDTO adminDTO = mapper.map(admin, GetAdminDetailsDTO.class);
            adminDTO.setBranchId(admin.getBranch().getId());
            adminDTO.setBranchName(admin.getBranch().getLocality());

            return adminDTO;
        }

        return null;
    }
}
