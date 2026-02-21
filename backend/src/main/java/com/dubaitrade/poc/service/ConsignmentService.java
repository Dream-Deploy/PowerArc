package com.dubaitrade.poc.service;

import com.dubaitrade.poc.model.Consignment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsignmentService {

    public List<Consignment> getConsignments() {
        return List.of(
                new Consignment(
                        "CLTH-001",
                        "Premium Fashion Garments",
                        "Clothes",
                        "Export-ready seasonal garments with mixed MOQ and GCC-compliant packaging.",
                        "Nora Al Falasi",
                        "garments.owner@dubaimultitrade.com"
                ),
                new Consignment(
                        "MED-014",
                        "Certified Clinical Equipment",
                        "Medical Equipment",
                        "Monitors, infusion systems, and PPE consignments from licensed warehouse stock.",
                        "Dr. Omar Saeed",
                        "medical.owner@dubaimultitrade.com"
                ),
                new Consignment(
                        "ELX-032",
                        "Consumer Electronics Batch",
                        "Electronic Devices",
                        "Smart devices and accessories with customs-ready HS documentation.",
                        "Reem Al Mansoori",
                        "electronics.owner@dubaimultitrade.com"
                )
        );
    }

    public Optional<Consignment> findById(String consignmentId) {
        return getConsignments()
                .stream()
                .filter(consignment -> consignment.id().equals(consignmentId))
                .findFirst();
    }
}
