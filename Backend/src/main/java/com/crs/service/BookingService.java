package com.crs.service;

import com.crs.dto.ApiResponse;
import com.crs.dto.booking.*;
import com.crs.entities.*;
import com.crs.enums.BookingStatus;
import com.crs.repo.*;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Service
@Transactional
@Slf4j
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private FareRepo fareRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private BranchRepo branchRepo;

    @Autowired
    private CancellationRepo cancellationRepo;


    //-----get all bookings of a branch
    public List<GetAllBranchBookingDTO> getAllBranchBookings(Long branchId) {

        List<Booking> bookingList = bookingRepo.findBookingByBranchId(branchId);

        List<GetAllBranchBookingDTO> dtoList = new ArrayList<>();

        for (Booking booking : bookingList) {

            GetAllBranchBookingDTO dto = mapper.map(booking, GetAllBranchBookingDTO.class);
            dto.setId(booking.getId());
            dto.setUserId(booking.getUser().getId());
            dto.setBranchId(booking.getBranch().getId());
            dto.setVehicleNo(booking.getCar().getVehicleNo());

            dtoList.add(dto);
        }

        return dtoList;
    }

    //--------- Booking Services ---------------
    public Booking AddBookingDetails(AddBookingDto bookingDto) {

        Booking booking = mapper.map(bookingDto, Booking.class);

        User user = userRepo.findById(bookingDto.getUserId()).orElseThrow(null);
        booking.setUser(user);

        Car car = carRepo.findById(bookingDto.getCarId()).orElseThrow(null);

        if (car.getAvailability() == true && user.isKycStatus() == true) {

            Transaction transaction = AddTransactionDetails(new AddTransactionDto(
                    bookingDto.getTransId(),
                    bookingDto.getPaymentMode(),
                    bookingDto.getAmount()
            ));

            bookingDto.setInitialTransactionId(transaction.getId());

            car.setAvailability(false);
            booking.setCar(car);

            Branch branch = branchRepo.findById(bookingDto.getBranchId()).orElseThrow(null);
            booking.setBranch(branch);

            Booking bookingPersist = bookingRepo.save(booking);
            AddFareDetails(new AddFareDto(bookingPersist.getId(), bookingDto.getInitialTransactionId()));
            return bookingPersist;
        }

        return null;
    }

    //---- Return car ----------------

    // set return time to now
    // calculate penalty
    // change the car status to available

    public ApiResponse setCarReturn(Long booking_id) {

        Booking booking = bookingRepo.findById(booking_id).orElse(null);

        if (booking != null) {

//            booking.setReturnDate(LocalDateTime.now());
//            booking.setStatus(BookingStatus.COMPLETED); // setting booking status as completed
//            booking.getCar().setAvailability(true);
//            booking.getCar().setTripsCompleted(booking.getCar().getTripsCompleted() + 1);

            LocalDateTime toDate = booking.getToDate();
            LocalDateTime fromDate = booking.getFromDate();
            LocalDateTime returnDate = LocalDateTime.now();
            Double carBaseFare = booking.getCar().getBaseFare();

            if (returnDate.isAfter(fromDate) && returnDate.isBefore(toDate)) {

                booking.setReturnDate(LocalDateTime.now());
                booking.setStatus(BookingStatus.COMPLETED); // setting booking status as completed
                booking.getCar().setAvailability(true);
                booking.getCar().setTripsCompleted(booking.getCar().getTripsCompleted() + 1);
                booking.setPenalty(0.0);

//                long penaltyHours = toDate.until(returnDate, ChronoUnit.HOURS);
//                booking.setPenalty(carBaseFare * penaltyHours);
            } else if (returnDate.isAfter(toDate)) {

                booking.setReturnDate(LocalDateTime.now());
                booking.setStatus(BookingStatus.COMPLETED); // setting booking status as completed
                booking.getCar().setAvailability(true);
                booking.getCar().setTripsCompleted(booking.getCar().getTripsCompleted() + 1);

                long penaltyHours = toDate.until(returnDate, ChronoUnit.HOURS);
                booking.setPenalty(carBaseFare * penaltyHours);
            } else {

                return new ApiResponse(false, "Car return unsuccessfully, because return date before from date");
            }

            bookingRepo.save(booking);

            return new ApiResponse(true, "Car return date set successfully");
        }

        return new ApiResponse(false, "Booking Not Found");
    }


    //--------- Transaction Services ---------------
    public Transaction AddTransactionDetails(AddTransactionDto transactionDto) {

        Transaction transaction = mapper.map(transactionDto, Transaction.class);
        return transactionRepo.save(transaction);
    }

    //--------- Fare Services ---------------
    public Fare AddFareDetails(AddFareDto fareDto) {
        Fare fare = mapper.map(fareDto, Fare.class);

        Booking booking = bookingRepo.findById(fareDto.getBookingId()).orElseThrow(null);
        fare.setBookingId(booking);

        //If NOT- NULL identifier Error:
        fare.setId(null);

        Transaction transactionInitial = transactionRepo.findById(fareDto.getInitialTransactionId()).orElseThrow(null);
        fare.setInitialTransaction(transactionInitial);

        return fareRepo.save(fare);
    }

    //------Get All Booking of user by:id----------
    public List<BookingHistoryDTO> getAllBookingOfUser(Long user_id) {

        List<Booking> bookingList = bookingRepo.findBookingByUserId(user_id);

        List<BookingHistoryDTO> historyDTOList = new ArrayList<>();

        for (Booking booking : bookingList) {

            BookingHistoryDTO historyDTO = mapper.map(booking, BookingHistoryDTO.class);

            historyDTO.setBranchLocality(booking.getBranch().getLocality());
            historyDTO.setBranchCity(booking.getBranch().getCity());
            historyDTO.setCarBrand(booking.getCar().getBrand());
            historyDTO.setCarModel(booking.getCar().getModel());

            historyDTOList.add(historyDTO);
        }

        return historyDTOList;
    }

        /*
        -------------- cancellation service --------
        will have to check the date of cancellation along with the date of start of trip
        this will allow to calculate the deduct amount of the total amount
        change the status of the booking to cancel
        change the status of the car to available
        will have to make refund transaction if there is some amount to be refunded ( need a different service)
        and add the transaction to cancellation table this transaction will be done by the admin from admin login
        */

    public ApiResponse cancelBooking(CancelBookingDTO request) {

        Booking booking = bookingRepo.findById(request.getBookingId()).orElse(null);

        if (booking != null) {

            booking.setStatus(BookingStatus.CANCELLED);
            booking.getCar().setAvailability(true);

            LocalDateTime bookingStartDate = booking.getFromDate();
            LocalDateTime cancelDateTime = LocalDateTime.now();

            Double tripCost = booking.getTripCost();

            Cancellation cancelledBooking = new Cancellation();

            cancelledBooking.setBooking(booking);
            cancelledBooking.setDescription(request.getDescription());

            if (cancelDateTime.isBefore(bookingStartDate)) {

                long cancelHours = cancelDateTime.until(bookingStartDate, ChronoUnit.HOURS);

                if (cancelHours > 24) {

                    cancelledBooking.setRefundAmount(tripCost);
                } else if (cancelHours < 24 && cancelHours > 12) {

                    cancelledBooking.setRefundAmount(tripCost * .9);
                } else if (cancelHours < 12) {

                    cancelledBooking.setRefundAmount(tripCost * .75);
                }
            } else if (cancelDateTime.isAfter(bookingStartDate)) {

                cancelledBooking.setRefundAmount(0.0);
            }

            cancellationRepo.save(cancelledBooking);
            return new ApiResponse(true, "Cancellation Successful");
        }

        return new ApiResponse(false, "Booking Not Found");
    }

    public ApiResponse processRefund(RefundDTO request) {

        Cancellation cancellation = cancellationRepo.findById(request.getCancellationId()).orElse(null);

        if (cancellation != null) {

            Transaction refundTransaction = AddTransactionDetails(new AddTransactionDto(
                    request.getTransactionId(),
                    "Online",
                    cancellation.getRefundAmount()
            ));

            cancellation.setRefundTransactionId(refundTransaction);

            return new ApiResponse(true, "refund transaction successful");
        }

        return new ApiResponse(false, "Cancellation id not found");
    }

    public List<ToRefundBookingDTO> getToBeRefunded(Long branchId) {

        List<Cancellation> cancellationList = cancellationRepo.getAllByRefundAmount();

        List<ToRefundBookingDTO> toRefundBookingDTOList = new ArrayList<>();

        for (Cancellation cancellation : cancellationList) {

            if (Objects.equals(cancellation.getBooking().getBranch().getId(), branchId)) {

                ToRefundBookingDTO dto = new ToRefundBookingDTO(
                        cancellation.getBooking().getId(),
                        cancellation.getId(),
                        cancellation.getBooking().getUser().getFirstName()
                                + " "
                                + cancellation.getBooking().getUser().getLastName(),
                        cancellation.getRefundAmount(),
                        cancellation.getRefundTransactionId() == null,
                        cancellation.getCreatedAt());

                toRefundBookingDTOList.add(dto);
            }
        }

        return toRefundBookingDTOList;
    }

}
