package com.dubaitrade.poc.service;

import com.dubaitrade.poc.model.Consignment;
import com.dubaitrade.poc.model.Inquiry;
import com.dubaitrade.poc.model.InquiryRequest;
import com.dubaitrade.poc.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class InquiryService {

    private final ConsignmentService consignmentService;
    private final InquiryRepository inquiryRepository;
    private final EmailService emailService;
    private final String adminEmail;

    public InquiryService(
            ConsignmentService consignmentService,
            InquiryRepository inquiryRepository,
            EmailService emailService,
            @Value("${app.mail.admin-email:deploydream@gmail.com}") String adminEmail
    ) {
        this.consignmentService = consignmentService;
        this.inquiryRepository = inquiryRepository;
        this.emailService = emailService;
        this.adminEmail = adminEmail;
    }

    public Inquiry processInquiry(InquiryRequest request) {
        Consignment consignment = consignmentService.findById(request.consignmentId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid consignment ID."));

        Inquiry savedInquiry = inquiryRepository.save(Inquiry.fromRequest(request, consignment, adminEmail));
        emailService.sendInquiryEmailToAdmin(savedInquiry);
        return savedInquiry;
    }
}
