package awd.bookingbackend.repository;

import awd.bookingbackend.model.enumeration.Category;
import awd.bookingbackend.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByCategory(Category category);
    List<Resource> findByCity(String city);
}
