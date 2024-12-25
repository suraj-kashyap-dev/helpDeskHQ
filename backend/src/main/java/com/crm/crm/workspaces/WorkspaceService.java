package com.crm.crm.workspaces;

import java.util.List;

import com.crm.crm.helpers.ApiResponse;

public interface WorkspaceService {
    ApiResponse<List<Workspace>> index();
    ApiResponse<Workspace> show(Long id);
    ApiResponse<Workspace> store(WorkspaceDTO workspaceDTO);
    ApiResponse<List<Workspace>> storeMany(Iterable<Workspace> workspaces);
    ApiResponse<Workspace> update(Long id, Workspace workspace);
    ApiResponse<Void> destroy(Long id);
}