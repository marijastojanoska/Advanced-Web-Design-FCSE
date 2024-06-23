package awd.bookingbackend.service;

import awd.bookingbackend.model.Reservation;
import awd.bookingbackend.model.Resource;
import awd.bookingbackend.model.User;
import awd.bookingbackend.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ResourceService resourceService;
    private final UserService userService;

    public ReservationService(ReservationRepository reservationRepository, ResourceService resourceService, UserService userService) {
        this.reservationRepository = reservationRepository;
        this.resourceService = resourceService;
        this.userService = userService;
    }

    public List<Reservation> findAllReservationsForUser(String username) {
        return reservationRepository.findByUserUsername(username);
    }

    public Reservation makeReservation(String username, Long resourceId, LocalDate dateFrom, LocalDate dateTo) {
        User user = userService.findByUsername(username);
        Resource resource = resourceService.findById(resourceId);
        if (!resourceService.hasReservationForDate(resource, dateFrom, dateTo) && dateFrom.isBefore(dateTo)) {
            Reservation reservation = new Reservation();
            reservation.setUser(user);
            reservation.setResource(resource);
            reservation.setDateFrom(dateFrom);
            reservation.setDateTo(dateTo);
            return reservationRepository.save(reservation);
        } else {
            throw new IllegalArgumentException("Resource is already booked for the selected dates.");
        }
    }
}
