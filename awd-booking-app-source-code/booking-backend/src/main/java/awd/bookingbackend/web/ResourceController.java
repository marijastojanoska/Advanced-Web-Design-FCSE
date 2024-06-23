package awd.bookingbackend.web;

import awd.bookingbackend.model.enumeration.Category;
import awd.bookingbackend.model.Resource;
import awd.bookingbackend.service.ResourceService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin("http://localhost:3000")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping("/category/{category}")
    public List<Resource> findByCategory(@PathVariable Category category) {
        return resourceService.findByCategory(category);
    }

    @GetMapping("/{id}")
    public Resource findById(@PathVariable Long id) {
        return resourceService.findById(id);
    }

    @PostMapping()
    public List<Resource> filterByCityAndDate(@RequestParam(required = false) String city,
                                              @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
                                              @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        return resourceService.filterByCityAndDate(city, dateFrom, dateTo);
    }

}

