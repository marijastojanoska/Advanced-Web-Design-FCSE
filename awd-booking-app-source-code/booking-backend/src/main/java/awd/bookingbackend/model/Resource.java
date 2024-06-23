package awd.bookingbackend.model;

import awd.bookingbackend.model.enumeration.Category;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String city;
    private String country;
    private String imageUrl;
    private Double pricePerNight;
    @Enumerated(EnumType.STRING)
    private Category category;
    @OneToMany(mappedBy = "resource", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("resource")
    private List<Reservation> reservations = new ArrayList<>();

    public Resource(String name, String city, String country, String imageUrl, Double price, Category category) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.imageUrl = imageUrl;
        this.pricePerNight = price;
        this.category = category;
    }
}



