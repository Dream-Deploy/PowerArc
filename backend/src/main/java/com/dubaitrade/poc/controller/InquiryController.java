package com.dubaitrade.poc.controller;

import com.dubaitrade.poc.model.Consignment;
import com.dubaitrade.poc.model.InquiryRequest;
import com.dubaitrade.poc.service.ConsignmentService;
import com.dubaitrade.poc.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final EmailService emailService;
    private final ConsignmentService consignmentService;

    public InquiryController(EmailService emailService, ConsignmentService consignmentService) {
        this.emailService = emailService;
        this.consignmentService = consignmentService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> submitInquiry(@Valid @RequestBody InquiryRequest request) {
        Consignment consignment = consignmentService.findById(request.consignmentId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid consignment ID."));

        emailService.sendInquiryEmail(request, consignment);
        return ResponseEntity.ok(Map.of("message", "Inquiry sent to the selected consignment owner."));
    }
}
