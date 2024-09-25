package com.crs.controller;

import com.crs.dto.booking.*;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crs.dto.ApiResponse;
import com.crs.dto.user.RegisterUserDto;
import com.crs.entities.Booking;
import com.crs.entities.Fare;
import com.crs.entities.Transaction;
import com.crs.service.BookingService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;


    //--------- Booking API's --------------------


    //Get All Bookings of Branch
    @GetMapping("/allBookings/{branch_id}")
    public ResponseEntity<?> getAllBranchBooking(@PathVariable Long branch_id) {

        log.info("In getAllBranchBooking()");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookingService.getAllBranchBookings(branch_id));
    }

    //Add Booking Details
    @PostMapping("/add")
    public ResponseEntity<?> addBookingDetails(@RequestBody AddBookingDto request) {

        log.info("In addBookingDetails()");

        Booking booking = null;
        booking = bookingService.AddBookingDetails(request);

        if (booking != null) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Booking Details added successfully", booking.getId()));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse(false, "Booking cannot be made, car not available or KYC not done"));
    }

    //--------- Transaction API's --------------------
    @PostMapping("/transaction/add")
    public ResponseEntity<?> addTransactionDetails(@RequestBody AddTransactionDto request) {

        log.info("In addTransactionDetails() " + getClass());

        Transaction transaction = null;
        transaction = bookingService.AddTransactionDetails(request);

        if (transaction != null) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Transaction Added", transaction.getId()));
        }
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(new ApiResponse(false, "Transaction Not Added"));
    }

    //--------- Fare API's --------------------
    @PostMapping("/fare/add")
    public ResponseEntity<?> addFareDetails(@RequestBody AddFareDto request) {

        log.info("In addFareDetails() " + getClass());

        Fare fare = null;
        fare = bookingService.AddFareDetails(request);

        if (fare != null) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Fare Added"));
        }
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(new ApiResponse(false, "Fare Not Added"));
    }

    @PutMapping("/returnCar/{booking_id}")
    public ResponseEntity<?> setCarReturnDateTime(@PathVariable Long booking_id) {

        log.info("In setCarReturnDateTime() " + getClass());

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(bookingService.setCarReturn(booking_id));
    }

    @GetMapping("/bookingHistory/{user_id}")
    public ResponseEntity<?> getUserBookingHistory(@PathVariable Long user_id) {

        log.info("In getUserBookingHistory() " + getClass());

        List<BookingHistoryDTO> historyDTOList = bookingService.getAllBookingOfUser(user_id);

        if (historyDTOList != null) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(historyDTOList);
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse(false, "No bookings found"));

    }

    @PostMapping("/cancelBooking")
    public ResponseEntity<?> cancelBooking(@RequestBody CancelBookingDTO request) {

        log.info("In cancelBooking() " + getClass());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookingService.cancelBooking(request));
    }

    @PostMapping("/processRefund")
    public ResponseEntity<?> processCancellationRefund(@RequestBody RefundDTO request) {

        log.info("In processCancellationRefund() " + getClass());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookingService.processRefund(request));
    }

    @GetMapping("/toRefund/{branch_id}")
    public ResponseEntity<?> getAllBookingsToBeRefunded(@PathVariable Long branch_id) {

        log.info("In getAllBookingToBeRefunded() " + getClass());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookingService.getToBeRefunded(branch_id));
    }

}
