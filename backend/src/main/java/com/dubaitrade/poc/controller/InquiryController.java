package com.dubaitrade.poc.controller;

import com.dubaitrade.poc.model.Inquiry;
import com.dubaitrade.poc.model.InquiryRequest;
import com.dubaitrade.poc.service.InquiryService;
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

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> submitInquiry(@Valid @RequestBody InquiryRequest request) {
        Inquiry inquiry = inquiryService.processInquiry(request);
        return ResponseEntity.ok(Map.of(
                "message", "Inquiry submitted and emailed to admin.",
                "inquiryId", String.valueOf(inquiry.getId())
        ));
    }
}
