package awd.bookingbackend.service;

import awd.bookingbackend.model.enumeration.Category;
import awd.bookingbackend.model.Resource;
import awd.bookingbackend.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceService {
    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<Resource> findByCategory(Category category) {
        return resourceRepository.findByCategory(category);
    }

    public List<Resource> findAll() {
        return resourceRepository.findAll();
    }

    public Resource findById(Long id) {
        return resourceRepository.findById(id).get();
    }

    public List<Resource> filterByCityAndDate(String city, LocalDate dateFrom, LocalDate dateTo) {
        if (city != null && dateFrom != null && dateTo != null) {
            return this.findAll().stream()
                    .filter(resource -> resource.getCity().equals(city)
                            && !this.hasReservationForDate(resource, dateFrom, dateTo))
                    .collect(Collectors.toList());
        } else if (city != null) {
            return this.findAll().stream()
                    .filter(resource -> resource.getCity().equals(city))
                    .collect(Collectors.toList());
        } else if (dateFrom != null && dateTo != null) {
            return this.findAll().stream()
                    .filter(resource -> !this.hasReservationForDate(resource, dateFrom, dateTo))
                    .collect(Collectors.toList());
        } else {
            return this.findAll();
        }
    }

    public boolean hasReservationForDate(Resource resource, LocalDate dateFrom, LocalDate dateTo) {
        return resource.getReservations().stream()
                .anyMatch(reservation ->
                        (dateFrom.isEqual(reservation.getDateFrom()) || dateFrom.isEqual(reservation.getDateTo())) ||
                        (dateFrom.isBefore(reservation.getDateTo()) && dateTo.isAfter(reservation.getDateFrom())));
    }


}

