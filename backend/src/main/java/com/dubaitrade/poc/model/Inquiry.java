package com.dubaitrade.poc.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "inquiries")
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String fullName;

    @Column(nullable = false, length = 160)
    private String email;

    @Column(nullable = false, length = 40)
    private String phone;

    @Column(nullable = false, length = 160)
    private String company;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false, length = 40)
    private String consignmentId;

    @Column(nullable = false, length = 180)
    private String consignmentTitle;

    @Column(nullable = false, length = 160)
    private String consignmentOwnerName;

    @Column(nullable = false, length = 255)
    private String adminEmail;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    protected Inquiry() {
        // Required by JPA
    }

    private Inquiry(
            String fullName,
            String email,
            String phone,
            String company,
            String message,
            String consignmentId,
            String consignmentTitle,
            String consignmentOwnerName,
            String adminEmail,
            LocalDateTime createdAt
    ) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.company = company;
        this.message = message;
        this.consignmentId = consignmentId;
        this.consignmentTitle = consignmentTitle;
        this.consignmentOwnerName = consignmentOwnerName;
        this.adminEmail = adminEmail;
        this.createdAt = createdAt;
    }

    public static Inquiry fromRequest(InquiryRequest request, Consignment consignment, String adminEmail) {
        return new Inquiry(
                request.fullName(),
                request.email(),
                request.phone(),
                request.company(),
                request.message(),
                consignment.id(),
                consignment.title(),
                consignment.ownerName(),
                adminEmail,
                LocalDateTime.now()
        );
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getCompany() {
        return company;
    }

    public String getMessage() {
        return message;
    }

    public String getConsignmentId() {
        return consignmentId;
    }

    public String getConsignmentTitle() {
        return consignmentTitle;
    }

    public String getConsignmentOwnerName() {
        return consignmentOwnerName;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
