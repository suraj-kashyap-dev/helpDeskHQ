package com.crm.crm.workspaces;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        List<Workspace> workspaces = this.workspaceRepository.findAllByOrderByCreatedAtDesc();
        return ApiResponse.success("Workspaces retrieved successfully", workspaces);
    }

    @Override
    public ApiResponse<Workspace> show(Long id) {
        return this.workspaceRepository.findById(id)
                .map(workspace -> ApiResponse.success("Workspace retrieved successfully", workspace))
                .orElse(ApiResponse.error("Workspace not found", null));
    }

    @Override
    public ApiResponse<Workspace> store(WorkspaceDTO workspaceDTO) {
        Organization organization = organizationRepository.findById(workspaceDTO.getOrganization_id())
            .orElseThrow(() -> new IllegalArgumentException("Organization not found with ID: " + workspaceDTO.getOrganization_id()));
    
        Workspace workspace = this.modelMapper.map(workspaceDTO, Workspace.class);
        workspace.setOrganization(organization);
    
        Workspace savedWorkspace = this.workspaceRepository.save(workspace);
        return ApiResponse.success("Workspace created successfully", savedWorkspace);
    }

    @Override
    public ApiResponse<List<Workspace>> storeMany(Iterable<Workspace> workspaces) {
        List<Workspace> savedWorkspaces = this.workspaceRepository.saveAll(workspaces);
        return ApiResponse.success("Workspaces created successfully", savedWorkspaces);
    }

    @Override
    public ApiResponse<Workspace> update(Long id, Workspace workspace) {
        return this.workspaceRepository.findById(id)
                .map(existingWorkspace -> {
                    existingWorkspace.setName(workspace.getName());
                    existingWorkspace.setOrganization(workspace.getOrganization());
                    existingWorkspace.setSettings(workspace.getSettings());

                    Workspace updatedWorkspace = this.workspaceRepository.save(existingWorkspace);
                    return ApiResponse.success("Workspace updated successfully", updatedWorkspace);
                })
                .orElse(ApiResponse.error("Workspace not found", null));
    }

    @Override
    public ApiResponse<Void> destroy(Long id) {
        if (!this.workspaceRepository.existsById(id)) {
            return ApiResponse.error("Workspace not found", null);
        }

        this.workspaceRepository.deleteById(id);
        return ApiResponse.success("Workspace deleted successfully", null);
    }
}