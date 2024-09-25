package com.crs.controller;

import com.crs.dto.ApiResponse;
import com.crs.dto.car.*;
//import com.crs.entities.Car;
import com.crs.service.CarService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping("/car/{carId}")
    public ResponseEntity<?> getCar(@PathVariable String carId) {

        log.info("In getCar()");

        GetCarDTO carDTO = carService.getCar(carId);

        if (carDTO == null) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse(false, "Car not found!"));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(carDTO);
    }


    @GetMapping("/allCars")
    public ResponseEntity<?> getAllCar() {

        log.info("In getAllCar()");

        List<GetCarDTO> carDTOList = carService.getAllCars();

        if (carDTOList == null) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse(false, "Data not found!"));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(carDTOList);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCar(@RequestBody AddCarDTO request) {

        log.info("In addCar()");

        AddCarDTO addCarDTO = carService.addCar(request);

        if (addCarDTO == null) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse(false, "Car not added!"));
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse(true, "Car added successfully!"));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCar(@RequestBody UpdateCarDTO request) {

        log.info("In updateCar()");

        UpdateCarDTO updateCarDTO = carService.updateCar(request);

        if (updateCarDTO == null) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse(false, "Car details not updated!"));
        }

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(new ApiResponse(true, "Car updated successfully!"));
    }

    @PutMapping("/setAvail")
    public ResponseEntity<?> changeAvailability(@RequestBody @Valid ChangeAvailabilityDTO request) {

        log.info("In changeAvailability()");

        ChangeAvailabilityDTO availabilityDTO = carService.changeAvailability((request));

        if (availabilityDTO == null) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse(false, "Unable to change availability due to some error!"));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse(true, "Availability status changed successfully!"));
    }

    @PutMapping("/setStatus")
    public ResponseEntity<?> changeStatus(@RequestBody @Valid ChangeStatusDTO request) {

        log.info("In changeStatus()");

        ChangeStatusDTO statusDTO = carService.changeStatus(request);

        if (statusDTO == null) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse(false, "Unable to change status due to some error!"));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse(true, "Status changed successfully!"));
    }
}
