package awd.bookingbackend.service;

import awd.bookingbackend.model.User;
import awd.bookingbackend.model.dto.UserDto;
import awd.bookingbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(UserDto userDto) {
        User user = new User(userDto.getUsername(),userDto.getPassword());
        return userRepository.save(user);
    }

    public User login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password).get();
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    public void logout() {
        //todo
    }
}

