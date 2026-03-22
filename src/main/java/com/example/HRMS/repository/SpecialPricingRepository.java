package com.example.HRMS.repository;

import com.example.HRMS.entity.SpecialPricing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface SpecialPricingRepository extends JpaRepository<SpecialPricing, Long> {

    Optional<SpecialPricing> findByDate(LocalDate date);
}