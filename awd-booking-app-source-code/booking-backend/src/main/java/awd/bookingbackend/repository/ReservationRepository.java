package awd.bookingbackend.repository;


import awd.bookingbackend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserUsername(String username);

    List<Reservation> findByResourceId(Long id);
}
