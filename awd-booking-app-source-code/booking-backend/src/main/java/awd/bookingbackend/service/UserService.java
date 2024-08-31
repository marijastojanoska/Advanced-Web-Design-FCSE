package awd.bookingbackend.service;

import awd.bookingbackend.model.User;
import awd.bookingbackend.model.dto.UserDto;
import awd.bookingbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(UserDto userDto) {
        List<User> users = this.userRepository.findAll();
        users.forEach(u -> u.setLoggedIn(false));
        userRepository.saveAll(users);
        User user = new User(userDto.getUsername(), userDto.getPassword());
        user.setLoggedIn(true);
        return userRepository.save(user);
    }

    public User login(String username, String password) {
        List<User> users = this.userRepository.findAll();
        users.forEach(u -> u.setLoggedIn(false));
        userRepository.saveAll(users);
        User user = userRepository.findByUsernameAndPassword(username, password).get();
        user.setLoggedIn(true);
        userRepository.save(user);
        return user;
    }

    public User findLoggedInUser() {
        List<User> loggedInUsers = this.userRepository.findAllByLoggedInTrue();
        return loggedInUsers.isEmpty() ? null : loggedInUsers.get(0);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    public void logout() {
        List<User> users = this.userRepository.findAll();
        users.forEach(u -> u.setLoggedIn(false));
        userRepository.saveAll(users);
    }
}

