package com.crm.crm.organizations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.crm.helpers.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/organizations")
public class OrganizationController {
    private final OrganizationService organizationService;

    @Autowired
    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping
    public ApiResponse<List<Organization>> index() {
        return this.organizationService.index();
    }

    @GetMapping("/{id}")
    public ApiResponse<Organization> show(@PathVariable Long id) {
        return this.organizationService.show(id);
    }

    @PostMapping
    public ApiResponse<Organization> store(@RequestBody Organization organization) {
        return this.organizationService.store(organization);
    }

    @PostMapping("/create-many")
    public ApiResponse<List<Organization>> storeMany(@RequestBody List<Organization> organizations) {
        return this.organizationService.storeMany(organizations);
    }

    @PutMapping("/{id}")
    public ApiResponse<Organization> update(@PathVariable Long id, @RequestBody Organization organization) {
        return this.organizationService.update(id, organization);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> destroy(@PathVariable Long id) {
        return this.organizationService.destroy(id);
    }
}