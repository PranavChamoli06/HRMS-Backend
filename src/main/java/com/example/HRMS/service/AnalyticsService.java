package com.example.HRMS.service;

import java.util.Map;

public interface AnalyticsService {

    Double getTotalRevenue();

    Double getOccupancyRate();

    Map<String, Double> getMonthlyRevenue();

    Double getCancellationRate();
}