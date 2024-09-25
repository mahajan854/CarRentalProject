package com.crs.controller;

import com.crs.dto.feedback.AddFeedbackDTO;
import com.crs.entities.Feedback;
import com.crs.service.FeedbackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/addFeedback")
    public ResponseEntity<?> sendFeedback(@RequestBody AddFeedbackDTO request) {

        log.info("In sendFeedback()");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(feedbackService.addFeedback(request));
    }

}
