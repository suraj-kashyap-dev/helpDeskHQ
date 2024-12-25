package com.crm.crm.organizations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.crm.crm.helpers.ApiResponse;

@Component
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    @Autowired
    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public ApiResponse<List<Organization>> index() {
        List<Organization> organizations = this.organizationRepository.findAllByOrderByCreatedAtDesc();

        return ApiResponse.success("Organizations retrieved successfully", organizations);
    }

    public ApiResponse<Organization> show(Long id) {
        Optional<Organization> organization = this.organizationRepository.findById(id);

        return organization
                .map(org -> ApiResponse.success("Organization retrieved successfully", org))
                .orElse(ApiResponse.error("Organization not found", null));
    }

    public ApiResponse<Organization> store(Organization organization) {
        Organization savedOrganization = this.organizationRepository.save(organization);

        return ApiResponse.success("Organization created successfully", savedOrganization);
    }

    public ApiResponse<List<Organization>> storeMany(Iterable<Organization> organizations) {
        List<Organization> savedOrganizations = this.organizationRepository.saveAll(organizations);

        return ApiResponse.success("Organizations created successfully", savedOrganizations);
    }

    public ApiResponse<Organization> update(Long id, Organization organization) {
        Optional<Organization> existingOrg = this.organizationRepository.findById(id);
        
        if (existingOrg.isEmpty()) {
            return ApiResponse.error("Organization not found", null);
        }

        Organization organizationToUpdate = existingOrg.get();

        organizationToUpdate.setName(organization.getName());
        organizationToUpdate.setDomain(organization.getDomain());
        organizationToUpdate.setSubscriptionType(organization.getSubscriptionType());
        organizationToUpdate.setSettings(organization.getSettings());

        Organization updatedOrganization = this.organizationRepository.save(organizationToUpdate);

        return ApiResponse.success("Organization updated successfully", updatedOrganization);
    }

    public ApiResponse<Void> destroy(Long id) {
        if (! this.organizationRepository.existsById(id)) {
            return ApiResponse.error("Organization not found", null);
        }

        this.organizationRepository.deleteById(id);

        return ApiResponse.success("Organization deleted successfully", null);
    }
}
