package awd.bookingbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Resource resource;
    private LocalDate dateFrom;
    private LocalDate dateTo;

    public Reservation(User user, Resource resource, LocalDate dateFrom, LocalDate dateTo) {
        this.user = user;
        this.resource = resource;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}

