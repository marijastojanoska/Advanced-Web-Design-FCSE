package awd.bookingbackend.model.dto;

import awd.bookingbackend.model.enumeration.Category;
import lombok.Data;

@Data
public class ResourceDto {
    private String name;
    private String city;
    private String country;
    private String imageUrl;
    private Double pricePerNight;
    private Category category;

    public ResourceDto() {
    }

    public ResourceDto(String name, String city, String country, String imageUrl, Double pricePerNight, Category category) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.imageUrl = imageUrl;
        this.pricePerNight = pricePerNight;
        this.category = category;
    }
}
