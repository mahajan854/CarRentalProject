package com.crs.service;

import com.crs.dto.car.*;
import com.crs.entities.Branch;
import com.crs.entities.Car;
import com.crs.repo.BranchRepo;
import com.crs.repo.CarRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CarService {

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private BranchRepo branchRepo;

    @Autowired
    private ModelMapper mapper;

    public GetCarDTO getCar(String carId) {

        Car car = carRepo.findById(carId).orElseThrow(() -> new RuntimeException("Unable to find car!"));

        GetCarDTO carDTO = mapper.map(car, GetCarDTO.class);

        carDTO.setBranchId(car.getBranch().getId());

        return carDTO;
    }

    public List<GetCarDTO> getAllCars() {

        List<Car> carList = carRepo.findAll();

        List<GetCarDTO> getCarDTOList = new ArrayList<>();

        for (Car car : carList) {
            GetCarDTO carDTO = mapper.map(car, GetCarDTO.class);
            carDTO.setBranchId(car.getBranch().getId());
            getCarDTOList.add(carDTO);
        }

        return getCarDTOList;
    }

    public List<GetCarDTO> getCarByBranch(Long branch_id) {

        List<Car> carList = carRepo.getCarsByBranchId(branch_id);

        List<GetCarDTO> carDTOList = new ArrayList<>();

        for (Car car : carList) {
            GetCarDTO carDTO = mapper.map(car, GetCarDTO.class);
            carDTO.setBranchId(car.getBranch().getId());
            carDTOList.add(carDTO);
        }

        return carDTOList;
    }

    public List<GetCarDTO> getAllCarsByBranch(Long branch_id) {

//        List<Car> carList = carRepo.getAllCarsByBranchId(branch_id);

        List<Car> carList = carRepo.findAll();

        List<GetCarDTO> carDTOList = new ArrayList<>();

        for (Car car : carList) {
            if (car.getBranch().getId() == branch_id) {

                GetCarDTO carDTO = mapper.map(car, GetCarDTO.class);
                carDTO.setBranchId(car.getBranch().getId());
                carDTOList.add(carDTO);
            }
        }

        return carDTOList;
    }

    public AddCarDTO addCar(AddCarDTO request) {

        Car car = mapper.map(request, Car.class);

        Branch branch = branchRepo.findById(request.getBranchId()).orElse(null); // add null check condition

        car.setBranch(branch);

        Car carResp = carRepo.save(car);

        return mapper.map(carResp, AddCarDTO.class);
    }

    public UpdateCarDTO updateCar(UpdateCarDTO request) {

        Car car = carRepo.findById(request.getVehicleNo()).orElseThrow(() -> new RuntimeException("Car not found!"));

        car.setBrand(request.getBrand());

        car.setModel(request.getModel());

        car.setMakeYear(request.getMakeYear());

        car.setFuelType(request.getFuelType());

        car.setDriveType(request.getDriveType());

        car.setCategory(request.getCategory());

        car.setSeatingCapacity(request.getSeatingCapacity());

        car.setHaveABS(request.isHaveABS());

        car.setHaveAirBags(request.isHaveAirBags());

        car.setBaseFare(request.getBaseFare());

        car.setStatus(request.isStatus());

        car.setModifiedAt(LocalDateTime.now());

        Car carResp = carRepo.save(car);

        return mapper.map(carResp, UpdateCarDTO.class);
    }

    public ChangeAvailabilityDTO changeAvailability(ChangeAvailabilityDTO request) {

        Car car = carRepo.getReferenceById(request.getCar_id());

        car.setAvailability(request.getAvailability());

        car.setModifiedAt(LocalDateTime.now());

        Car carResp = carRepo.save(car);

        return mapper.map(request, ChangeAvailabilityDTO.class);
    }

    public ChangeStatusDTO changeStatus(ChangeStatusDTO request) {

        Car car = carRepo.getReferenceById(request.getCar_id());

        if (request.getStatus() == false) {

            if (car.getAvailability() == true) {

                car.setStatus(request.getStatus());

                car.setAvailability(request.getStatus());

                car.setModifiedAt(LocalDateTime.now());

                Car carResp = carRepo.save(car);

                return mapper.map(request, ChangeStatusDTO.class);
            } else {

                return null;
            }
        } else if (request.getStatus() == true) {

            car.setStatus(request.getStatus());

            car.setAvailability(request.getStatus());

            car.setModifiedAt(LocalDateTime.now());

            Car carResp = carRepo.save(car);

            return mapper.map(request, ChangeStatusDTO.class);
        } else {
            return null;
        }


    }


}
