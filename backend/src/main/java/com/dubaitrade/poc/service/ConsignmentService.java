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
                        "PTL-021",
                        "Industrial Power Tools Batch",
                        "Power Tools",
                        "Drills, drivers, grinders, and cutter units packed for mixed-carton and pallet wholesale orders.",
                        "Hassan Qureshi",
                        "powertools.owner@powerarc.com"
                ),
                new Consignment(
                        "CLTH-001",
                        "Premium Fashion Garments",
                        "Clothes",
                        "Export-ready seasonal garments with mixed-size assortments and distributor-friendly MOQ.",
                        "Nora Al Falasi",
                        "garments.owner@powerarc.com"
                ),
                new Consignment(
                        "GDT-118",
                        "Consumer Gadget Collection",
                        "Gadgets",
                        "Wearables, desk tech, and mobile accessories for rapid ecommerce catalog refresh.",
                        "Layla Rahman",
                        "gadgets.owner@powerarc.com"
                ),
                new Consignment(
                        "MED-014",
                        "Certified Clinical Equipment",
                        "Medical Equipment",
                        "Monitors, infusion systems, and PPE consignments with compliance-ready documentation.",
                        "Dr. Omar Saeed",
                        "medical.owner@powerarc.com"
                ),
                new Consignment(
                        "ELX-032",
                        "Consumer Electronics Portfolio",
                        "Electronics",
                        "Smart devices, appliances, and accessories with customs-ready HS documentation.",
                        "Reem Al Mansoori",
                        "electronics.owner@powerarc.com"
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
