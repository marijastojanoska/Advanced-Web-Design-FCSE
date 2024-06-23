package awd.bookingbackend.model.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReservationDto {
    private String username;
    private Long resourceId;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    public ReservationDto() {
    }

    public ReservationDto(String username, Long resourceId, LocalDate dateFrom, LocalDate dateTo) {
        this.username = username;
        this.resourceId = resourceId;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}
