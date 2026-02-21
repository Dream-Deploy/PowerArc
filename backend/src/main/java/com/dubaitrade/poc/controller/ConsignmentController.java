package com.dubaitrade.poc.controller;

import com.dubaitrade.poc.model.Consignment;
import com.dubaitrade.poc.service.ConsignmentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/consignments")
public class ConsignmentController {

    private final ConsignmentService consignmentService;

    public ConsignmentController(ConsignmentService consignmentService) {
        this.consignmentService = consignmentService;
    }

    @GetMapping
    public List<Consignment> listConsignments() {
        return consignmentService.getConsignments();
    }
}
