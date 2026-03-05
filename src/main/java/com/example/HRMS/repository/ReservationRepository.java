package com.example.HRMS.repository;

import com.example.HRMS.entity.Reservation;
import com.example.HRMS.entity.ReservationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findByUserUsername(String username, Pageable pageable);

    Page<Reservation> findByCheckInDateAfter(LocalDate date, Pageable pageable);

    List<Reservation> findByRoomIdAndCheckOutDateAfterAndCheckInDateBefore(
            Long roomId,
            LocalDate checkInDate,
            LocalDate checkOutDate
    );
    @Query("""
SELECT SUM(r.room.pricePerNight *
           DATEDIFF(r.checkOutDate, r.checkInDate))
FROM Reservation r
WHERE r.status = 'CONFIRMED'
""")
    Double calculateTotalRevenue();


    @Query("""
SELECT COUNT(DISTINCT r.room.id)
FROM Reservation r
WHERE r.status = 'CONFIRMED'
""")
    long countBookedRooms();


    @Query("""
SELECT COUNT(DISTINCT r.room.id)
FROM Reservation r
""")
    long countDistinctRooms();


    @Query("""
SELECT FUNCTION('MONTHNAME', r.checkInDate),
       SUM(r.room.pricePerNight)
FROM Reservation r
WHERE r.status = 'CONFIRMED'
GROUP BY FUNCTION('MONTHNAME', r.checkInDate)
""")
    List<Object[]> getMonthlyRevenue();;

    long countByStatus(ReservationStatus status);
}