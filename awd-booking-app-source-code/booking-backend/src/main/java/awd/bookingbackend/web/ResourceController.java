package awd.bookingbackend.web;

import awd.bookingbackend.model.dto.ResourceDto;
import awd.bookingbackend.model.enumeration.Category;
import awd.bookingbackend.model.Resource;
import awd.bookingbackend.service.ResourceService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/create")
    public ResponseEntity<Resource> createResource(@RequestBody ResourceDto dto) {
        Resource createdResource = resourceService.createResource(dto);
        return ResponseEntity.ok(createdResource);
    }

    @PutMapping("/edit/{resourceId}")
    public ResponseEntity<Resource> editResource(
            @PathVariable Long resourceId,
            @RequestBody ResourceDto dto) {
        Resource updatedResource = resourceService.editResource(resourceId, dto);
        return ResponseEntity.ok(updatedResource);
    }

    @DeleteMapping("/delete/{resourceId}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long resourceId) {
        resourceService.deleteResource(resourceId);
        return ResponseEntity.noContent().build();
    }

}

