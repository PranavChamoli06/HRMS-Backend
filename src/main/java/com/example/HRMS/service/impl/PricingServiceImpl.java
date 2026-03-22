package com.example.HRMS.service.impl;

import com.example.HRMS.entity.SpecialPricing;
import com.example.HRMS.repository.SpecialPricingRepository;
import com.example.HRMS.service.PricingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PricingServiceImpl implements PricingService {

    private final SpecialPricingRepository specialPricingRepository;

    @Override
    public double calculatePrice(double basePrice, LocalDate date) {

        // ✅ 1. Check DB for special pricing (Festival / Special Days)
        return specialPricingRepository.findByDate(date)
                .map(sp -> applySpecialPricing(basePrice, sp))
                .orElseGet(() -> applyWeekendOrDefault(basePrice, date));
    }

    // ================= HELPER METHODS =================

    private double applySpecialPricing(double basePrice, SpecialPricing sp) {
        return basePrice * sp.getMultiplier().doubleValue();
    }

    private double applyWeekendOrDefault(double basePrice, LocalDate date) {

        DayOfWeek day = date.getDayOfWeek();

        if (day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY) {
            return basePrice * 1.20;
        }

        return basePrice;
    }
}