package com.dubaitrade.poc.service;

import com.dubaitrade.poc.model.Inquiry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;

import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private final RestClient restClient;
    private final String resendApiKey;
    private final String resendEndpoint;
    private final String fromEmail;

    public EmailService(
            RestClient.Builder restClientBuilder,
            @Value("${app.mail.resend.api-key:}") String resendApiKey,
            @Value("${app.mail.resend.endpoint:https://api.resend.com/emails}") String resendEndpoint,
            @Value("${app.mail.resend.from-email:onboarding@resend.dev}") String fromEmail
    ) {
        this.restClient = restClientBuilder.build();
        this.resendApiKey = resendApiKey;
        this.resendEndpoint = resendEndpoint;
        this.fromEmail = fromEmail;
    }

    public void sendInquiryEmailToAdmin(Inquiry inquiry) {
        if (resendApiKey == null || resendApiKey.isBlank()) {
            throw new IllegalStateException("Email could not be sent. Missing RESEND_API_KEY configuration.");
        }

        try {
            Map<String, Object> payload = Map.of(
                    "from", fromEmail,
                    "to", List.of(inquiry.getAdminEmail()),
                    "subject", "New inquiry received: " + inquiry.getConsignmentTitle(),
                    "text", buildMailBody(inquiry),
                    "reply_to", inquiry.getEmail()
            );

            restClient.post()
                    .uri(resendEndpoint)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + resendApiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientResponseException exception) {
            throw new IllegalStateException(
                    "Email could not be sent. Resend API rejected the request with status "
                            + exception.getStatusCode().value() + ".",
                    exception
            );
        } catch (RestClientException exception) {
            throw new IllegalStateException("Email could not be sent. Check HTTPS email configuration.", exception);
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
