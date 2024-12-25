package com.crm.crm.users;

import java.util.List;

import com.crm.crm.helpers.ApiResponse;

public interface UserService {
    ApiResponse<List<User>> index();
    ApiResponse<User> show(Long id);
    ApiResponse<User> store(UserDTO workspaceDTO);
    ApiResponse<List<User>> storeMany(Iterable<User> workspaces);
    ApiResponse<User> update(Long id, User workspace);
    ApiResponse<Void> destroy(Long id);
}
