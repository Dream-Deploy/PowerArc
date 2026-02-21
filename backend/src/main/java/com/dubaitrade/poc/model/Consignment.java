package com.dubaitrade.poc.model;

public record Consignment(
        String id,
        String title,
        String category,
        String description,
        String ownerName,
        String ownerEmail
) {
}
