package com.crm.crm.users;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;

import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.helpers.ApiResponse;
import com.crm.crm.organizations.Organization;
import com.crm.crm.organizations.OrganizationRepository;
import com.crm.crm.workspaces.Workspace;

public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final OrganizationRepository organizationRepository;

    public UserServiceImpl(
        UserRepository userRepository,
        ModelMapper modelMapper,
        OrganizationRepository organizationRepository
    ) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.organizationRepository = organizationRepository;
    }

    @Override
    public ApiResponse<List<User>> index() {
        try {
            List<User> users = this.userRepository.findAllByOrderByCreatedAtDesc();
            return ApiResponse.success("Users retrieved successfully", users);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving users", e);
        }
    }

    @Override
    public ApiResponse<User> show(Long id) {
        try {
            Optional<User> users = this.userRepository.findById(id);

            return users
                .map(org -> ApiResponse.success("Users retrieved successfully", org))
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving users", e);
        }
    }

    @Override
    public ApiResponse<User> store(UserDTO userDto) {
         Organization organization = organizationRepository.findById(userDto.getOrganizationId())
            .orElseThrow(() -> new IllegalArgumentException("Organization not found with ID: " + userDto.getOrganizationId()));
    
        User user = this.modelMapper.map(userDto, User.class);
        user.setOrganization(organization);
    
        return ApiResponse.success(
            "Workspace created successfully",
            this.userRepository.save(user)
        );
    }

    @Override
    public ApiResponse<List<User>> storeMany(Iterable<User> users) {
        List<User> savedUser = this.userRepository.saveAll(users);

        return ApiResponse.success("Workspaces created successfully", savedUser);
    }

    @Override
    public ApiResponse<User> update(Long id, User user) {
        return this.userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setEmail(user.getEmail());
                    existingUser.setFullName(user.getFullName());
                    existingUser.setPassword(user.getPassword());
                    existingUser.setPhone(user.getPhone());

                    User updatedUser = this.userRepository.save(existingUser);

                    return ApiResponse.success("Workspace updated successfully", updatedUser);
                })
                .orElse(ApiResponse.error("Workspace not found", null));
    }

    @Override
    public ApiResponse<Void> destroy(Long id) {
        if (! this.userRepository.existsById(id)) {
            return ApiResponse.error("User not found", null);
        }

        this.userRepository.deleteById(id);

        return ApiResponse.success("User deleted successfully", null);
    }
}
