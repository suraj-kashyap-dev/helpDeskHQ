package com.crm.crm.workspaces;

import java.util.List;

import com.crm.crm.helpers.ApiResponse;

public interface WorkspaceService {
    public ApiResponse<List<Workspace>> index();
    public ApiResponse<Workspace> show(Long id);
    public ApiResponse<Workspace> store(WorkspaceDTO workspaceDTO);
    public ApiResponse<Workspace> update(Long id, WorkspaceDTO workspace);
    public ApiResponse<Void> destroy(Long id);
}