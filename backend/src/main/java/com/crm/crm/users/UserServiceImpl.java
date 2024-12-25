package com.crm.crm.users;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;

import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.helpers.ApiResponse;

public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(
        UserRepository userRepository,
        ModelMapper modelMapper
    ) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
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
        User user = this.modelMapper.map(userDto, User.class);
    
        return ApiResponse.success(
            "User created successfully", 
            this.userRepository.save(user)
        );
    }

    @Override
    public ApiResponse<List<User>> storeMany(Iterable<User> Users) {
        List<User> savedUsers = this.userRepository.saveAll(Users);

        return ApiResponse.success("Users created successfully", savedUsers);
    }

    @Override
    public ApiResponse<User> update(Long id, User user) {
        return this.userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setFullName(user.getFullName());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setPhone(user.getPhone());
                    existingUser.setOrganization(user.getOrganization());

                    User updatedUser = this.userRepository.save(existingUser);

                    return ApiResponse.success("User updated successfully", updatedUser);
                })
                .orElse(ApiResponse.error("User not found", null));
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
