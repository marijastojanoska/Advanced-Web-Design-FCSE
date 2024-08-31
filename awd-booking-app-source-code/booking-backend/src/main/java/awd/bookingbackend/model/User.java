package awd.bookingbackend.model;

import awd.bookingbackend.model.enumeration.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Table(name = "app_user")
public class User {
    @Id
    private String username;

    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("user")
    private Set<Reservation> reservations = new HashSet<>();
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
    private Boolean loggedIn = false;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
