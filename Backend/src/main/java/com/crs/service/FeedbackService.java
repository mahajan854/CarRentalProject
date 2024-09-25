package com.crs.service;

import com.crs.dto.ApiResponse;
import com.crs.dto.feedback.AddFeedbackDTO;
import com.crs.entities.Booking;
import com.crs.entities.Feedback;
import com.crs.repo.BookingRepo;
import com.crs.repo.FeedbackRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private ModelMapper mapper;

    public ApiResponse addFeedback(AddFeedbackDTO request) {

        Booking booking = bookingRepo.findById(request.getBookingId()).orElse(null);

        if (booking != null) {

            Feedback feedback = mapper.map(request, Feedback.class);

            feedback.setBooking(booking);

            feedbackRepo.save(feedback);

            return new ApiResponse(true, "Feedback Added successfully");
        }

        return new ApiResponse(false, "Booking not found");
    }
}
