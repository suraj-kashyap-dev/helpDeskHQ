package com.crm.crm.projects;

import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.exceptions.resources.ResourceUpdateException;
import com.crm.crm.exceptions.resources.ResourceCreationException;
import com.crm.crm.exceptions.resources.ResourceDeletionException;
import com.crm.crm.helpers.ApiResponse;
import com.crm.crm.workspaces.Workspace;
import com.crm.crm.workspaces.WorkspaceRepository;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRespository projectRepository;
    private final ModelMapper modelMapper;
    private final WorkspaceRepository workspaceRepository;

    public ProjectServiceImpl(
        ProjectRespository projectRepository,
        ModelMapper modelMapper,
        WorkspaceRepository workspaceRepository
    ) {
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
        this.workspaceRepository = workspaceRepository;
    }

    @Override
    public ApiResponse<List<Project>> index() {
        try {
            List<Project> projects = this.projectRepository.findAllByOrderByCreatedAtDesc();
            return ApiResponse.success("Projects retrieved successfully", projects);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving projects", e);
        }
    }

    @Override
    public ApiResponse<Project> show(Long id) {
        try {
            Optional<Project> projectOpt = this.projectRepository.findById(id);

            return projectOpt
                .map(project -> ApiResponse.success("Project retrieved successfully", project))
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving project", e);
        }
    }

    @Override
    public ApiResponse<Project> store(ProjectDTO projectDto) {
        try {
            Optional<Workspace> workspaceOpt = Optional.empty();

            if (projectDto.getWorkspaceId() != null) {
                workspaceOpt = this.workspaceRepository.findById(projectDto.getWorkspaceId());

                if (workspaceOpt.isEmpty()) {
                    throw new ResourceNotFoundException("Workspace not found");
                }
            }

            Project project = this.modelMapper.map(projectDto, Project.class);

            workspaceOpt.ifPresent(project::setWorkspace);

            return ApiResponse.success(
                "Project created successfully",
                this.projectRepository.save(project)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceCreationException("Error creating project: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Project> update(Long id, ProjectDTO projectDto) {
        try {
            Optional<Workspace> workspaceOpt = Optional.empty();

            if (projectDto.getWorkspaceId() != null) {
                workspaceOpt = this.workspaceRepository.findById(projectDto.getWorkspaceId());

                if (workspaceOpt.isEmpty()) {
                    throw new ResourceNotFoundException("Workspace not found");
                }
            }

            Optional<Project> projectOpt = this.projectRepository.findById(id);

            if (projectOpt.isEmpty()) {
                throw new ResourceNotFoundException("Project not found");
            }

            Project existingProject = projectOpt.get();

            workspaceOpt.ifPresent(existingProject::setWorkspace);
            existingProject.setName(projectDto.getName());
            existingProject.setDescription(projectDto.getDescription());
            existingProject.setStatus(projectDto.getStatus());
            existingProject.setSettings(projectDto.getSettings());
            existingProject.setStartDate(projectDto.getStartDate());
            existingProject.setEndDate(projectDto.getEndDate());

            return ApiResponse.success(
                "Project updated successfully",
                this.projectRepository.save(existingProject)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();

            throw new ResourceUpdateException("Error updating project: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Void> destroy(Long id) {
        try {
            if (!this.projectRepository.existsById(id)) {
                throw new ResourceNotFoundException("Project not found");
            }

            this.projectRepository.deleteById(id);
            return ApiResponse.success("Project deleted successfully", null);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResourceDeletionException("Error deleting project");
        }
    }
}
