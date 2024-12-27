package com.crm.crm.users;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.exceptions.resources.ResourceUpdateException;
import com.crm.crm.exceptions.resources.ResourceCreationException;
import com.crm.crm.exceptions.resources.ResourceDeletionException;
import com.crm.crm.helpers.ApiResponse;
import com.crm.crm.organizations.Organization;
import com.crm.crm.organizations.OrganizationRepository;

@Service
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
                .map(user -> ApiResponse.success("User retrieved successfully", user))
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving user", e);
        }
    }

    @Override
    public ApiResponse<User> store(UserDTO userDto) {
        try {
            Optional<Organization> organizationOpt = Optional.empty();

            if (userDto.getOrganizationId() != null) {
                organizationOpt = this.organizationRepository.findById(userDto.getOrganizationId());
    
                if (organizationOpt.isEmpty()) {
                    throw new ResourceNotFoundException("Organization not found");
                }
            }
    
            User user = this.modelMapper.map(userDto, User.class);
    
            organizationOpt.ifPresent(user::setOrganization);
    
            return ApiResponse.success(
                "User created successfully", 
                this.userRepository.save(user)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceCreationException("Error creating user: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<User> update(Long id, UserDTO userDto) {
        try {
            Optional<Organization> organizationOpt = Optional.empty();

            if (userDto.getOrganizationId() != null) {
                organizationOpt = this.organizationRepository.findById(userDto.getOrganizationId());
                
                if (organizationOpt.isEmpty()) {
                    throw new ResourceNotFoundException("Organization not found");
                }
            }

            Optional<User> userOpt = this.userRepository.findById(id);

            if (userOpt.isEmpty()) {
                throw new ResourceNotFoundException("Workspace not found");
            }

            User existingUser = userOpt.get();

            organizationOpt.ifPresent(existingUser::setOrganization);
            existingUser.setEmail(userDto.getEmail());
            existingUser.setFullName(userDto.getFullName());
            existingUser.setPhone(userDto.getPhone());
            existingUser.setPassword(userDto.getPassword());
            existingUser.setStatus(userDto.getStatus());

            return ApiResponse.success(
                "User updated successfully", 
                this.userRepository.save(existingUser)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();

            throw new ResourceUpdateException("Error updating User: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Void> destroy(Long id) {
        try {
            if (! this.userRepository.existsById(id)) {
                throw new ResourceNotFoundException("User not found");
            }

            this.userRepository.deleteById(id);
            return ApiResponse.success("User deleted successfully", null);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResourceDeletionException("Error deleting user");
        }
    }
}
