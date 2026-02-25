package com.dubaitrade.poc.repository;

import com.dubaitrade.poc.model.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
}
