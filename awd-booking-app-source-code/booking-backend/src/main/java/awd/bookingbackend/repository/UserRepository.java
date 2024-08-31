package awd.bookingbackend.repository;

import awd.bookingbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndPassword(String username, String password);
    List<User> findAllByLoggedInTrue();
}
