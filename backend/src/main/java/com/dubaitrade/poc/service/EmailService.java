package com.dubaitrade.poc.service;

import com.dubaitrade.poc.model.Consignment;
import com.dubaitrade.poc.model.InquiryRequest;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendInquiryEmail(InquiryRequest request, Consignment consignment) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(consignment.ownerEmail());
        message.setReplyTo(request.email());
        message.setSubject("New consignment inquiry: " + consignment.title());
        message.setText(buildMailBody(request, consignment));

        try {
            mailSender.send(message);
        } catch (MailException exception) {
            throw new IllegalStateException("Email could not be sent. Check mail configuration.", exception);
        }
    }

    private String buildMailBody(InquiryRequest request, Consignment consignment) {
        return "A new inquiry has been submitted from the Dubai MultiTrade portal.\n\n"
                + "Customer Name: " + request.fullName() + "\n"
                + "Customer Email: " + request.email() + "\n"
                + "Customer Phone: " + request.phone() + "\n"
                + "Company: " + request.company() + "\n"
                + "Consignment ID: " + consignment.id() + "\n"
                + "Consignment Title: " + consignment.title() + "\n"
                + "Consignment Owner: " + consignment.ownerName() + "\n\n"
                + "Requirement Details:\n"
                + request.message();
    }
}
