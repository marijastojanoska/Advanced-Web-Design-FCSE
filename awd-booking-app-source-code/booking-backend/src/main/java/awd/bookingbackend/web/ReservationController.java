package awd.bookingbackend.web;

import awd.bookingbackend.model.dto.ReservationDto;
import awd.bookingbackend.model.Reservation;
import awd.bookingbackend.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin("http://localhost:3000")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/user/{username}")
    public List<Reservation> findAllReservationsForUser(@PathVariable String username) {
        return reservationService.findAllReservationsForUser(username);
    }

    @PostMapping("reserve")
    public Reservation makeReservation(@RequestBody ReservationDto reservationDto) {
        return reservationService.makeReservation(
                reservationDto.getUsername(),
                reservationDto.getResourceId(),
                reservationDto.getDateFrom(),
                reservationDto.getDateTo()
        );
    }
}

