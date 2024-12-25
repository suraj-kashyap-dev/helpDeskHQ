package com.crm.crm.organizations;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.crm.crm.exceptions.resources.ResourceCreationException;
import com.crm.crm.exceptions.resources.ResourceDeletionException;
import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.exceptions.resources.ResourceUpdateException;
import com.crm.crm.helpers.ApiResponse;

import org.modelmapper.ModelMapper;

@Service
public class OrganizationServiceImpl implements OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public OrganizationServiceImpl(
        OrganizationRepository organizationRepository,
        ModelMapper modelMapper
    ) {
        this.organizationRepository = organizationRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ApiResponse<List<Organization>> index() {
        try {
            List<Organization> organizations = this.organizationRepository.findAllByOrderByCreatedAtDesc();
            return ApiResponse.success("Organizations retrieved successfully", organizations);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving organizations", e);
        }
    }

    @Override
    public ApiResponse<Organization> show(Long id) {
        try {
            Optional<Organization> organization = this.organizationRepository.findById(id);

            return organization
                .map(org -> ApiResponse.success("Organization retrieved successfully", org))
                .orElseThrow(() -> new ResourceNotFoundException("Organization not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving organization", e);
        }
    }

    @Override
    public ApiResponse<Organization> store(OrganizationDTO organizationDto) {
        try {
            Organization organization = this.modelMapper.map(organizationDto, Organization.class);

            return ApiResponse.success(
                "Organization created successfully", 
                this.organizationRepository.save(organization)
            );
        } catch (Exception e) {
            throw new ResourceCreationException("Error creating organization");
        }
    }

    @Override
    public ApiResponse<List<Organization>> storeMany(Iterable<OrganizationDTO> organizationDtos) {
        try {
            List<Organization> organizations = 
                ((List<OrganizationDTO>) organizationDtos)
                .stream()
                .map(dto -> modelMapper.map(dto, Organization.class))
                .collect(Collectors.toList());

            List<Organization> savedOrganizations = organizationRepository.saveAll(organizations);

            return ApiResponse.success("Organizations created successfully", savedOrganizations);
        } catch (Exception e) {
            throw new ResourceCreationException("Error creating multiple organizations");
        }
    }

    @Override
    public ApiResponse<Organization> update(Long id, OrganizationDTO organizationDto) {
        try {
            Organization organization = this.modelMapper.map(organizationDto, Organization.class);

            Optional<Organization> existingOrg = this.organizationRepository.findById(id);

            if (existingOrg.isEmpty()) {
                throw new ResourceNotFoundException("Organization not found");
            }

            Organization organizationToUpdate = existingOrg.get();

            organizationToUpdate.setName(organization.getName());
            organizationToUpdate.setDomain(organization.getDomain());
            organizationToUpdate.setSubscriptionType(organization.getSubscriptionType());
            organizationToUpdate.setSettings(organization.getSettings());

            return ApiResponse.success(
                "Organization updated successfully", 
                this.organizationRepository.save(organizationToUpdate)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResourceUpdateException("Error updating organization");
        }
    }

    @Override
    public ApiResponse<Void> destroy(Long id) {
        try {
            if (!this.organizationRepository.existsById(id)) {
                throw new ResourceNotFoundException("Organization not found");
            }

            this.organizationRepository.deleteById(id);
            return ApiResponse.success("Organization deleted successfully", null);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (DataIntegrityViolationException e) {
            throw new ResourceDeletionException("Error deleting organization. It is being used by another resource");
        } catch (Exception e) {
            System.out.println(e);
            throw new ResourceDeletionException("Error deleting organization");
        }
    }
}
