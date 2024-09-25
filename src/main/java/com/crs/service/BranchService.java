package com.crs.service;

import com.crs.dto.branch.AddBranchDTO;
import com.crs.dto.branch.GetBranchDTO;
import com.crs.dto.branch.UpdateBranchDTO;
import com.crs.entities.Branch;
import com.crs.repo.BranchRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BranchService {

    @Autowired
    private BranchRepo branchRepo;

    @Autowired
    private ModelMapper mapper;

    public AddBranchDTO addBranch(AddBranchDTO request) {

        Branch branch = mapper.map(request, Branch.class);

        Branch branchResp = branchRepo.save(branch);

        return mapper.map(branchResp, AddBranchDTO.class);
    }

    public List<GetBranchDTO> getBranches() {

        List<Branch> branchList = branchRepo.findAll();

        return branchList.stream().map(b -> mapper.map(b, GetBranchDTO.class)).collect(Collectors.toList());
    }

    public UpdateBranchDTO updateBranch(UpdateBranchDTO request) {

        UpdateBranchDTO branchDTO = null;

        Branch branch = branchRepo.findById(request.getId()).orElse(null);

        if (branch != null) {

            branch.setCity(request.getCity());
            branch.setLocality(request.getLocality());
            branch.setState(request.getState());
            branch.setPincode(request.getPincode());
            branch.setModifiedAt(LocalDateTime.now());

            Branch branchResp = branchRepo.save(branch);

            branchDTO = mapper.map(branchResp, UpdateBranchDTO.class);

            return branchDTO;
        }

        return branchDTO;
    }

}
