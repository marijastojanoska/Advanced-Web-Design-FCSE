package awd.bookingbackend.config;

import awd.bookingbackend.model.Reservation;
import awd.bookingbackend.model.Resource;
import awd.bookingbackend.model.User;
import awd.bookingbackend.model.dto.ResourceDto;
import awd.bookingbackend.model.dto.ReservationDto;
import awd.bookingbackend.repository.ReservationRepository;
import awd.bookingbackend.repository.ResourceRepository;
import awd.bookingbackend.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class DataInitializer {

    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;
    private final ReservationRepository reservationRepository;
    private final ObjectMapper objectMapper;

    public DataInitializer(UserRepository userRepository, ResourceRepository resourceRepository,
                           ReservationRepository reservationRepository, ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.resourceRepository = resourceRepository;
        this.reservationRepository = reservationRepository;
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void run() {
        try {
            if (userRepository.count() == 0) {
                User defaultUser = new User("user", "user");
                userRepository.save(defaultUser);
            }

            List<ResourceDto> resourceDtos = objectMapper.readValue(
                    new ClassPathResource("resources.json").getInputStream(),
                    new TypeReference<List<ResourceDto>>() {
                    }
            );

            if (resourceRepository.count() == 0) {
                List<Resource> resources = resourceDtos.stream()
                        .map(dto -> new Resource(dto.getName(), dto.getCity(), dto.getCountry(),
                                dto.getImageUrl(), dto.getPricePerNight(), dto.getCategory()))
                        .collect(Collectors.toList());
                resources.forEach(r->r.setOwner(userRepository.findByUsername("user").get()));
                resourceRepository.saveAll(resources);
            }

            List<ReservationDto> reservationDtos = objectMapper.readValue(
                    new ClassPathResource("reservations.json").getInputStream(),
                    new TypeReference<List<ReservationDto>>() {
                    }
            );

            if (reservationRepository.count() == 0) {
                for (ReservationDto reservationDto : reservationDtos) {
                    Optional<User> optionalUser = userRepository.findByUsername(reservationDto.getUsername());
                    Optional<Resource> optionalResource = resourceRepository.findById(reservationDto.getResourceId());

                    if (optionalUser.isPresent() && optionalResource.isPresent()) {
                        User user = optionalUser.get();
                        Resource resource = optionalResource.get();
                        Reservation reservation = new Reservation(user, resource,
                                reservationDto.getDateFrom(), reservationDto.getDateTo());
                        reservationRepository.save(reservation);
                    }
                }
            }

        } catch (IOException ignored) {
        }
    }
}
