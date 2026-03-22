package com.example.HRMS.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "special_pricing")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecialPricing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private BigDecimal multiplier;

    private String description;
}