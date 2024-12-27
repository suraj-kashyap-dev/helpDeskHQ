package com.crm.crm.organizations;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crm.crm.helpers.ApiResponse;

@RestController
@RequestMapping("/organizations")
public class OrganizationController {
    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Organization>>> index() {
        ApiResponse<List<Organization>> response = organizationService.index();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Organization>> show(@PathVariable Long id) {
        ApiResponse<Organization> response = organizationService.show(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Organization>> store(@RequestBody OrganizationDTO organizationDto) {
        ApiResponse<Organization> response = organizationService.store(organizationDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create-many")
    public ResponseEntity<ApiResponse<List<Organization>>> storeMany(@RequestBody List<OrganizationDTO> organizations) {
        ApiResponse<List<Organization>> response = organizationService.storeMany(organizations);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Organization>> update(
        @PathVariable Long id,
        @RequestBody OrganizationDTO organization
    ) {
        ApiResponse<Organization> response = organizationService.update(id, organization);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> response = organizationService.destroy(id);
        return ResponseEntity.ok(response);
    }
}
