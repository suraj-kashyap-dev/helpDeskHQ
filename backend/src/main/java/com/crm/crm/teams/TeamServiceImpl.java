package com.crm.crm.teams;

import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.crm.exceptions.resources.ResourceCreationException;
import com.crm.crm.exceptions.resources.ResourceDeletionException;
import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.helpers.ApiResponse;
import com.crm.crm.workspaces.Workspace;
import com.crm.crm.workspaces.WorkspaceRepository;

@Service
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final ModelMapper modelMapper;
    private final WorkspaceRepository workspaceRepository;

    @Autowired
    public TeamServiceImpl(
        TeamRepository teamRepository,
        ModelMapper modelMapper,
        WorkspaceRepository workspaceRepository
    ) {
        this.teamRepository = teamRepository;
        this.modelMapper = modelMapper;
        this.workspaceRepository = workspaceRepository;
    }

    @Override
    public ApiResponse<List<Team>> index() {
        try {
            List<Team> teams = this.teamRepository.findAllByOrderByCreatedAtDesc();
            return ApiResponse.success("Teams retrieved successfully", teams);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving teams", e);
        }
    }

    @Override
    public ApiResponse<Team> show(Long id) {
        try {
            Optional<Team> team = this.teamRepository.findById(id);

            return team
                .map(ws -> ApiResponse.success("Team retrieved successfully", ws))
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving team", e);
        }
    }

    @Override
    public ApiResponse<Team> store(TeamDTO teamDTO) {
        try {
            Optional<Workspace> workspaceOpt = Optional.empty();

            if (teamDTO.getWorkspaceId() != null) {
                workspaceOpt = this.workspaceRepository.findById(teamDTO.getWorkspaceId());
    
                if (workspaceOpt.isEmpty()) {
                    throw new ResourceNotFoundException("Organization not found");
                }
            }
    
            Team team = this.modelMapper.map(teamDTO, Team.class);
    
            workspaceOpt.ifPresent(team::setWorkspace);
    
            return ApiResponse.success(
                "Team created successfully", 
                this.teamRepository.save(team)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceCreationException("Error creating user: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Team> update(Long id, TeamDTO teamDTO) {
        try {
            Optional<Workspace> workspaceOpt = Optional.empty();

            if (teamDTO.getWorkspaceId() != null) {
                workspaceOpt = this.workspaceRepository.findById(teamDTO.getWorkspaceId()); 

                if (workspaceOpt.isEmpty()) {
                    throw new ResourceNotFoundException("Workspace not found");
                }
            }

            Optional<Team> teamOpt = this.teamRepository.findById(id);

            if (teamOpt.isEmpty()) {
                throw new ResourceNotFoundException("Team not found");
            }

            Team existingTeam = teamOpt.get();

            workspaceOpt.ifPresent(existingTeam::setWorkspace);

            existingTeam.setName(teamDTO.getName());
            existingTeam.setDescription(teamDTO.getDescription());
            existingTeam.setAccessLevel(teamDTO.getAccessLevel());
            
            return ApiResponse.success(
                "Team updated successfully", 
                this.teamRepository.save(existingTeam)
            );
        } catch(ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error updating team", e);
        }
    }

    @Override
    public ApiResponse<Void> destroy(Long id) {
        try {
            if (! this.workspaceRepository.existsById(id)) {
                throw new ResourceNotFoundException("Team not found");
            }

            this.workspaceRepository.deleteById(id);
            return ApiResponse.success("Team deleted successfully", null);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResourceDeletionException("Error deleting team");
        }
    }
}
