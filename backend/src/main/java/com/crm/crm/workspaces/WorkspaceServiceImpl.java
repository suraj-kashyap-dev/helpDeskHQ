package com.crm.crm.workspaces;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.crm.crm.exceptions.resources.ResourceCreationException;
import com.crm.crm.exceptions.resources.ResourceDeletionException;
import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.exceptions.resources.ResourceUpdateException;
import com.crm.crm.helpers.ApiResponse;
import com.crm.crm.organizations.Organization;
import com.crm.crm.organizations.OrganizationRepository;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final OrganizationRepository organizationRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public WorkspaceServiceImpl(
        WorkspaceRepository workspaceRepository,
        OrganizationRepository organizationRepository,
        ModelMapper modelMapper
    ) {
        this.workspaceRepository = workspaceRepository;
        this.organizationRepository = organizationRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ApiResponse<List<Workspace>> index() {
        try {
            List<Workspace> workspaces = this.workspaceRepository.findAllByOrderByCreatedAtDesc();
            return ApiResponse.success("Workspaces retrieved successfully", workspaces);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving workspaces", e);
        }
    }

    @Override
    public ApiResponse<Workspace> show(Long id) {
        try {
            Optional<Workspace> workspace = this.workspaceRepository.findById(id);

            return workspace
                .map(ws -> ApiResponse.success("Workspace retrieved successfully", ws))
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving workspace", e);
        }
    }

    @Override
    public ApiResponse<Workspace> store(WorkspaceDTO workspaceDTO) {
        try {
            Optional<Organization> organizationOpt = Optional.empty();

            if (workspaceDTO.getOrganizationId() != null) {
                organizationOpt = this.organizationRepository.findById(workspaceDTO.getOrganizationId());
    
                if (organizationOpt.isEmpty()) {
                    throw new ResourceNotFoundException("Organization not found");
                }
            }

            Workspace workspace = this.modelMapper.map(workspaceDTO, Workspace.class);
            organizationOpt.ifPresent(workspace::setOrganization);

            Workspace savedWorkspace = this.workspaceRepository.save(workspace);
            return ApiResponse.success("Workspace created successfully", savedWorkspace);

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceCreationException("Error creating workspace: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Workspace> update(Long id, WorkspaceDTO workspaceDto) {
        try {
            Optional<Organization> organizationOpt = Optional.empty();

            if (workspaceDto.getOrganizationId() != null) {
                organizationOpt = this.organizationRepository.findById(workspaceDto.getOrganizationId());
                
                if (organizationOpt.isEmpty()) {
                    throw new ResourceNotFoundException("Organization not found");
                }
            }

            Optional<Workspace> workspaceOpt = this.workspaceRepository.findById(id);

            if (workspaceOpt.isEmpty()) {
                throw new ResourceNotFoundException("Workspace not found");
            }

            Workspace existingWorkspace = workspaceOpt.get();
            
            existingWorkspace.setName(workspaceDto.getName());
            existingWorkspace.setSettings(workspaceDto.getSettings());
            
            organizationOpt.ifPresent(existingWorkspace::setOrganization);

            Workspace updatedWorkspace = this.workspaceRepository.save(existingWorkspace);

            return ApiResponse.success("Workspace updated successfully", updatedWorkspace);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();

            throw new ResourceUpdateException("Error updating workspace: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Void> destroy(Long id) {
        try {
            if (!this.workspaceRepository.existsById(id)) {
                throw new ResourceNotFoundException("Workspace not found");
            }

            this.workspaceRepository.deleteById(id);
            return ApiResponse.success("Workspace deleted successfully", null);

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (DataIntegrityViolationException e) {
            throw new ResourceDeletionException("Error deleting workspace. It is being used by another resource");
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceDeletionException("Error deleting workspace");
        }
    }
}
