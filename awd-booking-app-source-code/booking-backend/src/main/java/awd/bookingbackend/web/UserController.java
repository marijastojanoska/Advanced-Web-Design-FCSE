package awd.bookingbackend.web;

import awd.bookingbackend.model.User;
import awd.bookingbackend.model.dto.UserDto;
import awd.bookingbackend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody UserDto userDto) {
        return userService.register(userDto);
    }

    @PostMapping("/login")
    public User login(@RequestBody UserDto userDto) {
        return userService.login(userDto.getUsername(), userDto.getPassword());
    }

    @PostMapping("/logout")
    public void logout() {
        userService.logout();
    }
}

