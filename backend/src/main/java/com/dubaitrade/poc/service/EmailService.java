package com.dubaitrade.poc.service;

import com.dubaitrade.poc.model.Inquiry;
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

    public void sendInquiryEmailToAdmin(Inquiry inquiry) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(inquiry.getAdminEmail());
        message.setReplyTo(inquiry.getEmail());
        message.setSubject("New inquiry received: " + inquiry.getConsignmentTitle());
        message.setText(buildMailBody(inquiry));

        try {
            mailSender.send(message);
        } catch (MailException exception) {
            throw new IllegalStateException("Email could not be sent. Check mail configuration.", exception);
        }
    }

    private String buildMailBody(Inquiry inquiry) {
        return "A new inquiry has been submitted from the Dubai MultiTrade portal.\n\n"
                + "Inquiry ID: " + inquiry.getId() + "\n"
                + "Submitted At: " + inquiry.getCreatedAt() + "\n\n"
                + "Customer Name: " + inquiry.getFullName() + "\n"
                + "Customer Email: " + inquiry.getEmail() + "\n"
                + "Customer Phone: " + inquiry.getPhone() + "\n"
                + "Company: " + inquiry.getCompany() + "\n"
                + "Consignment ID: " + inquiry.getConsignmentId() + "\n"
                + "Consignment Title: " + inquiry.getConsignmentTitle() + "\n"
                + "Consignment Owner: " + inquiry.getConsignmentOwnerName() + "\n\n"
                + "Requirement Details:\n"
                + inquiry.getMessage();
    }
}
