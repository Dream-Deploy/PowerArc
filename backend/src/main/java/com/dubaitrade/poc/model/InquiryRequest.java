package com.dubaitrade.poc.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record InquiryRequest(
        @NotBlank(message = "Full name is required")
        String fullName,
        @NotBlank(message = "Email is required")
        @Email(message = "Email format is invalid")
        String email,
        @NotBlank(message = "Phone is required")
        String phone,
        @NotBlank(message = "Company is required")
        String company,
        @NotBlank(message = "Message is required")
        String message,
        @NotBlank(message = "Consignment ID is required")
        String consignmentId
) {
}
